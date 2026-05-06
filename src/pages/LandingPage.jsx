import React from "react";
import Hero from "../components/Landing/Hero";

/**
 * LandingPage
 *
 * - Composes top-level semantic sections: header, main, footer
 * - Assumes canonical Stitch CSS variables and landing.css are imported once at app entry (src/main.jsx)
 * - Uses explicit surface tokens via CSS classes (e.g., .hero--bg maps to --stitch-bg-hero)
 * - Keeps data-node-id attributes for runtime traceability and annotates each visible text node
 */
export default function LandingPage() {
  return (
    <>
      <header className="site-header surface--primary" role="banner">
        <div className="site-header__inner container">
          <a
            className="brand"
            href="/"
            aria-label="English Study Hub home"
            title="English Study Hub"
            data-node-id="45ac4478a1b7455f861d7377f92105e6.brand"
          >
            English Study Hub{/* node_id: 45ac4478a1b7455f861d7377f92105e6.brand */}
          </a>

          <nav className="main-nav" role="navigation" aria-label="Primary">
            <ul className="main-nav__list">
              <li>
                <a
                  href="#features"
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.nav_features"
                >
                  Features{/* node_id: 45ac4478a1b7455f861d7377f92105e6.nav_features */}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.nav_pricing"
                >
                  Pricing{/* node_id: 45ac4478a1b7455f861d7377f92105e6.nav_pricing */}
                </a>
              </li>
              <li>
                <a
                  href="#resources"
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.nav_resources"
                >
                  Resources{/* node_id: 45ac4478a1b7455f861d7377f92105e6.nav_resources */}
                </a>
              </li>
              <li>
                <a
                  className="cta-link"
                  href="/signin"
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.nav_signin"
                >
                  Sign in{/* node_id: 45ac4478a1b7455f861d7377f92105e6.nav_signin */}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="site-main" role="main">
        <section
          className="hero hero--bg surface--hero"
          aria-labelledby="hero-heading"
          data-node-id="45ac4478a1b7455f861d7377f92105e6.hero_section"
        >
          <div className="container hero__inner">
            {/* The Hero component renders the decorative and typed content.
                The landmark is labelled here (aria-labelledby="hero-heading").
                Ensure Hero does not duplicate aria-labelledby on another landmark. */}
            <Hero />
          </div>
        </section>

        <section
          id="features"
          className="stripe stripe--features surface--container"
          aria-labelledby="features-heading"
          data-node-id="45ac4478a1b7455f861d7377f92105e6.features_section"
        >
          <div className="container stripe__inner">
            <h2
              id="features-heading"
              data-node-id="45ac4478a1b7455f861d7377f92105e6.features_title"
            >
              Learn faster with daily, bite-sized lessons{/* node_id: 45ac4478a1b7455f861d7377f92105e6.features_title */}
            </h2>
            <p
              className="lead"
              data-node-id="45ac4478a1b7455f861d7377f92105e6.features_subtitle"
            >
              Practical exercises, real-world dialogues, and spaced repetition to keep progress steady.{/* node_id: 45ac4478a1b7455f861d7377f92105e6.features_subtitle */}
            </p>

            <ul className="features-grid" role="list">
              <li className="feature-card surface--card" role="listitem">
                <h3
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.feature1_title"
                >
                  Bite-sized lessons{/* node_id: 45ac4478a1b7455f861d7377f92105e6.feature1_title */}
                </h3>
                <p
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.feature1_desc"
                >
                  10–15 minute lessons designed for daily practice and retention.{/* node_id: 45ac4478a1b7455f861d7377f92105e6.feature1_desc */}
                </p>
              </li>

              <li className="feature-card surface--card" role="listitem">
                <h3
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.feature2_title"
                >
                  Real conversations{/* node_id: 45ac4478a1b7455f861d7377f92105e6.feature2_title */}
                </h3>
                <p
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.feature2_desc"
                >
                  Dialogues and speaking exercises model real interactions.{/* node_id: 45ac4478a1b7455f861d7377f92105e6.feature2_desc */}
                </p>
              </li>

              <li className="feature-card surface--card" role="listitem">
                <h3
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.feature3_title"
                >
                  Track your progress{/* node_id: 45ac4478a1b7455f861d7377f92105e6.feature3_title */}
                </h3>
                <p
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.feature3_desc"
                >
                  Clear milestones, personalized feedback, and scheduled review sessions help build confidence and keep learning on track.{/* node_id: 45ac4478a1b7455f861d7377f92105e6.feature3_desc */}
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="pricing"
          className="stripe stripe--cta surface--container"
          aria-labelledby="pricing-heading"
          data-node-id="45ac4478a1b7455f861d7377f92105e6.pricing_section"
        >
          <div className="container stripe__inner">
            <h2
              id="pricing-heading"
              data-node-id="45ac4478a1b7455f861d7377f92105e6.pricing_title"
            >
              Simple pricing for learners at every level{/* node_id: 45ac4478a1b7455f861d7377f92105e6.pricing_title */}
            </h2>
            <p
              data-node-id="45ac4478a1b7455f861d7377f92105e6.pricing_subtitle"
            >
              Free tier with essentials, premium for advanced features and offline downloads.{/* node_id: 45ac4478a1b7455f861d7377f92105e6.pricing_subtitle */}
            </p>
            <a
              className="btn btn--primary"
              href="/pricing"
              role="button"
              data-node-id="45ac4478a1b7455f861d7377f92105e6.pricing_cta"
            >
              View pricing{/* node_id: 45ac4478a1b7455f861d7377f92105e6.pricing_cta */}
            </a>
          </div>
        </section>
      </main>

      <footer
        className="site-footer surface--footer"
        role="contentinfo"
        aria-label="Site footer"
        data-node-id="45ac4478a1b7455f861d7377f92105e6.footer_section"
      >
        <div className="container site-footer__inner">
          <div className="footer-col">
            <p
              data-node-id="45ac4478a1b7455f861d7377f92105e6.footer_copyright"
            >
              © {new Date().getFullYear()} English Study Hub{/* node_id: 45ac4478a1b7455f861d7377f92105e6.footer_copyright */}
            </p>
          </div>

          <div className="footer-col">
            <ul className="footer-links" aria-label="Footer links">
              <li>
                <a
                  href="/about"
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.footer_about"
                >
                  About{/* node_id: 45ac4478a1b7455f861d7377f92105e6.footer_about */}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  data-node-id="45ac4478a1b7455f861d7377f92105e6.footer_terms"
                >
                  Terms{/* node_id: 45ac4478a1b7455f861d7377f92105e6.footer_terms */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}