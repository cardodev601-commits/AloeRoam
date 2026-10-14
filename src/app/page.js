import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="tag">🌿 Discover Local Experiences</span>

          <h1>AloeRoam</h1>

          <p className="heroText">
            Discover events, promotions and services happening around you.
          </p>

          <div className="buttonRow">
            <a href="#features" className="primaryButton">
              Explore AloeRoam
            </a>

            <Link href="/support" className="secondaryButton">
              Get Support
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>Discover More Around You</h2>

          <div className="featureGrid">
            <div className="card">
              <div className="icon">📍</div>
              <h3>Discover</h3>
              <p>Find events, promotions and services near your chosen area.</p>
            </div>

            <div className="card">
              <div className="icon">🎉</div>
              <h3>Experience</h3>
              <p>Never miss what's happening nearby.</p>
            </div>

            <div className="card">
              <div className="icon">🌿</div>
              <h3>Explore</h3>
              <p>
                Roam further and discover new places throughout South Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="providerSection">
        <div className="container">
          <h2>For Providers</h2>

          <p>
            Promote your events, specials and services to people looking for
            opportunities nearby.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footerContent">
          <div>© 2026 AloeRoam</div>

          <div className="footerLinks">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
