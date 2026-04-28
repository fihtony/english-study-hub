import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/CSTL4.module.css";

/**
 * Hero component used on the CSTL-4 page.
 *
 * Props:
 *  - heading (string): Main headline text.
 *  - subtitle (string): Supporting subtext.
 *  - ctaText (string): Primary CTA label.
 *  - ctaHref (string): Optional href to navigate to when CTA clicked.
 *  - onCtaClick (function): Optional callback invoked when CTA clicked. Receives the click event.
 *  - ariaLabel (string): Accessible label for the section.
 *
 * Behavior:
 *  - If onCtaClick is provided, it will be invoked and default navigation prevented.
 *  - Else if ctaHref is provided, a normal anchor navigation will occur.
 *  - If neither is provided, the CTA renders as a disabled button.
 *
 * Security:
 *  - Props are rendered as plain text (React escapes content by default) to avoid XSS.
 *  - No dangerouslySetInnerHTML used.
 */
export default function Hero({
  heading,
  subtitle,
  ctaText,
  ctaHref,
  onCtaClick,
  ariaLabel,
}) {
  // Basic runtime validation for critical props (defensive programming).
  if (typeof heading !== "string") {
    // Do not throw — render fallback and log for diagnostics.
    // This preserves UX while surfacing the issue for developers.
    // eslint-disable-next-line no-console
    console.error(
      "Hero: expected prop `heading` to be a string. Falling back to empty string."
    );
    heading = String(heading ?? "");
  }

  if (typeof subtitle !== "string") {
    // eslint-disable-next-line no-console
    console.warn(
      "Hero: expected prop `subtitle` to be a string. Falling back to empty string."
    );
    subtitle = String(subtitle ?? "");
  }

  const handleCtaClick = async (e) => {
    try {
      if (onCtaClick) {
        // Prevent default navigation if a callback is provided.
        if (e && typeof e.preventDefault === "function") e.preventDefault();
        // Support sync or async handlers.
        await onCtaClick(e);
      } else {
        // No callback: allow anchor navigation to proceed.
        // Nothing to do here for anchors.
      }
    } catch (err) {
      // Robust error handling: log but don't crash the app.
      // eslint-disable-next-line no-console
      console.error("Hero CTA handler error:", err);
    }
  };

  const renderCta = () => {
    const safeCtaText = ctaText ?? "Get started";

    if (onCtaClick) {
      // Render an accessible button when using an in-app callback.
      return (
        <button
          type="button"
          className={`${styles.ctaPrimary}`}
          onClick={handleCtaClick}
          aria-label={safeCtaText}
        >
          {safeCtaText}
        </button>
      );
    }

    if (ctaHref) {
      // Anchor navigation. Open in same tab by default; caller may supply absolute or relative URL.
      // Use rel="noopener noreferrer" only when target="_blank" is used to avoid leaking window.opener.
      return (
        <a
          href={ctaHref}
          className={`${styles.ctaPrimary}`}
          onClick={handleCtaClick}
          aria-label={safeCtaText}
        >
          {safeCtaText}
        </a>
      );
    }

    // No action provided: disabled button
    return (
      <button
        type="button"
        className={`${styles.ctaPrimary} ${styles.ctaDisabled}`}
        disabled
        aria-disabled="true"
        aria-label={`${safeCtaText} (disabled)`}
      >
        {safeCtaText}
      </button>
    );
  };

  return (
    <section
      className={styles.hero}
      aria-label={ariaLabel || "Hero"}
      role="region"
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.cta} data-testid="hero-cta">
            {renderCta()}
          </div>
        </div>

        <div className={styles.illustration} aria-hidden="true">
          {/* Lightweight SVG illustration placeholder matching Figma wireframe proportions.
              Kept inline to avoid external network requests and remain self-contained. */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.95" />
              </linearGradient>
              <filter id="f1" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="24" result="b" />
                <feBlend in="SourceGraphic" in2="b" />
              </filter>
            </defs>

            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="18"
              fill="url(#g1)"
              opacity="0.12"
            />
            <g transform="translate(40,30)">
              <rect
                x="0"
                y="0"
                width="320"
                height="220"
                rx="14"
                fill="#fff"
                opacity="0.08"
                filter="url(#f1)"
              />
              <rect
                x="20"
                y="20"
                width="280"
                height="160"
                rx="8"
                fill="#ffffff"
                opacity="0.06"
              />
              <circle cx="260" cy="40" r="18" fill="#fff" opacity="0.12" />
              <rect
                x="36"
                y="36"
                width="120"
                height="28"
                rx="6"
                fill="#fff"
                opacity="0.18"
              />
              <rect
                x="36"
                y="72"
                width="220"
                height="12"
                rx="6"
                fill="#fff"
                opacity="0.12"
              />
              <rect
                x="36"
                y="96"
                width="200"
                height="12"
                rx="6"
                fill="#fff"
                opacity="0.10"
              />
            </g>

            {/* Accent dots */}
            <g fill="#4F46E5" opacity="0.14">
              <circle cx="520" cy="340" r="36" />
              <circle cx="560" cy="60" r="18" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  heading: PropTypes.string,
  subtitle: PropTypes.string,
  ctaText: PropTypes.string,
  ctaHref: PropTypes.string,
  onCtaClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

Hero.defaultProps = {
  heading: "Build something exceptional",
  subtitle:
    "Launch quickly with opinionated, accessible components and a production-ready layout that matches the design system.",
  ctaText: "Get started",
  ctaHref: null,
  onCtaClick: null,
  ariaLabel: "Main hero",
};