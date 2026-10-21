"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const TYPE_FILTERS = [
  { id: "all", label: "All" },
  { id: "event", label: "Events" },
  { id: "promotion", label: "Promotions" },
  { id: "service", label: "Services" },
];

function formatCreatedAt(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function typeLabel(value) {
  if (!value) return "Listing";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalise(value) {
  return String(value || "").trim().toLowerCase();
}

export default function PendingListingsClient({ initialListings }) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredListings = useMemo(() => {
    const searchValue = normalise(query);

    return initialListings.filter((listing) => {
      const matchesType =
        selectedType === "all" || listing.listing_type === selectedType;

      if (!matchesType) return false;
      if (!searchValue) return true;

      const searchable = [
        listing.title,
        listing.description,
        listing.provider?.display_name,
        listing.category?.name,
        listing.listing_type,
      ]
        .map(normalise)
        .join(" ");

      return searchable.includes(searchValue);
    });
  }, [initialListings, query, selectedType]);

  return (
    <div className="adminQueueWorkspace">
      <section className="appCard adminQueueToolbar" aria-label="Pending listing filters">
        <label className="adminQueueSearch">
          <span className="adminFormLabel">Search pending listings</span>
          <input
            className="appField"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by listing, provider or category"
            type="search"
            value={query}
          />
        </label>

        <div className="adminQueueFilters" aria-label="Listing type filters">
          {TYPE_FILTERS.map((filter) => {
            const active = selectedType === filter.id;

            return (
              <button
                aria-pressed={active}
                className={`adminQueueFilter${active ? " adminQueueFilter--active" : ""}`}
                key={filter.id}
                onClick={() => setSelectedType(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="adminQueueResultBar">
        <span>
          Showing <strong>{filteredListings.length}</strong> of{" "}
          <strong>{initialListings.length}</strong> pending listings
        </span>
        <span>Oldest submissions first</span>
      </div>

      {filteredListings.length ? (
        <section className="appCard adminQueueTableCard">
          <div className="adminQueueTable" role="table" aria-label="Pending listings">
            <div className="adminQueueTableHead" role="row">
              <span role="columnheader">Type</span>
              <span role="columnheader">Listing</span>
              <span role="columnheader">Provider</span>
              <span role="columnheader">Category</span>
              <span role="columnheader">Created</span>
              <span role="columnheader">Action</span>
            </div>

            {filteredListings.map((listing) => {
              const providerName =
                listing.provider?.display_name || "Provider unavailable";
              const categoryName = listing.category?.name || "Uncategorised";

              return (
                <div className="adminQueueTableRow" key={listing.id} role="row">
                  <div role="cell">
                    <span
                      className={`adminListingType adminListingType--${
                        listing.listing_type || "service"
                      }`}
                    >
                      {typeLabel(listing.listing_type)}
                    </span>
                  </div>

                  <div className="adminQueueListingCell" role="cell">
                    <strong>{listing.title || "Untitled listing"}</strong>
                    <span>
                      {listing.description || "No description has been supplied."}
                    </span>
                  </div>

                  <div className="adminQueueProviderCell" role="cell">
                    <strong>{providerName}</strong>
                    <span>
                      {listing.provider?.verification_status === "verified"
                        ? "Verified provider"
                        : "Provider"}
                    </span>
                  </div>

                  <span className="adminQueueMutedCell" role="cell">
                    {categoryName}
                  </span>

                  <span className="adminQueueMutedCell" role="cell">
                    {formatCreatedAt(listing.created_at)}
                  </span>

                  <div className="adminQueueActionCell" role="cell">
                    <Link
                      className="adminQueueReviewLink"
                      href={`/admin/listings/${listing.id}`}
                    >
                      Review →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="appCard adminQueueEmpty">
          <div className="adminQueueEmptyIcon" aria-hidden="true">✓</div>
          <h2>{initialListings.length ? "No matching listings" : "Moderation queue clear"}</h2>
          <p>
            {initialListings.length
              ? "Try another search phrase or listing-type filter."
              : "New provider submissions will appear here automatically."}
          </p>
          {initialListings.length ? (
            <button
              className="adminQueueClearButton"
              onClick={() => {
                setQuery("");
                setSelectedType("all");
              }}
              type="button"
            >
              Clear Filters
            </button>
          ) : null}
        </section>
      )}
    </div>
  );
}
