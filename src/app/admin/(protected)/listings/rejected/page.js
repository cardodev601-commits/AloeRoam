import { createClient } from "@/lib/supabase/server";
import StatusListingsClient from "@/components/admin/StatusListingsClient";

export const metadata = {
  title: "Rejected",
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
    .eq("status", "rejected")
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
          <h1 className="appTitle">Rejected</h1>
          <p className="adminQueueLead">Review listings that were declined during AloeRoam moderation.</p>
        </div>

        <div className="adminQueueCount adminQueueCount--red" aria-label={`${listings.length} Rejected listings`}>
          <strong>{listings.length}</strong>
          <span>Rejected</span>
        </div>
      </header>

      {loadError ? (
        <div className="adminDashboardError" role="alert">
          <strong>Rejected listings could not be loaded.</strong>
          <span>{loadError}</span>
        </div>
      ) : (
        <StatusListingsClient
          actionLabel="View"
          emptyMessage="Rejected listings will appear here after a moderation decision."
          initialListings={listings}
          statusLabel="Rejected"
        />
      )}
    </section>
  );
}
