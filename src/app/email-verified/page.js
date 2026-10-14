import Link from "next/link";

export const metadata = {
  title: "Email Verified",
  description: "Your AloeRoam email address has been verified successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmailVerifiedPage() {
  return (
    <main className="statusPage">
      <section className="statusCard">
        <div className="statusIcon" aria-hidden="true">
          ✓
        </div>

        <p className="legalEyebrow">AloeRoam</p>
        <h1>Email Verified</h1>

        <p className="statusLead">
          Your email address has been verified successfully.
        </p>

        <p className="statusText">
          Your AloeRoam account is ready. You can return to the AloeRoam app
          and sign in using your registered email address and password.
        </p>

        <div className="statusActions">
          <Link href="/" className="primaryButton">
            Visit AloeRoam
          </Link>

          <Link href="/support" className="statusSecondaryButton">
            Get Support
          </Link>
        </div>

        <div className="statusHelp">
          <h2>Having trouble signing in?</h2>
          <p>
            If you cannot access your account after verification, visit the
            AloeRoam Support page for assistance.
          </p>
        </div>
      </section>
    </main>
  );
}
