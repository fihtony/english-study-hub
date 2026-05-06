import React from 'react';

function Header() {
  return (
    <header data-testid="header" className="site-header">
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src="/src/assets/placeholder-logo.png" alt="" width="48" height="48" />
        <div>
          <p className="eyebrow" style={{ margin: 0, fontSize: '0.875rem', opacity: 0.95 }}>English Study Hub</p>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer data-testid="footer" className="site-footer" style={{ marginTop: '3rem', padding: '2rem 0', textAlign: 'center' }}>
      <div className="container">© {new Date().getFullYear()} English Study Hub</div>
    </footer>
  );
}

export default function Landing() {
  return (
    <>
      <Header />

      <main className="landing" aria-labelledby="landing-page-title">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container hero-inner">
            <div className="hero-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/src/assets/placeholder-logo.png" alt="" width="48" height="48" />
              <div>
                <p className="eyebrow" style={{ margin: 0, fontSize: '0.875rem', opacity: 0.95 }}>English Study Hub</p>
              </div>
            </div>

            <div className="hero-content" style={{ marginTop: '1rem', maxWidth: '56rem' }}>
              <h1 id="hero-heading" className="hero-title" data-testid="hero-title" style={{ margin: 0 }}>Learn English confidently</h1>
              <p className="hero-subtitle lead" style={{ marginTop: '0.5rem', fontSize: '1.125rem', lineHeight: 1.4 }}>
                Bite-sized lessons, live-style conversation practice, and progress tools — built for real learners.
              </p>

              <div className="hero-ctas" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <a aria-label="Get started" href="/get-started">Get started</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
