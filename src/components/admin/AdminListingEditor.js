"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const PRICE_TYPES = [
  { value: "free", label: "Free" },
  { value: "fixed", label: "Fixed price" },
  { value: "from", label: "From" },
  { value: "hourly", label: "Hourly" },
  { value: "contact", label: "Contact for price" },
];

function toLocalDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function initialForm(listing) {
  return {
    title: listing.title || "",
    description: listing.description || "",
    category_id: listing.category_id || "",
    starts_at: toLocalDateTime(listing.starts_at),
    ends_at: toLocalDateTime(listing.ends_at),
    price_type: listing.price_type || "contact",
    price_amount:
      listing.price_amount === null || listing.price_amount === undefined
        ? ""
        : String(listing.price_amount),
    currency: listing.currency || "ZAR",
    address: listing.address || "",
    latitude:
      listing.latitude === null || listing.latitude === undefined
        ? ""
        : String(listing.latitude),
    longitude:
      listing.longitude === null || listing.longitude === undefined
        ? ""
        : String(listing.longitude),
    show_exact_location: listing.show_exact_location !== false,
    contact_phone: listing.contact_phone || "",
    contact_whatsapp: listing.contact_whatsapp || "",
    contact_email: listing.contact_email || "",
    website_url: listing.website_url || "",
    booking_url: listing.booking_url || "",
    redemption_instructions: listing.redemption_instructions || "",
    terms_text: listing.terms_text || "",
  };
}

function labelFromValue(value) {
  return String(value || "Listing")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function AdminListingEditor({ categories, initialListing }) {
  const router = useRouter();
  const [form, setForm] = useState(() => initialForm(initialListing));
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const requiresAmount = useMemo(
    () => ["fixed", "from", "hourly"].includes(form.price_type),
    [form.price_type],
  );

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validate() {
    if (form.title.trim().length < 3) {
      return "Enter a listing title with at least 3 characters.";
    }

    if (form.description.trim().length < 10) {
      return "Enter a description with at least 10 characters.";
    }

    if (!form.category_id) {
      return "Select a category.";
    }

    if (requiresAmount) {
      const amount = Number(form.price_amount);
      if (!form.price_amount.trim() || Number.isNaN(amount) || amount < 0) {
        return "Enter a valid non-negative price amount.";
      }
    }

    if (form.contact_email.trim() && !/^\S+@\S+\.\S+$/.test(form.contact_email.trim())) {
      return "Enter a valid contact email address.";
    }

    if (
      !form.contact_phone.trim() &&
      !form.contact_whatsapp.trim() &&
      !form.contact_email.trim() &&
      !form.website_url.trim()
    ) {
      return "Keep at least one phone, WhatsApp, email or website contact method.";
    }

    if (form.starts_at && form.ends_at) {
      const start = new Date(form.starts_at);
      const end = new Date(form.ends_at);
      if (end <= start) return "The end date must be after the start date.";
    }

    return null;
  }

  async function saveChanges(event) {
    event.preventDefault();
    setErrorMessage("");

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/admin/api/listings/${initialListing.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "AloeRoam could not update the listing.");
      }

      router.replace(`/admin/listings/${initialListing.id}`);
      router.refresh();
    } catch (error) {
      setErrorMessage(error?.message || "AloeRoam could not update the listing.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="adminEditorPage">
      <div className="adminReviewBreadcrumbs">
        <Link href={`/admin/listings/${initialListing.id}`}>← Listing Review</Link>
        <span>/</span>
        <span>Edit</span>
      </div>

      <header className="adminEditorHeading">
        <div>
          <div className="adminReviewBadges">
            <span className={`adminListingType adminListingType--${initialListing.listing_type || "service"}`}>
              {labelFromValue(initialListing.listing_type)}
            </span>
            <span className={`adminReviewStatus adminReviewStatus--${initialListing.status || "pending"}`}>
              {labelFromValue(initialListing.status)}
            </span>
          </div>
          <h1>Edit Listing</h1>
          <p>
            Update provider-submitted content before making a moderation decision.
          </p>
        </div>

        <div className="adminEditorProvider">
          <span>Provider</span>
          <strong>{initialListing.provider?.display_name || "Provider unavailable"}</strong>
        </div>
      </header>

      <form className="adminEditorForm" onSubmit={saveChanges}>
        <section className="appCard adminEditorSection">
          <div className="adminReviewSectionHeading">
            <p className="appEyebrow">Basics</p>
            <h2>Listing information</h2>
          </div>

          <div className="adminEditorGrid">
            <label className="adminEditorField adminEditorField--wide">
              <span>Title</span>
              <input
                className="appField"
                maxLength={120}
                onChange={(event) => updateField("title", event.target.value)}
                required
                value={form.title}
              />
            </label>

            <label className="adminEditorField adminEditorField--wide">
              <span>Description</span>
              <textarea
                className="adminEditorTextarea"
                maxLength={4000}
                onChange={(event) => updateField("description", event.target.value)}
                required
                rows={8}
                value={form.description}
              />
              <small>{form.description.length}/4000 characters</small>
            </label>

            <label className="adminEditorField">
              <span>Category</span>
              <select
                className="appField"
                onChange={(event) => updateField("category_id", event.target.value)}
                required
                value={form.category_id}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="adminEditorReadOnly">
              <span>Listing type</span>
              <strong>{labelFromValue(initialListing.listing_type)}</strong>
              <small>Listing type is fixed after creation.</small>
            </div>
          </div>
        </section>

        <section className="appCard adminEditorSection">
          <div className="adminReviewSectionHeading">
            <p className="appEyebrow">Schedule</p>
            <h2>Dates and times</h2>
          </div>

          <div className="adminEditorGrid">
            <label className="adminEditorField">
              <span>Starts</span>
              <input
                className="appField"
                onChange={(event) => updateField("starts_at", event.target.value)}
                type="datetime-local"
                value={form.starts_at}
              />
            </label>

            <label className="adminEditorField">
              <span>Ends</span>
              <input
                className="appField"
                onChange={(event) => updateField("ends_at", event.target.value)}
                type="datetime-local"
                value={form.ends_at}
              />
            </label>
          </div>
        </section>

        <section className="appCard adminEditorSection">
          <div className="adminReviewSectionHeading">
            <p className="appEyebrow">Pricing</p>
            <h2>Customer price</h2>
          </div>

          <div className="adminEditorGrid adminEditorGrid--three">
            <label className="adminEditorField">
              <span>Price type</span>
              <select
                className="appField"
                onChange={(event) => updateField("price_type", event.target.value)}
                value={form.price_type}
              >
                {PRICE_TYPES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="adminEditorField">
              <span>Amount</span>
              <input
                className="appField"
                disabled={!requiresAmount}
                min="0"
                onChange={(event) => updateField("price_amount", event.target.value)}
                step="0.01"
                type="number"
                value={requiresAmount ? form.price_amount : ""}
              />
            </label>

            <label className="adminEditorField">
              <span>Currency</span>
              <input
                className="appField"
                maxLength={3}
                onChange={(event) => updateField("currency", event.target.value.toUpperCase())}
                value={form.currency}
              />
            </label>
          </div>
        </section>

        <section className="appCard adminEditorSection">
          <div className="adminReviewSectionHeading">
            <p className="appEyebrow">Place</p>
            <h2>Listing location</h2>
          </div>

          <div className="adminEditorGrid">
            <label className="adminEditorField adminEditorField--wide">
              <span>Address</span>
              <input
                className="appField"
                onChange={(event) => updateField("address", event.target.value)}
                value={form.address}
              />
            </label>

            <label className="adminEditorField">
              <span>Latitude</span>
              <input
                className="appField"
                onChange={(event) => updateField("latitude", event.target.value)}
                step="any"
                type="number"
                value={form.latitude}
              />
            </label>

            <label className="adminEditorField">
              <span>Longitude</span>
              <input
                className="appField"
                onChange={(event) => updateField("longitude", event.target.value)}
                step="any"
                type="number"
                value={form.longitude}
              />
            </label>

            <label className="adminEditorCheckbox adminEditorField--wide">
              <input
                checked={form.show_exact_location}
                onChange={(event) => updateField("show_exact_location", event.target.checked)}
                type="checkbox"
              />
              <span>Show exact location to AloeRoam users</span>
            </label>
          </div>
        </section>

        <section className="appCard adminEditorSection">
          <div className="adminReviewSectionHeading">
            <p className="appEyebrow">Contact</p>
            <h2>Customer actions</h2>
          </div>

          <div className="adminEditorGrid">
            {[
              ["contact_phone", "Phone", "tel"],
              ["contact_whatsapp", "WhatsApp", "tel"],
              ["contact_email", "Email", "email"],
              ["website_url", "Website", "url"],
              ["booking_url", "Booking URL", "url"],
            ].map(([name, label, type]) => (
              <label
                className={name === "booking_url" ? "adminEditorField adminEditorField--wide" : "adminEditorField"}
                key={name}
              >
                <span>{label}</span>
                <input
                  className="appField"
                  onChange={(event) => updateField(name, event.target.value)}
                  type={type}
                  value={form[name]}
                />
              </label>
            ))}
          </div>
        </section>

        {initialListing.listing_type === "promotion" ? (
          <section className="appCard adminEditorSection adminReviewSection--gold">
            <div className="adminReviewSectionHeading">
              <p className="appEyebrow">Promotion</p>
              <h2>Redemption details</h2>
            </div>

            <div className="adminEditorGrid">
              <label className="adminEditorField adminEditorField--wide">
                <span>Redemption instructions</span>
                <textarea
                  className="adminEditorTextarea"
                  onChange={(event) => updateField("redemption_instructions", event.target.value)}
                  rows={5}
                  value={form.redemption_instructions}
                />
              </label>

              <label className="adminEditorField adminEditorField--wide">
                <span>Terms</span>
                <textarea
                  className="adminEditorTextarea"
                  onChange={(event) => updateField("terms_text", event.target.value)}
                  rows={5}
                  value={form.terms_text}
                />
              </label>
            </div>
          </section>
        ) : null}

        {errorMessage ? (
          <div className="adminFormError" role="alert">{errorMessage}</div>
        ) : null}

        <div className="adminEditorActions">
          <Link className="adminEditorCancel" href={`/admin/listings/${initialListing.id}`}>
            Cancel
          </Link>
          <button className="appPrimaryButton" disabled={saving} type="submit">
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
