import { createClient } from "@/lib/supabase/server";
import PendingListingsClient from "@/components/admin/PendingListingsClient";

export const metadata = {
  title: "Pending Listings",
};

// export const dynamic = "force-dynamic";
export const instant = false;

async function loadPendingListings() {
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
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export default async function PendingListingsPage() {
  let listings = [];
  let loadError = null;

  try {
    listings = await loadPendingListings();
  } catch (error) {
    loadError =
      error?.message ||
      "AloeRoam could not load the pending moderation queue.";
  }

  return (
    <section className="adminQueuePage">
      <header className="adminQueueHeading">
        <div>
          <p className="appEyebrow">Listings</p>
          <h1 className="appTitle">Pending Review</h1>
          <p className="adminQueueLead">
            Review provider submissions in the order they entered the AloeRoam moderation queue.
          </p>
        </div>

        <div className="adminQueueCount" aria-label={`${listings.length} pending listings`}>
          <strong>{listings.length}</strong>
          <span>Pending</span>
        </div>
      </header>

      {loadError ? (
        <div className="adminDashboardError" role="alert">
          <strong>Pending listings could not be loaded.</strong>
          <span>{loadError}</span>
        </div>
      ) : (
        <PendingListingsClient initialListings={listings} />
      )}
    </section>
  );
}
