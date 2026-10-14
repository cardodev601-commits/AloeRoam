import Link from "next/link";

export const metadata = {
  title: "Password Reset",
  description: "Continue your AloeRoam password recovery process.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PasswordResetPage() {
  return (
    <main className="statusPage">
      <section className="statusCard">
        <div className="statusIcon" aria-hidden="true">
          ✓
        </div>

        <p className="legalEyebrow">AloeRoam</p>
        <h1>Password Recovery</h1>

        <p className="statusLead">
          Continue your password reset in the AloeRoam app.
        </p>

        <p className="statusText">
          If you opened this page from a password recovery email, return to the
          AloeRoam app to choose and save your new password.
        </p>

        <div className="statusActions">
          <a href="aloeroam://reset-password" className="primaryButton">
            Open AloeRoam
          </a>

          <Link href="/support" className="statusSecondaryButton">
            Get Support
          </Link>
        </div>

        <div className="statusHelp">
          <h2>App not opening?</h2>
          <p>
            Make sure AloeRoam is installed on your device. If you still cannot
            continue with password recovery, visit the AloeRoam Support page.
          </p>
        </div>

        <p className="statusFootnote">
          For your security, never share your password or recovery details with
          anyone.
        </p>
      </section>
    </main>
  );
}
