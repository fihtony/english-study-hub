/**
 * Cstl4Page.jsx
 *
 * Implements the CSTL-4 page (Figma node 1:470) as a single React module.
 *
 * Notes on design fidelity:
 * - Typography tokens (font-size, line-height, font-weight, color) are applied via CSS Modules in
 *   './Cstl4Page.module.css'. If the exact Figma webfont is unavailable, the stylesheet falls back to
 *   system/web-safe fonts; that deviation is documented in the CSS file.
 * - Layout and spacing use CSS Grid and Flexbox with breakpoints at 1280px and 375px to match Figma
 *   artboard sizes (desktop 1280x800, mobile 375x812). Any micro-adjustments were made for
 *   responsive accessibility and consistent line-wrapping across browsers.
 *
 * Accessibility:
 * - Semantic elements used (header, main, section, footer).
 * - Buttons and links have accessible names, keyboard focus styles are left to CSS.
 * - Errors during navigation are announced via an aria-live region.
 *
 * Exports:
 * - default export: Cstl4Page
 * - named exports: Cstl4Header, Cstl4Hero, Cstl4ContentBlock, Cstl4CTA, Cstl4Footer (for unit testing)
 *
 * Dependencies: react, react-router-dom, ./Cstl4Page.module.css
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Cstl4Page.module.css';

export const Cstl4Header = ({ onLogoClick }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerInner}>
        <button
          type="button"
          className={styles.logoButton}
          aria-label="Constellation home"
          onClick={onLogoClick}
        >
          <span className={styles.logo} aria-hidden="true">Constellation</span>
        </button>

        <nav className={styles.headerNav} aria-label="Primary">
          <Link className={styles.navLink} to="/explore">Explore</Link>
          <Link className={styles.navLink} to="/learn">Learn</Link>
          <Link className={styles.navLink} to="/community">Community</Link>
          <Link className={styles.ctaLink} to="/signup">Get Started</Link>
        </nav>
      </div>
    </header>
  );
};

export const Cstl4Hero = ({ title, subtitle, primaryCtaLabel, onPrimaryCta }) => {
  return (
    <section className={styles.hero} aria-labelledby="cstl4-hero-title" role="region">
      <div className={styles.heroInner}>
        <h1 id="cstl4-hero-title" className={styles.heroTitle}>
          {title}
        </h1>
        <p className={styles.heroSubtitle}>
          {subtitle}
        </p>

        <div className={styles.heroActions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onPrimaryCta}
            aria-label={primaryCtaLabel || 'Primary call to action'}
          >
            {primaryCtaLabel || 'Get started'}
          </button>

          <Link className={styles.secondaryLink} to="/learn-more" aria-label="Learn more about Constellation">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Cstl4ContentBlock = ({ title, text, imageAlt, imageSrc, reverse = false }) => {
  return (
    <section
      className={`${styles.contentBlock} ${reverse ? styles.contentBlockReverse : ''}`}
      role="region"
      aria-labelledby={`cb-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className={styles.blockMedia} aria-hidden={imageSrc ? 'false' : 'true'}>
        {imageSrc ? <img src={imageSrc} alt={imageAlt || ''} className={styles.blockImage} /> : null}
      </div>

      <div className={styles.blockBody}>
        <h2 id={`cb-${title.replace(/\s+/g, '-').toLowerCase()}`} className={styles.blockTitle}>
          {title}
        </h2>
        <p className={styles.blockText}>
          {text}
        </p>
      </div>
    </section>
  );
};

export const Cstl4CTA = ({ onPrimary, onSecondary }) => {
  return (
    <section className={styles.cta} role="region" aria-labelledby="cstl4-cta-title">
      <div className={styles.ctaInner}>
        <h2 id="cstl4-cta-title" className={styles.ctaTitle}>Ready to explore?</h2>
        <p className={styles.ctaSubtitle}>
          Join Constellation and start leveling up your English reading and conversation skills with the community.
        </p>

        <div className={styles.ctaActions}>
          <button
            type="button"
            className={styles.primaryButtonLarge}
            onClick={onPrimary}
            aria-label="Sign up for Constellation"
          >
            Create account
          </button>

          <button
            type="button"
            className={styles.ghostButton}
            onClick={onSecondary}
            aria-label="Contact sales or enterprise"
          >
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
};

export const Cstl4Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <span className={styles.footerLogo}>Constellation</span>
          <p className={styles.footerNote}>© {new Date().getFullYear()} Constellation, Inc. All rights reserved.</p>
        </div>

        <nav className={styles.footerNav} aria-label="Footer">
          <Link className={styles.footerLink} to="/terms">Terms</Link>
          <Link className={styles.footerLink} to="/privacy">Privacy</Link>
          <Link className={styles.footerLink} to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
};

/**
 * Main page component
 *
 * Props:
 * - onPrimarySignup (optional): callback for primary CTA (used by tests). If not provided, navigates to /signup.
 */
export default function Cstl4Page({ onPrimarySignup }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleNavigateHome = (ev) => {
    ev.preventDefault();
    try {
      navigate('/');
    } catch (err) {
      console.error('Navigation error (home):', err);
      setError('Unable to navigate home. Please try again.');
    }
  };

  const handlePrimaryCta = async (ev) => {
    ev && ev.preventDefault && ev.preventDefault();
    setError(null);
    try {
      if (typeof onPrimarySignup === 'function') {
        await Promise.resolve(onPrimarySignup());
      } else {
        navigate('/signup');
      }
    } catch (err) {
      console.error('CTA handler failed:', err);
      setError('Failed to start signup. Please refresh and try again.');
    }
  };

  const handleContact = (ev) => {
    ev && ev.preventDefault && ev.preventDefault();
    try {
      navigate('/contact');
    } catch (err) {
      console.error('Contact navigation failed:', err);
      setError('Unable to open contact. Try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <Cstl4Header onLogoClick={handleNavigateHome} />

      <main className={styles.main} role="main">
        <Cstl4Hero
          title="Connect. Read. Grow."
          subtitle="Guided reading paths, community discussions, and live practice — all in one place to help you become a confident English reader and speaker."
          primaryCtaLabel="Create account — it's free"
          onPrimaryCta={handlePrimaryCta}
        />

        <div className={styles.content}>
          <Cstl4ContentBlock
            title="Curated reading paths"
            text="Structured sequences designed by language experts. Each path includes practice prompts and comprehension checks so you can measure progress."
            imageSrc="/static/images/reading-paths.png"
            imageAlt="Illustration of reading paths and progress"
          />

          <Cstl4ContentBlock
            title="Community discussion rooms"
            text="Join small-group discussions, moderated sessions, and peer feedback channels to practice speaking and exchange ideas."
            imageSrc="/static/images/community-rooms.png"
            imageAlt="People in virtual discussion rooms"
            reverse
          />

          <Cstl4ContentBlock
            title="Live practice events"
            text="Attend weekly live events with tutors and motivated peers. Real-time feedback sharpens listening and fluency faster than solo study."
            imageSrc="/static/images/live-events.png"
            imageAlt="Live virtual event with participants"
          />
        </div>

        <Cstl4CTA onPrimary={handlePrimaryCta} onSecondary={handleContact} />

        {/* Announce errors to assistive tech */}
        <div role="status" aria-live="polite" className={styles.visuallyHidden}>
          {error}
        </div>
      </main>

      <Cstl4Footer />
    </div>
  );
}