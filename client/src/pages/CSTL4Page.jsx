import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ContentBlock from '../components/ContentBlock';
import Footer from '../components/Footer';
import styles from './styles/CSTL4.module.css';

/**
 * CSTL4Page
 * Main page implementing the Figma CSTL-4 frame.
 *
 * - Composes Header, Hero, multiple ContentBlock instances, and Footer.
 * - Uses CSS Modules (CSTL4.module.css) for responsive breakpoints:
 *   desktop: 1280px, tablet: 768px, mobile: 375px (handled in CSS file).
 * - Interactive CTAs use react-router navigation (useNavigate) and are guarded.
 * - No unsafe innerHTML usage to mitigate XSS risks.
 */

/* Minimal, safe inline SVG data URI generator used as placeholder illustrations.
   Using data URIs avoids external network requests and XSS surface. */
const makeSvgDataUri = (bg = '#e8f0ff', fg = '#1f4ed8', label = 'Illustration') => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 360'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0' stop-color='${bg}' />
        <stop offset='1' stop-color='${fg}' />
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)' rx='16' />
    <g fill='white' font-family='Arial,Helvetica,sans-serif' font-size='28' text-anchor='middle'>
      <text x='50%' y='49%' opacity='0.95'>${label}</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const sections = [
  {
    id: 'products',
    heading: 'Products that scale with your team',
    text:
      'Modular components and well-documented APIs let your team ship faster. Built for accessibility and performance.',
    imageAlt: 'Product illustration',
    imageSrc: makeSvgDataUri('#e6fffa', '#00a884', 'Products'),
    ctaText: 'Explore Products',
    ctaPath: '/products',
    reverse: false,
  },
  {
    id: 'features',
    heading: 'Features designed for reliability',
    text:
      'Observability, role-based permissions, and enterprise-grade SLAs ensure your mission-critical services stay online.',
    imageAlt: 'Features illustration',
    imageSrc: makeSvgDataUri('#fff7ed', '#ff7a18', 'Features'),
    ctaText: 'See Features',
    ctaPath: '/features',
    reverse: true,
  },
  {
    id: 'community',
    heading: 'A community of contributors',
    text:
      'Join a growing community that contributes plugins, integrations, and helpful guides — all open and collaborative.',
    imageAlt: 'Community illustration',
    imageSrc: makeSvgDataUri('#eef2ff', '#7c3aed', 'Community'),
    ctaText: 'Join Community',
    ctaPath: '/community',
    reverse: false,
  },
];

export default function CSTL4Page() {
  const navigate = useNavigate();
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    // set a descriptive, safe document title
    try {
      document.title = 'Constellation — Overview';
    } catch (err) {
      // Avoid writing to console in normal flows; surface a user-friendly message instead
      setActionError('Unable to update page title.');
    }
  }, []);

  const handleCta = (path) => (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    setActionError(null);
    try {
      // Basic validation of path to avoid navigation runtime errors
      if (!path || typeof path !== 'string') {
        setActionError('Invalid navigation path.');
        return;
      }
      // programmatic navigation using react-router
      navigate(path);
    } catch (err) {
      // Don't call console.error in normal operation; store a user-visible error instead
      setActionError('Navigation failed. Please try again.');
    }
  };

  return (
    <div className={styles.pageRoot || 'cstl4-page-root'}>
      <Header />

      <main className={styles.main || 'cstl4-main'} role="main">
        <Hero
          title="Build confidently. Ship quickly."
          subtitle="Design systems, APIs, and tools that empower teams to deliver production-quality software."
          primaryCta={
            <button
              type="button"
              className={styles.primaryCta || 'cstl4-cta-primary'}
              onClick={handleCta('/signup')}
              aria-label="Sign up for Constellation"
            >
              Get started
            </button>
          }
          secondaryCta={
            <Link className={styles.secondaryCta || 'cstl4-cta-secondary'} to="/docs" aria-label="Read the docs">
              Documentation
            </Link>
          }
        />

        <section className={styles.contentGrid || 'cstl4-content-grid'} aria-label="Primary content">
          {sections.map((s, idx) => (
            <div
              key={s.id}
              className={`${styles.sectionWrapper || 'cstl4-section'} ${
                s.reverse ? styles.reverse : ''
              }`.trim()}
            >
              <ContentBlock
                id={`content-${s.id}`}
                heading={s.heading}
                text={s.text}
                imageAlt={s.imageAlt}
                imageSrc={s.imageSrc}
                reverse={s.reverse}
                /* Provide a safe callback to ContentBlock in case it renders CTA itself */
                ctaText={s.ctaText}
                onCtaClick={handleCta(s.ctaPath)}
              />
              {/* For older/unknown ContentBlock implementations that don't render CTA,
                  provide a fallback accessible CTA here */}
              <div className={styles.fallbackCtaWrap || 'cstl4-fallback-cta'}>
                <button
                  type="button"
                  className={styles.tertiaryCta || 'cstl4-cta-tertiary'}
                  onClick={handleCta(s.ctaPath)}
                  aria-label={s.ctaText}
                >
                  {s.ctaText}
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className={styles.ctaStrip || 'cstl4-cta-strip'} aria-label="Call to action">
          <div className={styles.ctaInner || 'cstl4-cta-inner'}>
            <h3 className={styles.ctaHeading || 'cstl4-cta-heading'}>Ready to get started?</h3>
            <p className={styles.ctaSub || 'cstl4-cta-sub'}>
              Create an account and explore the platform with a 14-day trial — no credit card required.
            </p>
            <div className={styles.ctaActions || 'cstl4-cta-actions'}>
              <button
                type="button"
                className={styles.primaryCta || 'cstl4-cta-primary'}
                onClick={handleCta('/signup')}
                aria-label="Start free trial"
              >
                Start free trial
              </button>
              <Link to="/contact" className={styles.linkBtn || 'cstl4-link-btn'} aria-label="Contact sales">
                Contact sales
              </Link>
            </div>
          </div>
        </aside>

        {actionError ? (
          <div
            role="status"
            aria-live="polite"
            className={styles.actionError || 'cstl4-action-error'}
          >
            {actionError}
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}