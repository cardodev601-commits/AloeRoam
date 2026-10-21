import { NextResponse } from "next/server";

import { getAdminContext } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const AMOUNT_PRICE_TYPES = new Set(["fixed", "from", "hourly"]);
const ALLOWED_PRICE_TYPES = new Set([
  "free",
  "fixed",
  "from",
  "hourly",
  "contact",
]);

function nullableString(value) {
  const text = String(value || "").trim();
  return text || null;
}

function nullableNumber(value) {
  if (value === null || value === undefined || String(value).trim() === "")
    return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : Number.NaN;
}

function nullableDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "invalid" : date.toISOString();
}

export async function PATCH(request, context) {
  const { user, isAdmin } = await getAdminContext();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Administrator access required." },
      { status: 403 },
    );
  }

  const { id } = await context.params;
  if (!UUID_PATTERN.test(String(id || ""))) {
    return NextResponse.json({ error: "Invalid listing ID." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "A valid JSON request is required." },
      { status: 400 },
    );
  }

  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const categoryId = String(body.category_id || "").trim();
  const priceType = String(body.price_type || "contact").trim();
  const email = nullableString(body.contact_email);

  if (title.length < 3) {
    return NextResponse.json(
      { error: "Title must contain at least 3 characters." },
      { status: 400 },
    );
  }

  if (description.length < 10) {
    return NextResponse.json(
      { error: "Description must contain at least 10 characters." },
      { status: 400 },
    );
  }

  if (!UUID_PATTERN.test(categoryId)) {
    return NextResponse.json(
      { error: "Select a valid category." },
      { status: 400 },
    );
  }

  if (!ALLOWED_PRICE_TYPES.has(priceType)) {
    return NextResponse.json({ error: "Invalid price type." }, { status: 400 });
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid contact email." },
      { status: 400 },
    );
  }

  const amount = nullableNumber(body.price_amount);
  if (
    AMOUNT_PRICE_TYPES.has(priceType) &&
    (!Number.isFinite(amount) || amount < 0)
  ) {
    return NextResponse.json(
      { error: "Enter a valid non-negative price amount." },
      { status: 400 },
    );
  }

  const latitude = nullableNumber(body.latitude);
  const longitude = nullableNumber(body.longitude);
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return NextResponse.json(
      { error: "Latitude and longitude must be valid numbers." },
      { status: 400 },
    );
  }

  const startsAt = nullableDate(body.starts_at);
  const endsAt = nullableDate(body.ends_at);
  if (startsAt === "invalid" || endsAt === "invalid") {
    return NextResponse.json(
      { error: "Enter valid start and end dates." },
      { status: 400 },
    );
  }

  if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) {
    return NextResponse.json(
      { error: "The end date must be after the start date." },
      { status: 400 },
    );
  }

  const contactPhone = nullableString(body.contact_phone);
  const contactWhatsapp = nullableString(body.contact_whatsapp);
  const websiteUrl = nullableString(body.website_url);

  if (!contactPhone && !contactWhatsapp && !email && !websiteUrl) {
    return NextResponse.json(
      {
        error:
          "Keep at least one phone, WhatsApp, email or website contact method.",
      },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data: existing, error: loadError } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (loadError) {
    return NextResponse.json({ error: loadError.message }, { status: 400 });
  }

  if (!existing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  const updatePayload = {
    title,
    description,
    category_id: categoryId,
    starts_at: startsAt,
    ends_at: endsAt,
    price_type: priceType,
    price_amount: AMOUNT_PRICE_TYPES.has(priceType) ? amount : null,
    currency: String(body.currency || "ZAR")
      .trim()
      .toUpperCase()
      .slice(0, 3),
    address: nullableString(body.address),
    latitude,
    longitude,
    show_exact_location: body.show_exact_location !== false,
    contact_phone: contactPhone,
    contact_whatsapp: contactWhatsapp,
    contact_email: email,
    website_url: websiteUrl,
    booking_url: nullableString(body.booking_url),
    redemption_instructions: nullableString(body.redemption_instructions),
    terms_text: nullableString(body.terms_text),
    updated_at: new Date().toISOString(),
  };

  const { data: updated, error: updateError } = await supabase
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
      action: "edited",
      reason: "Listing edited by an AloeRoam administrator.",
      previous_state: existing,
      new_state: updated,
    });

  if (auditError) {
    return NextResponse.json(
      {
        error: `Listing updated, but edit audit logging failed: ${auditError.message}`,
        listing: updated,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ listing: updated });
}
