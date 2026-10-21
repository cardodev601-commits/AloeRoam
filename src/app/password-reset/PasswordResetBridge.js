"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PasswordResetBridge() {
  const searchParams = useSearchParams();
  const [attemptedOpen, setAttemptedOpen] = useState(false);

  const recoveryLink = useMemo(() => {
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (!tokenHash || type !== "recovery") {
      return null;
    }

    const params = new URLSearchParams();
    params.set("token_hash", tokenHash);
    params.set("type", "recovery");

    return `aloeroam://reset-password?${params.toString()}`;
  }, [searchParams]);

  useEffect(() => {
    if (!recoveryLink) {
      return;
    }

    const timer = window.setTimeout(() => {
      setAttemptedOpen(true);
      window.location.href = recoveryLink;
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [recoveryLink]);

  if (!recoveryLink) {
    return (
      <main className="statusPage">
        <section className="statusCard">
          <div className="statusIcon">!</div>

          <p className="statusEyebrow">AloeRoam Password Recovery</p>

          <h1>Invalid reset link</h1>

          <p>
            This password-reset link does not contain the information AloeRoam
            needs to continue.
          </p>

          <p>
            Request a new password reset from the AloeRoam app and use the
            newest email.
          </p>

          <Link href="/support">Get Support</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="statusPage">
      <section className="statusCard">
        <div className="statusIcon">AR</div>

        <p className="statusEyebrow">AloeRoam Password Recovery</p>

        <h1>Continue in AloeRoam</h1>

        <p>Your password-reset request is ready.</p>

        <p>Continue in the AloeRoam app to choose your new password.</p>

        <a href={recoveryLink}>Open AloeRoam</a>

        {attemptedOpen ? (
          <p className="statusHint">
            If AloeRoam did not open automatically, tap{" "}
            <strong>Open AloeRoam</strong> above.
          </p>
        ) : (
          <p className="statusHint">Opening AloeRoam...</p>
        )}

        <Link href="/support">Need Help?</Link>
      </section>
    </main>
  );
}
