import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "AloeRoam Privacy Policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legalPage">
      <div className="legalContainer">
        <Link href="/" className="legalBackLink">
          Back to AloeRoam
        </Link>

        <header className="legalHeader">
          <p className="legalEyebrow">AloeRoam</p>
          <h1>Privacy Policy</h1>
          <p className="legalUpdated">Last updated: 14 October 2026</p>
        </header>

        <section className="legalSection">
          <h2>1. Introduction</h2>
          <p>
            Welcome to AloeRoam. AloeRoam helps people discover local events,
            promotions and services while giving businesses and service
            providers a platform to share their offerings.
          </p>
          <p>
            This Privacy Policy explains the types of personal information we
            may collect, how we may use that information, and the choices
            available to you when you use AloeRoam.
          </p>
        </section>

        <section className="legalSection">
          <h2>2. Information We Collect</h2>

          <h3>Account information</h3>
          <p>When you create or manage an AloeRoam account, we may collect:</p>
          <ul>
            <li>Your name.</li>
            <li>Your email address.</li>
            <li>Account and profile information you choose to provide.</li>
            <li>Authentication information required to secure your account.</li>
          </ul>

          <h3>Location and area information</h3>
          <p>
            AloeRoam may use an area you select, or location information you
            choose to provide, to show relevant events, promotions and services.
          </p>

          <h3>Provider and listing information</h3>
          <p>
            If you create a provider profile or submit a listing, we may collect
            information such as:
          </p>
          <ul>
            <li>Provider or business name.</li>
            <li>Business description and contact details.</li>
            <li>Website information.</li>
            <li>Event, promotion or service details.</li>
            <li>Images or other content submitted with a listing.</li>
          </ul>

          <h3>App activity</h3>
          <p>
            We may process information about how AloeRoam features are used,
            such as searches, listing views, saved listings, reminders and
            interactions with provider listings.
          </p>
        </section>

        <section className="legalSection">
          <h2>3. How We Use Information</h2>
          <p>We may use information to:</p>
          <ul>
            <li>Create, secure and manage AloeRoam accounts.</li>
            <li>Provide local discovery and search functionality.</li>
            <li>Display provider profiles and published listings.</li>
            <li>Provide saved-listing and reminder functionality.</li>
            <li>Operate, maintain and improve AloeRoam.</li>
            <li>Respond to support requests.</li>
            <li>Detect, prevent and investigate misuse or security issues.</li>
            <li>Meet applicable legal obligations.</li>
          </ul>
        </section>

        <section className="legalSection">
          <h2>4. Provider Analytics</h2>
          <p>
            AloeRoam may provide providers with information about engagement
            with their listings. This may include activity such as listing
            views, saves, reminders, contact actions, website visits or
            direction requests where those features are available.
          </p>
        </section>

        <section className="legalSection">
          <h2>5. Sharing of Information</h2>
          <p>AloeRoam does not sell personal information.</p>
          <p>We may disclose information when reasonably necessary to:</p>
          <ul>
            <li>Use service providers that help us operate AloeRoam.</li>
            <li>Comply with applicable law or a lawful request.</li>
            <li>Protect AloeRoam, our users, providers or the public.</li>
            <li>Investigate suspected fraud, misuse or security incidents.</li>
          </ul>
          <p>
            Information that a provider chooses to publish as part of a public
            provider profile or listing may be visible to AloeRoam users.
          </p>
        </section>

        <section className="legalSection">
          <h2>6. Data Security</h2>
          <p>
            We use reasonable technical and organisational measures intended to
            protect information against unauthorised access, loss, misuse or
            alteration. No method of electronic storage or transmission is
            completely secure, so absolute security cannot be guaranteed.
          </p>
        </section>

        <section className="legalSection">
          <h2>7. Data Retention</h2>
          <p>
            We may retain information for as long as reasonably necessary to
            provide AloeRoam, maintain account and platform security, resolve
            disputes, enforce our terms, and meet applicable legal obligations.
          </p>
        </section>

        <section className="legalSection">
          <h2>8. Your Choices and Rights</h2>
          <p>Depending on applicable law, you may be able to:</p>
          <ul>
            <li>Access or update account information.</li>
            <li>Ask us to correct inaccurate personal information.</li>
            <li>Request deletion of your account or personal information.</li>
            <li>Contact us with questions about how information is handled.</li>
          </ul>
          <p>
            Some information may need to be retained where required by law or
            for legitimate security, dispute-resolution or record-keeping
            purposes.
          </p>
        </section>

        <section className="legalSection">
          <h2>9. Children's Privacy</h2>
          <p>
            AloeRoam is not intended for children under 13. We do not knowingly
            seek to collect personal information from children under 13.
          </p>
        </section>

        <section className="legalSection">
          <h2>10. Third-Party Services and Links</h2>
          <p>
            AloeRoam may rely on third-party services to provide functions such
            as authentication, hosting, storage or notifications. AloeRoam may
            also contain links to provider websites or other third-party
            services. Those third parties may have their own privacy practices
            and policies.
          </p>
        </section>

        <section className="legalSection">
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy when AloeRoam, our practices or
            applicable requirements change. When we update it, the revised
            policy will be published on this page with an updated date.
          </p>
        </section>

        <section className="legalSection">
          <h2>12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or privacy at
            AloeRoam, please contact the AloeRoam support team through our
            support page.
          </p>
          <p>
            <Link href="/support" className="legalInlineLink">
              Visit AloeRoam Support
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
