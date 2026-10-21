import { notFound } from "next/navigation";

import AdminListingEditor from "@/components/admin/AdminListingEditor";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function loadEditorData(id) {
  const supabase = await createClient();

  const [listingResult, categoriesResult] = await Promise.all([
    supabase
      .from("listings")
      .select(`
        id,
        title,
        description,
        listing_type,
        category_id,
        status,
        starts_at,
        ends_at,
        price_type,
        price_amount,
        currency,
        address,
        latitude,
        longitude,
        show_exact_location,
        contact_phone,
        contact_whatsapp,
        contact_email,
        website_url,
        booking_url,
        redemption_instructions,
        terms_text,
        provider:provider_profiles!listings_provider_id_fkey (
          display_name
        )
      `)
      .eq("id", id)
      .maybeSingle(),

    supabase
      .from("categories")
      .select("id, name, listing_type")
      .order("name", { ascending: true }),
  ]);

  if (listingResult.error) {
    throw new Error(listingResult.error.message);
  }

  if (!listingResult.data) {
    notFound();
  }

  if (categoriesResult.error) {
    throw new Error(categoriesResult.error.message);
  }

  return {
    listing: listingResult.data,
    categories: (categoriesResult.data || []).filter(
      (category) => category.listing_type === listingResult.data.listing_type,
    ),
  };
}

export default async function AdminEditListingPage({ params }) {
  const { id } = await params;

  if (!UUID_PATTERN.test(String(id || ""))) {
    notFound();
  }

  const { listing, categories } = await loadEditorData(id);

  return (
    <AdminListingEditor
      categories={categories}
      initialListing={listing}
    />
  );
}
