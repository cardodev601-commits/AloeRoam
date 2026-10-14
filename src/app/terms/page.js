import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "AloeRoam Terms of Use.",
};

export default function TermsPage() {
  return (
    <main className="legalPage">
      <div className="legalContainer">
        <Link href="/" className="legalBackLink">
          Back to AloeRoam
        </Link>

        <header className="legalHeader">
          <p className="legalEyebrow">AloeRoam</p>
          <h1>Terms of Use</h1>
          <p className="legalUpdated">Last updated: 14 October 2026</p>
        </header>

        <section className="legalSection">
          <h2>1. Welcome to AloeRoam</h2>
          <p>
            AloeRoam is a platform that helps people discover local events,
            promotions and services while giving businesses and service
            providers a platform to share their offerings.
          </p>
          <p>
            By accessing or using AloeRoam, you agree to these Terms of Use. If
            you do not agree with these Terms, please do not use AloeRoam.
          </p>
        </section>

        <section className="legalSection">
          <h2>2. Eligibility</h2>
          <p>To use AloeRoam, you agree to:</p>
          <ul>
            <li>Provide accurate information when creating an account.</li>
            <li>Use the platform in accordance with applicable laws.</li>
            <li>Keep your account credentials secure.</li>
          </ul>
        </section>

        <section className="legalSection">
          <h2>3. Your Account</h2>
          <p>
            You are responsible for activity performed through your account and
            for keeping your sign-in information secure. You should notify
            AloeRoam support if you believe your account has been accessed
            without authorisation.
          </p>
          <p>
            You may not impersonate another person, provider, organisation or
            business when using AloeRoam.
          </p>
        </section>

        <section className="legalSection">
          <h2>4. Acceptable Use</h2>
          <p>You agree not to use AloeRoam to:</p>
          <ul>
            <li>Publish false, misleading, fraudulent or unlawful content.</li>
            <li>Impersonate another person, organisation or business.</li>
            <li>Interfere with the operation, availability or security of AloeRoam.</li>
            <li>Attempt unauthorised access to accounts, systems or data.</li>
            <li>Upload malicious code or content intended to harm others.</li>
            <li>Use automated methods to extract platform data without permission.</li>
          </ul>
        </section>

        <section className="legalSection">
          <h2>5. Provider Profiles and Listings</h2>
          <p>
            Providers may use AloeRoam to create profiles and submit listings
            for events, promotions or services where those features are
            available.
          </p>
          <p>Providers are responsible for ensuring that submitted content is:</p>
          <ul>
            <li>Accurate and reasonably up to date.</li>
            <li>Lawful and appropriate for publication.</li>
            <li>Not misleading or fraudulent.</li>
            <li>Content they are authorised to publish.</li>
          </ul>
          <p>
            Providers remain responsible for the events, promotions, products
            and services they offer or advertise through AloeRoam.
          </p>
        </section>

        <section className="legalSection">
          <h2>6. Listing Review and Moderation</h2>
          <p>
            AloeRoam may review, approve, reject, request changes to, restrict
            or remove listings or other content where reasonably necessary to
            operate the platform or enforce these Terms.
          </p>
          <p>
            Publication of a listing does not mean that AloeRoam endorses the
            provider, event, promotion or service described in that listing.
          </p>
        </section>

        <section className="legalSection">
          <h2>7. User Interactions</h2>
          <p>
            AloeRoam may provide features that allow users to search for,
            discover, save or interact with listings and provider information.
          </p>
          <p>
            Users should independently verify important information with the
            relevant provider before travelling, purchasing, booking or relying
            on a listing.
          </p>
        </section>

        <section className="legalSection">
          <h2>8. Accuracy and Availability</h2>
          <p>
            We aim to provide a useful and reliable service, but we do not
            guarantee that every listing, provider detail, price, date,
            availability or other piece of information will always be complete,
            current or error-free.
          </p>
          <p>
            AloeRoam may change, suspend or discontinue features when reasonably
            necessary to maintain or improve the platform.
          </p>
        </section>

        <section className="legalSection">
          <h2>9. Intellectual Property</h2>
          <p>
            AloeRoam branding, software, interface elements and original
            platform content are protected by applicable intellectual property
            laws. You may not copy, reproduce, modify or distribute AloeRoam
            branding or platform content without appropriate permission.
          </p>
          <p>
            Providers and users retain responsibility for content they submit
            and must have the necessary rights to publish that content.
          </p>
        </section>

        <section className="legalSection">
          <h2>10. Privacy</h2>
          <p>
            Our handling of personal information is described in the AloeRoam
            Privacy Policy.
          </p>
          <p>
            <Link href="/privacy-policy" className="legalInlineLink">
              Read the AloeRoam Privacy Policy
            </Link>
          </p>
        </section>

        <section className="legalSection">
          <h2>11. Suspension and Termination</h2>
          <p>
            AloeRoam may suspend, restrict or terminate access where reasonably
            necessary because of serious or repeated violations of these Terms,
            suspected fraud, unlawful activity, security risks or misuse of the
            platform.
          </p>
        </section>

        <section className="legalSection">
          <h2>12. Third-Party Services and Providers</h2>
          <p>
            AloeRoam may contain information, links or functionality associated
            with independent providers or third-party services. Those third
            parties are responsible for their own products, services, websites,
            policies and business practices.
          </p>
        </section>

        <section className="legalSection">
          <h2>13. Limitation of Responsibility</h2>
          <p>
            AloeRoam provides a discovery platform connecting users with
            information supplied by providers. To the extent permitted by
            applicable law, AloeRoam is not responsible for losses arising from
            inaccurate third-party listing information, provider conduct or
            transactions conducted directly between users and independent
            providers.
          </p>
          <p>
            Nothing in these Terms is intended to exclude or limit rights or
            remedies that cannot lawfully be excluded or limited.
          </p>
        </section>

        <section className="legalSection">
          <h2>14. Changes to These Terms</h2>
          <p>
            We may update these Terms when AloeRoam, our services or applicable
            requirements change. Updated Terms will be published on this page
            with a revised date.
          </p>
        </section>

        <section className="legalSection">
          <h2>15. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact the AloeRoam
            support team through our support page.
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
