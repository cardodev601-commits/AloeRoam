import { createClient } from "@/lib/supabase/server";
import StatusListingsClient from "@/components/admin/StatusListingsClient";

export const metadata = {
  title: "Published",
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
    .eq("status", "published")
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
          <h1 className="appTitle">Published</h1>
          <p className="adminQueueLead">Review listings currently approved for AloeRoam discovery.</p>
        </div>

        <div className="adminQueueCount adminQueueCount--green" aria-label={`${listings.length} Published listings`}>
          <strong>{listings.length}</strong>
          <span>Published</span>
        </div>
      </header>

      {loadError ? (
        <div className="adminDashboardError" role="alert">
          <strong>Published listings could not be loaded.</strong>
          <span>{loadError}</span>
        </div>
      ) : (
        <StatusListingsClient
          actionLabel="View"
          emptyMessage="Approved listings will appear here after moderation."
          initialListings={listings}
          statusLabel="Published"
        />
      )}
    </section>
  );
}
