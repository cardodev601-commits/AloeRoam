import Link from "next/link";
import { notFound } from "next/navigation";

import ModerationPanel from "@/components/admin/ModerationPanel";
import { createClient } from "@/lib/supabase/server";

// export const dynamic = "force-dynamic";
export const instant = false;

function formatDateTime(value) {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not provided";

  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatMoney(amount, currency) {
  if (amount === null || amount === undefined || amount === "") return "Not provided";
  const numeric = Number(amount);
  if (Number.isNaN(numeric)) return String(amount);

  try {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: currency || "ZAR",
    }).format(numeric);
  } catch {
    return `${currency || "ZAR"} ${numeric.toFixed(2)}`;
  }
}

function displayValue(value, fallback = "Not provided") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function labelFromValue(value) {
  return String(value || "Listing")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

async function loadListing(id) {
  const supabase = await createClient();

  const [listingResult, moderationResult] = await Promise.all([
    supabase
      .from("listings")
      .select(`
        *,
        provider:provider_profiles!listings_provider_id_fkey (*),
        category:categories!listings_category_id_fkey (*)
      `)
      .eq("id", id)
      .maybeSingle(),

    supabase
      .from("moderation_actions")
      .select("id, action, reason, created_at, previous_state, new_state")
      .eq("listing_id", id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  if (listingResult.error) throw new Error(listingResult.error.message);
  if (!listingResult.data) notFound();

  return {
    listing: listingResult.data,
    moderationActions: moderationResult.error ? [] : moderationResult.data || [],
    moderationLoadError: moderationResult.error?.message || null,
  };
}

function DetailItem({ label, value, wide = false }) {
  return (
    <div className={wide ? "adminReviewDetail adminReviewDetail--wide" : "adminReviewDetail"}>
      <span>{label}</span>
      <strong>{displayValue(value)}</strong>
    </div>
  );
}

export default async function ListingReviewPage({ params }) {
  const { id } = await params;
  const { listing, moderationActions, moderationLoadError } = await loadListing(id);

  const type = listing.listing_type || "service";
  const provider = listing.provider || {};
  const category = listing.category || {};

  return (
    <section className="adminReviewPage">
      <div className="adminReviewBreadcrumbs">
        <Link href="/admin/listings/pending">← Pending Listings</Link>
        <span>/</span>
        <span>{listing.title || "Listing review"}</span>
      </div>

      <header className="adminReviewHeader">
        <div>
          <div className="adminReviewBadges">
            <span className={`adminListingType adminListingType--${type}`}>
              {labelFromValue(type)}
            </span>
            <span className={`adminReviewStatus adminReviewStatus--${listing.status || "pending"}`}>
              {labelFromValue(listing.status || "pending")}
            </span>
          </div>
          <h1>{listing.title || "Untitled listing"}</h1>
          <p>
            Submitted by <strong>{provider.display_name || "Provider unavailable"}</strong>
          </p>
        </div>

        <Link className="adminReviewEditLink" href={`/admin/listings/${id}/edit`}>
          Edit Listing
        </Link>
      </header>

      <div className="adminReviewLayout">
        <div className="adminReviewContent">
          <section className="appCard adminReviewSection">
            <div className="adminReviewSectionHeading">
              <p className="appEyebrow">Listing content</p>
              <h2>Overview</h2>
            </div>

            <div className="adminReviewDescription">
              {listing.description || "No description has been supplied."}
            </div>

            <div className="adminReviewDetailsGrid">
              <DetailItem label="Category" value={category.name} />
              <DetailItem label="Price type" value={labelFromValue(listing.price_type)} />
              <DetailItem
                label="Price"
                value={
                  listing.price_type === "free"
                    ? "Free"
                    : formatMoney(listing.price_amount, listing.currency)
                }
              />
              <DetailItem label="Created" value={formatDateTime(listing.created_at)} />
            </div>
          </section>

          <section className="appCard adminReviewSection">
            <div className="adminReviewSectionHeading">
              <p className="appEyebrow">Schedule and place</p>
              <h2>When and where</h2>
            </div>

            <div className="adminReviewDetailsGrid">
              <DetailItem label="Starts" value={formatDateTime(listing.starts_at)} />
              <DetailItem label="Ends" value={formatDateTime(listing.ends_at)} />
              <DetailItem label="Address" value={listing.address} wide />
              <DetailItem
                label="Coordinates"
                value={
                  listing.latitude !== null && listing.latitude !== undefined &&
                  listing.longitude !== null && listing.longitude !== undefined
                    ? `${listing.latitude}, ${listing.longitude}`
                    : null
                }
              />
              <DetailItem
                label="Exact location shown"
                value={listing.show_exact_location === false ? "No" : "Yes"}
              />
            </div>
          </section>

          <section className="appCard adminReviewSection">
            <div className="adminReviewSectionHeading">
              <p className="appEyebrow">Contact</p>
              <h2>Customer actions</h2>
            </div>

            <div className="adminReviewDetailsGrid">
              <DetailItem label="Phone" value={listing.contact_phone} />
              <DetailItem label="WhatsApp" value={listing.contact_whatsapp} />
              <DetailItem label="Email" value={listing.contact_email} />
              <DetailItem label="Website" value={listing.website_url} />
              <DetailItem label="Booking URL" value={listing.booking_url} wide />
            </div>
          </section>

          {type === "promotion" ? (
            <section className="appCard adminReviewSection adminReviewSection--gold">
              <div className="adminReviewSectionHeading">
                <p className="appEyebrow">Promotion</p>
                <h2>Redemption details</h2>
              </div>
              <div className="adminReviewDetailsGrid">
                <DetailItem
                  label="Redemption instructions"
                  value={listing.redemption_instructions}
                  wide
                />
                <DetailItem label="Terms" value={listing.terms_text} wide />
              </div>
            </section>
          ) : null}

          <section className="appCard adminReviewSection">
            <div className="adminReviewSectionHeading">
              <p className="appEyebrow">Provider</p>
              <h2>Provider profile</h2>
            </div>

            <div className="adminReviewDetailsGrid">
              <DetailItem label="Display name" value={provider.display_name} />
              <DetailItem label="Provider type" value={labelFromValue(provider.provider_type)} />
              <DetailItem
                label="Verification"
                value={labelFromValue(provider.verification_status)}
              />
              <DetailItem label="Phone" value={provider.contact_phone || provider.phone} />
              <DetailItem label="Email" value={provider.contact_email || provider.email} />
              <DetailItem label="Website" value={provider.website_url} />
              <DetailItem label="Description" value={provider.description} wide />
            </div>
          </section>

          <section className="appCard adminReviewSection">
            <div className="adminReviewSectionHeading">
              <p className="appEyebrow">Audit trail</p>
              <h2>Moderation history</h2>
            </div>

            {moderationLoadError ? (
              <div className="adminDashboardError" role="alert">{moderationLoadError}</div>
            ) : moderationActions.length ? (
              <div className="adminReviewTimeline">
                {moderationActions.map((action) => (
                  <div className="adminReviewTimelineItem" key={action.id}>
                    <span className="adminReviewTimelineDot" aria-hidden="true" />
                    <div>
                      <strong>{labelFromValue(action.action)}</strong>
                      <span>{formatDateTime(action.created_at)}</span>
                      {action.reason ? <p>{action.reason}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="appMuted">No moderation decisions have been recorded yet.</p>
            )}
          </section>
        </div>

        <aside className="adminReviewAside">
          <ModerationPanel
            initialStatus={listing.status}
            listingId={listing.id}
            listingTitle={listing.title || "Untitled listing"}
          />
        </aside>
      </div>
    </section>
  );
}
