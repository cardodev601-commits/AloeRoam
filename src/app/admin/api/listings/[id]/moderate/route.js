import { NextResponse } from "next/server";

import { getAdminContext } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const ACTION_CONFIG = {
  approve: {
    status: "published",
    auditAction: "approved",
    requiresReason: false,
  },
  request_changes: {
    status: "changes_required",
    auditAction: "changes_requested",
    requiresReason: true,
  },
  reject: {
    status: "rejected",
    auditAction: "rejected",
    requiresReason: true,
  },
};

export async function POST(request, context) {
  const { user, isAdmin } = await getAdminContext();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (!isAdmin) {
    return NextResponse.json({ error: "Administrator access required." }, { status: 403 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);
  const config = ACTION_CONFIG[body?.action];
  const reason = String(body?.reason || "").trim();

  if (!config) {
    return NextResponse.json({ error: "Unsupported moderation action." }, { status: 400 });
  }

  if (config.requiresReason && reason.length < 10) {
    return NextResponse.json(
      { error: "A moderation note with at least 10 characters is required." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data: listing, error: loadError } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (loadError) {
    return NextResponse.json({ error: loadError.message }, { status: 400 });
  }

  if (!listing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  const updatePayload = {
    status: config.status,
    updated_at: new Date().toISOString(),
  };

  if (config.status === "published") {
    updatePayload.published_at = new Date().toISOString();
  }

  const { data: updatedListing, error: updateError } = await supabase
    .from("listings")
    .update(updatePayload)
    .eq("id", id)
    .select("*")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  const { error: auditError } = await supabase
    .from("moderation_actions")
    .insert({
      listing_id: id,
      actor_id: user.id,
      action: config.auditAction,
      reason: reason || null,
      previous_state: listing,
      new_state: updatedListing,
    });

  if (auditError) {
    /*
     * Preserve the successful status change but surface that audit logging failed.
     * This mirrors the existing mobile workflow, which updates the listing first.
     */
    return NextResponse.json(
      {
        error: `Listing updated, but moderation audit logging failed: ${auditError.message}`,
        listing: updatedListing,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ listing: updatedListing });
}
