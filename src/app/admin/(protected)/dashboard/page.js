
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Dashboard",
};

// export const dynamic = "force-dynamic";
export const instant = false;

const STATUS_CARDS = [
  {
    key: "pending",
    label: "Pending Review",
    description:
      "Provider submissions waiting for an AloeRoam moderation decision.",
    href: "/admin/listings/pending",
    tone: "gold",
    mark: "P",
  },
  {
    key: "changes_required",
    label: "Changes Required",
    description:
      "Listings returned to providers for corrections or additional information.",
    href: "/admin/listings/changes-required",
    tone: "goldSoft",
    mark: "C",
  },
  {
    key: "published",
    label: "Published",
    description: "Listings currently approved for AloeRoam discovery.",
    href: "/admin/listings/published",
    tone: "green",
    mark: "A",
  },
  {
    key: "rejected",
    label: "Rejected",
    description: "Listings that were declined during moderation.",
    href: "/admin/listings/rejected",
    tone: "red",
    mark: "R",
  },
];

 
function formatSubmittedAt(value) {
  if (!value) return "Submission date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Submission date unavailable";

  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function listingTypeLabel(value) {
  if (!value) return "Listing";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

async function loadDashboardData() {
  const supabase = await createClient();

  const [summaryResult, attentionResult] = await Promise.all([
    supabase
      .from("listings")
      .select("status")
      .in(
        "status",
        STATUS_CARDS.map((item) => item.key),
      ),

    supabase
      .from("listings")
      .select(
        `
        id,
        title,
        listing_type,
        status,
        created_at,
        provider:provider_profiles!listings_provider_id_fkey (
          display_name
        )
      `,
      )
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(6),
  ]);

  if (summaryResult.error) {
    throw new Error(summaryResult.error.message);
  }

  if (attentionResult.error) {
    throw new Error(attentionResult.error.message);
  }

  const counts = STATUS_CARDS.reduce((accumulator, item) => {
    accumulator[item.key] = 0;
    return accumulator;
  }, {});

  for (const row of summaryResult.data || []) {
    if (Object.prototype.hasOwnProperty.call(counts, row.status)) {
      counts[row.status] += 1;
    }
  }

  return {
    counts,
    attention: attentionResult.data || [],
  };
}

export default async function AdminDashboardPage() {
  let dashboardData;
  let loadError = null;

  try {
    dashboardData = await loadDashboardData();
  } catch (error) {
    loadError = error?.message || "AloeRoam could not load moderation data.";
    dashboardData = {
      counts: STATUS_CARDS.reduce((accumulator, item) => {
        accumulator[item.key] = 0;
        return accumulator;
      }, {}),
      attention: [],
    };
  }

  const pendingCount = dashboardData.counts.pending || 0;

  return (
    <section className="adminDashboard">
      <header className="adminDashboardHeading">
        <div>
          <p className="appEyebrow">Moderation</p>
          <h1 className="appTitle">Dashboard</h1>
          <p className="adminDashboardLead">
            Review provider submissions and keep AloeRoam discovery accurate,
            useful and trustworthy.
          </p>
        </div>

        <Link
          className="appPrimaryButton adminDashboardPrimary"
          href="/admin/listings/pending"
        >
          Review Pending
        </Link>
      </header>

      {loadError ? (
        <div className="adminDashboardError" role="alert">
          <strong>Dashboard data could not be loaded.</strong>
          <span>{loadError}</span>
        </div>
      ) : null}

      <div className="adminMetricGrid" aria-label="Moderation status summary">
        {STATUS_CARDS.map((item) => (
          <Link
            className={`adminMetricCard adminMetricCard--${item.tone}`}
            href={item.href}
            key={item.key}
          >
            <div className="adminMetricTopline">
              <span className="adminMetricMark" aria-hidden="true">
                {item.mark}
              </span>
              <span className="adminMetricArrow" aria-hidden="true">
                →
              </span>
            </div>

            <strong className="adminMetricValue">
              {dashboardData.counts[item.key] || 0}
            </strong>
            <span className="adminMetricLabel">{item.label}</span>
            <span className="adminMetricDescription">{item.description}</span>
          </Link>
        ))}
      </div>

      <section className="appCard adminAttentionCard">
        <div className="adminSectionHeading">
          <div>
            <p className="appEyebrow">Needs attention</p>
            <h2>Pending listings</h2>
            <p>
              {pendingCount
                ? "Oldest submissions appear first so waiting providers can be reviewed fairly."
                : "There are currently no listings waiting for review."}
            </p>
          </div>

          {pendingCount ? (
            <Link className="adminTextLink" href="/admin/listings/pending">
              View all pending →
            </Link>
          ) : null}
        </div>

        {dashboardData.attention.length ? (
          <div className="adminAttentionList">
            {dashboardData.attention.map((listing) => {
              const providerName =
                listing.provider?.display_name || "Provider unavailable";
              const submittedAt = listing.created_at;
              // const submittedAt = listing.submitted_at || listing.created_at;

              return (
                <Link
                  className="adminAttentionRow"
                  href={`/admin/listings/${listing.id}`}
                  key={listing.id}
                >
                  <div
                    className={`adminListingType adminListingType--${listing.listing_type || "service"}`}
                  >
                    {listingTypeLabel(listing.listing_type)}
                  </div>

                  <div className="adminAttentionMain">
                    <strong>{listing.title || "Untitled listing"}</strong>
                    <span>{providerName}</span>
                  </div>

                  <div className="adminAttentionMeta">
                    <span>{formatSubmittedAt(submittedAt)}</span>
                    <strong>Review →</strong>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="adminDashboardEmpty">
            <div className="adminDashboardEmptyIcon" aria-hidden="true">
              ✓
            </div>
            <strong>Moderation queue clear</strong>
            <span>
              New provider submissions will appear here automatically.
            </span>
          </div>
        )}
      </section>
    </section>
  );
}
