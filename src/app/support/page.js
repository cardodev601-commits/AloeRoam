import Link from "next/link";

export const metadata = {
  title: "Support",
  description: "Get help and support for AloeRoam.",
};

const supportEmail = "support@aloeroam.app";

export default function SupportPage() {
  return (
    <main className="legalPage">
      <div className="legalContainer">
        <Link href="/" className="legalBackLink">
          Back to AloeRoam
        </Link>

        <header className="legalHeader">
          <p className="legalEyebrow">AloeRoam</p>
          <h1>Support</h1>
          <p className="legalUpdated">
            Help with your account, listings and AloeRoam experience.
          </p>
        </header>

        <section className="legalSection">
          <h2>Need Help?</h2>
          <p>
            If you have a question, encounter a problem, or need assistance
            using AloeRoam, contact the AloeRoam Support Team.
          </p>
          <p>
            <a href={`mailto:${supportEmail}`} className="legalInlineLink">
              {supportEmail}
            </a>
          </p>
        </section>

        <section className="legalSection">
          <h2>Account Support</h2>
          <p>Contact support if you need help with:</p>
          <ul>
            <li>Creating or accessing your AloeRoam account.</li>
            <li>Sign-in problems.</li>
            <li>Password reset issues.</li>
            <li>Email verification.</li>
            <li>Updating your account information.</li>
            <li>Requesting account deletion.</li>
          </ul>
        </section>

        <section className="legalSection">
          <h2>Provider and Listing Support</h2>
          <p>Providers can contact us for assistance with:</p>
          <ul>
            <li>Creating or managing a provider profile.</li>
            <li>Creating event, promotion or service listings.</li>
            <li>Updating listing information.</li>
            <li>Listing review or moderation questions.</li>
            <li>Provider analytics and listing engagement features.</li>
          </ul>
        </section>

        <section className="legalSection">
          <h2>Report a Problem</h2>
          <p>
            If something is not working correctly, please include as much useful
            information as possible in your support request, such as:
          </p>
          <ul>
            <li>A short description of the problem.</li>
            <li>What you were trying to do when the problem occurred.</li>
            <li>Any error message displayed by AloeRoam.</li>
            <li>A screenshot, if one is available and safe to share.</li>
            <li>Your device model and operating system version, if relevant.</li>
          </ul>
          <p>
            Please do not send passwords, authentication codes or other secret
            account credentials in a support message.
          </p>
        </section>

        <section className="legalSection">
          <h2>Frequently Asked Questions</h2>

          <h3>How do I reset my password?</h3>
          <p>
            Use the Forgot Password option on the AloeRoam sign-in screen and
            follow the instructions sent to your registered email address.
          </p>

          <h3>Why can I not see a provider listing?</h3>
          <p>
            A listing may still be awaiting review, may have been unpublished,
            or may not match the location and filters currently selected in the
            app.
          </p>

          <h3>How do I search another area?</h3>
          <p>
            Use the search location selector on the Search screen to choose a
            different search area without changing your main AloeRoam area.
          </p>

          <h3>How do I become a provider?</h3>
          <p>
            Use the provider features available from your AloeRoam profile to
            begin setting up a provider profile.
          </p>
        </section>

        <section className="legalSection">
          <h2>Privacy and Terms</h2>
          <p>
            You can review how AloeRoam handles personal information and the
            rules that apply when using the platform on the following pages.
          </p>
          <p>
            <Link href="/privacy-policy" className="legalInlineLink">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="legalInlineLink">
              Terms of Use
            </Link>
          </p>
        </section>

        <section className="legalSection">
          <h2>Contact AloeRoam Support</h2>
          <p>
            Email:
            {" "}
            <a href={`mailto:${supportEmail}`} className="legalInlineLink">
              {supportEmail}
            </a>
          </p>
          <p>
            When contacting support, please use the email address associated
            with your AloeRoam account where possible. Never include your
            password in a support request.
          </p>
        </section>
      </div>
    </main>
  );
}
