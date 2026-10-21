"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ACTIONS = {
  approve: {
    label: "Approve Listing",
    prompt: "Publish this listing to AloeRoam discovery?",
    requiresReason: false,
  },
  request_changes: {
    label: "Request Changes",
    prompt: "Explain what the provider must change before resubmitting.",
    requiresReason: true,
  },
  reject: {
    label: "Reject Listing",
    prompt: "Explain why this listing cannot be published.",
    requiresReason: true,
  },
};

export default function ModerationPanel({ initialStatus, listingId, listingTitle }) {
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState(null);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const action = selectedAction ? ACTIONS[selectedAction] : null;

  function chooseAction(value) {
    setSelectedAction(value);
    setReason("");
    setErrorMessage("");
  }

  async function submitDecision() {
    if (!selectedAction) return;

    if (action.requiresReason && reason.trim().length < 10) {
      setErrorMessage("Enter a moderation note with at least 10 characters.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`/admin/api/listings/${listingId}/moderate`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: selectedAction,
          reason: reason.trim() || null,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "AloeRoam could not save the moderation decision.");
      }

      if (selectedAction === "approve") {
        router.replace("/admin/listings/published");
      } else if (selectedAction === "request_changes") {
        router.replace("/admin/listings/changes-required");
      } else {
        router.replace("/admin/listings/rejected");
      }

      router.refresh();
    } catch (error) {
      setErrorMessage(error?.message || "AloeRoam could not save the moderation decision.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="appCard adminModerationPanel">
      <p className="appEyebrow">Moderation</p>
      <h2>Make a decision</h2>
      <p className="adminModerationLead">
        Review <strong>{listingTitle}</strong> and choose the appropriate outcome.
      </p>

      <div className="adminModerationCurrent">
        <span>Current status</span>
        <strong>{String(initialStatus || "pending").replace(/_/g, " ")}</strong>
      </div>

      <div className="adminModerationActions">
        <button
          className="adminModerationButton adminModerationButton--changes"
          onClick={() => chooseAction("request_changes")}
          type="button"
        >
          Request Changes
        </button>
        <button
          className="adminModerationButton adminModerationButton--reject"
          onClick={() => chooseAction("reject")}
          type="button"
        >
          Reject
        </button>
        <button
          className="adminModerationButton adminModerationButton--approve"
          onClick={() => chooseAction("approve")}
          type="button"
        >
          Approve
        </button>
      </div>

      {action ? (
        <div className="adminModerationConfirm">
          <strong>{action.label}</strong>
          <p>{action.prompt}</p>

          {action.requiresReason ? (
            <label>
              <span className="adminFormLabel">Moderation note</span>
              <textarea
                className="adminModerationTextarea"
                maxLength={1000}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Give the provider clear, actionable feedback"
                rows={5}
                value={reason}
              />
              <small>{reason.trim().length}/1000 characters</small>
            </label>
          ) : null}

          {errorMessage ? (
            <div className="adminFormError" role="alert">{errorMessage}</div>
          ) : null}

          <div className="adminModerationConfirmActions">
            <button
              className="adminModerationCancel"
              disabled={submitting}
              onClick={() => setSelectedAction(null)}
              type="button"
            >
              Cancel
            </button>
            <button
              className={`adminModerationSubmit adminModerationSubmit--${selectedAction}`}
              disabled={submitting}
              onClick={submitDecision}
              type="button"
            >
              {submitting ? "Saving..." : `Confirm ${action.label}`}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
