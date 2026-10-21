import { createClient } from "@/lib/supabase/server";
import StatusListingsClient from "@/components/admin/StatusListingsClient";

export const metadata = {
  title: "Changes Required",
};

// export const dynamic = "force-dynamic";
export const instant = false;

async function loadListings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("listings")
    .select(`
      id,
      title,
      description,
      listing_type,
      status,
      created_at,
      provider:provider_profiles!listings_provider_id_fkey (
        id,
        display_name,
        verification_status
      ),
      category:categories!listings_category_id_fkey (
        id,
        name
      )
    `)
    .eq("status", "changes_required")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export default async function ListingsPage() {
  let listings = [];
  let loadError = null;

  try {
    listings = await loadListings();
  } catch (error) {
    loadError = error?.message || "AloeRoam could not load this listing queue.";
  }

  return (
    <section className="adminQueuePage">
      <header className="adminQueueHeading">
        <div>
          <p className="appEyebrow">Listings</p>
          <h1 className="appTitle">Changes Required</h1>
          <p className="adminQueueLead">Track listings returned to providers for corrections or additional information.</p>
        </div>

        <div className="adminQueueCount adminQueueCount--gold" aria-label={`${listings.length} Changes Required listings`}>
          <strong>{listings.length}</strong>
          <span>Changes Required</span>
        </div>
      </header>

      {loadError ? (
        <div className="adminDashboardError" role="alert">
          <strong>Changes Required listings could not be loaded.</strong>
          <span>{loadError}</span>
        </div>
      ) : (
        <StatusListingsClient
          actionLabel="Review"
          emptyMessage="Listings that require provider corrections will appear here."
          initialListings={listings}
          statusLabel="Changes Required"
        />
      )}
    </section>
  );
}
