import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*
  Hero component (decomposed)
  - Renders only the content (no outer <section>) to avoid nested landmark regions.
  - Styling is applied via canonical CSS tokens/classes defined in src/styles/landing.css
    (landing.css should be imported once at app entrypoint: src/main.jsx).
*/

const STITCH_TEXT = {
  heading: "Learn English with Confidence",
  subheading:
    "Practical lessons, curated exercises, and friendly feedback to help you speak naturally.",
  cta: "Get Started",
};

const HERO_ASSET = {
  asset_id: "13629074018280446337-45ac4478a1b7455f861d7377f92105e6-asset",
  filename: "landing-hero.png",
  alt: "Landing hero illustration",
  publicPath: "/assets/stitch/landing-hero.png",
};

export default function Hero({
  heading = STITCH_TEXT.heading,
  subheading = STITCH_TEXT.subheading,
  ctaText = STITCH_TEXT.cta,
  // Accept either a public path ("/...") or an importable path
  imagePath = HERO_ASSET.publicPath,
  altText = HERO_ASSET.alt,
  href = "/signup",
  dataTestId = "hero",
  onCtaClick = null,
}) {
  const [imgSrc, setImgSrc] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [ctaFocusVisible, setCtaFocusVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const isPublic =
      typeof imagePath === "string" &&
      (imagePath.startsWith("/") || /^https?:\/\//i.test(imagePath));

    if (isPublic) {
      if (mounted) setImgSrc(imagePath);
      return () => {
        mounted = false;
      };
    }

    // Try dynamic import so bundlers include the asset when given a relative path.
    import(/* @vite-ignore */ imagePath)
      .then((mod) => {
        if (!mounted) return;
        setImgSrc(mod?.default || mod);
      })
      .catch(() => {
        if (!mounted) return;
        setImgError(true);
        // fallback to known public path so runtime can still show the hero image
        setImgSrc(HERO_ASSET.publicPath);
      });

    return () => {
      mounted = false;
    };
  }, [imagePath]);

  const handleCtaClick = useCallback(
    (e) => {
      try {
        if (onCtaClick) onCtaClick(e);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("onCtaClick error:", err);
      }
      // Let Link or native navigation handle routing; do not call window.location.assign.
    },
    [onCtaClick]
  );

  const handleCtaFocus = useCallback(() => setCtaFocusVisible(true), []);
  const handleCtaBlur = useCallback(() => setCtaFocusVisible(false), []);

  const handleImgError = useCallback(() => {
    setImgError(true);
    // keep src as fallback public path if not already set
    if (imgSrc !== HERO_ASSET.publicPath) setImgSrc(HERO_ASSET.publicPath);
  }, [imgSrc]);

  return (
    <div
      className="hero__inner"
      data-testid={dataTestId}
      data-node-id="45ac4478a1b7455f861d7377f92105e6.container"
    >
      <div className="hero__container">
        <div className="hero__content" data-testid={`${dataTestId}-content`}>
          <h1
            id="hero-heading"
            className="hero__title"
            data-testid={`${dataTestId}-heading`}
            data-node-id="45ac4478a1b7455f861d7377f92105e6.heading"
          >
            {/* node_id: 45ac4478a1b7455f861d7377f92105e6.heading */}
            {heading}
          </h1>

          <p
            className="hero__lead"
            data-testid={`${dataTestId}-lead`}
            data-node-id="45ac4478a1b7455f861d7377f92105e6.subheading"
          >
            {/* node_id: 45ac4478a1b7455f861d7377f92105e6.subheading */}
            {subheading}
          </p>

          {/* Use Link for SPA navigation (client-side). Renders as anchor but integrates with react-router. */}
          <Link
            to={href}
            className={`hero__cta ${ctaFocusVisible ? "focus-visible" : ""}`}
            onClick={handleCtaClick}
            onFocus={handleCtaFocus}
            onBlur={handleCtaBlur}
            aria-label={ctaText}
            data-testid={`${dataTestId}-cta`}
            data-node-id="45ac4478a1b7455f861d7377f92105e6.cta"
          >
            {/* node_id: 45ac4478a1b7455f861d7377f92105e6.cta */}
            {ctaText}
          </Link>
        </div>

        <figure
          className="hero__figure"
          aria-hidden={imgError ? "true" : "false"}
          data-testid={`${dataTestId}-figure`}
          data-node-id="45ac4478a1b7455f861d7377f92105e6.image"
        >
          {imgSrc && !imgError ? (
            <img
              src={imgSrc}
              alt={altText || HERO_ASSET.filename}
              className="hero__image"
              data-testid={`${dataTestId}-img`}
              onError={handleImgError}
            />
          ) : (
            <div
              className="hero__image--fallback"
              data-testid={`${dataTestId}-img-fallback`}
              role="img"
              aria-label={altText || HERO_ASSET.filename}
            >
              <span>Illustration</span>
            </div>
          )}
        </figure>
      </div>
    </div>
  );
}

Hero.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  ctaText: PropTypes.string,
  imagePath: PropTypes.string,
  altText: PropTypes.string,
  href: PropTypes.string,
  dataTestId: PropTypes.string,
  onCtaClick: PropTypes.func,
};

Hero.defaultProps = {
  heading: STITCH_TEXT.heading,
  subheading: STITCH_TEXT.subheading,
  ctaText: STITCH_TEXT.cta,
  imagePath: HERO_ASSET.publicPath,
  altText: HERO_ASSET.alt,
  href: "/signup",
  dataTestId: "hero",
  onCtaClick: null,
};