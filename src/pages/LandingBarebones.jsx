import React, { useCallback, useEffect, useState } from "react";
import "./LandingBarebones.css";
import heroPlaceholder from "../assets/hero-placeholder.png";

const STITCH_HERO_ID = "45ac4478a1b7455f861d7377f92105e6";
const STITCH_HERO_FILENAME = `hero-${STITCH_HERO_ID}.png`;
const STITCH_SCREEN_URL =
  "https://stitch.withgoogle.com/projects/13629074018280446337/screens/45ac4478a1b7455f861d7377f92105e6";

/**
 * LandingBarebones
 *
 * Semantic, accessible landing hero with responsive two-column layout.
 * Attempts to resolve a stitched hero asset (src/assets/hero-<id>.png).
 * Falls back to bundled placeholder (imported above).
 */
export default function LandingBarebones() {
  const [heroSrc, setHeroSrc] = useState(heroPlaceholder);
  const [assetMissing, setAssetMissing] = useState(false);
  const [attemptedUrl, setAttemptedUrl] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const resolveCandidateUrl = useCallback(() => {
    try {
      // Prefer bundler-resolved URL (works with Vite/ESM)
      return new URL(`../assets/${STITCH_HERO_FILENAME}`, import.meta.url).href;
    } catch {
      // Fallback runtime path used in some dev setups
      return `/src/assets/${STITCH_HERO_FILENAME}`;
    }
  }, []);

  const attemptRuntimeFetch = useCallback(async () => {
    const candidate = resolveCandidateUrl();
    setAttemptedUrl(candidate);

    // Try HEAD first, then GET if HEAD not allowed
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      let res = await fetch(candidate, { method: "HEAD", cache: "no-cache", signal: controller.signal }).catch(
        () => null
      );
      clearTimeout(timeout);

      if (!res || !res.ok) {
        // Try GET as last resort
        const controller2 = new AbortController();
        const timeout2 = setTimeout(() => controller2.abort(), 4000);
        res =
          (await fetch(candidate, { method: "GET", cache: "no-cache", signal: controller2.signal }).catch(() => null)) ||
          res;
        clearTimeout(timeout2);
      }

      if (res && res.ok) {
        setHeroSrc(candidate);
        setAssetMissing(false);
        return true;
      }
    } catch (err) {
      // Network or CORS can fail; mark as missing below
      // eslint-disable-next-line no-console
      console.debug("Stitched asset check failed:", err);
    }

    setAssetMissing(true);
    return false;
  }, [resolveCandidateUrl]);

  useEffect(() => {
    let mounted = true;

    const tryResolveGlob = () => {
      try {
        if (typeof import.meta !== "undefined" && typeof import.meta.glob === "function") {
          const entries = import.meta.glob("../assets/hero-*.png", { eager: true, as: "url" });
          if (entries && typeof entries === "object") {
            for (const p in entries) {
              if (!Object.prototype.hasOwnProperty.call(entries, p)) continue;
              if (p.includes(STITCH_HERO_FILENAME)) {
                const url = entries[p];
                if (typeof url === "string" && url.length) {
                  if (mounted) {
                    setHeroSrc(url);
                    setAssetMissing(false);
                  }
                  return true;
                }
                if (entries[p] && entries[p].default && typeof entries[p].default === "string") {
                  if (mounted) {
                    setHeroSrc(entries[p].default);
                    setAssetMissing(false);
                  }
                  return true;
                }
              }
            }
          }
        }
      } catch (e) {
        // ignore and fallback
        // eslint-disable-next-line no-console
        console.debug("Glob import failed; falling back to runtime fetch", e);
      }
      return false;
    };

    const found = tryResolveGlob();
    if (!found) {
      attemptRuntimeFetch().catch(() => {
        if (mounted) setAssetMissing(true);
      });
    }

    return () => {
      mounted = false;
    };
  }, [attemptRuntimeFetch, retryCount]);

  const handleCTAClick = useCallback((e) => {
    const target = "/signup";
    // let modifier clicks behave normally (open in new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    try {
      window.location.href = target;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Navigation to CTA failed", err);
    }
  }, []);

  const handleCTAKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  }, []);

  const handleRetry = useCallback(() => {
    setAssetMissing(false);
    setRetryCount((c) => c + 1);
  }, []);

  const onImgError = useCallback(() => {
    // If the img fails to load, revert to placeholder and flag missing
    setHeroSrc(heroPlaceholder);
    setAssetMissing(true);
  }, []);

  return (
    <main role="main" className="landing-root" aria-label="Landing page - Bare bones">
      <header className="hero" role="banner" aria-labelledby="hero-title">
        <div className="container hero-inner" style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="hero-grid" data-testid="hero-grid">
            <div className="hero-content" data-testid="hero-content" aria-describedby="hero-desc">
              <h1 id="hero-title" className="hero-title">
                Learn English confidently — one step at a time
              </h1>

              <p id="hero-desc" className="hero-subhead">
                Bite-sized lessons, practical exercises, and friendly progress tracking to help you grow your
                English skills faster.
              </p>

              <div className="hero-cta-row" role="group" aria-label="Primary call to actions">
                <a
                  href="/signup"
                  role="button"
                  aria-label="Get started — sign up"
                  className="btn btn-primary hero-cta"
                  onClick={handleCTAClick}
                  onKeyDown={handleCTAKeyDown}
                  tabIndex={0}
                >
                  Get started — it's free
                </a>

                <a
                  href="/learn-more"
                  className="btn btn-secondary hero-cta-secondary"
                  aria-label="Learn more about the product"
                >
                  Learn more
                </a>
              </div>
            </div>

            <div className="hero-media" data-testid="hero-media" aria-hidden={false}>
              {!assetMissing ? (
                <figure className="hero-figure" style={{ margin: 0 }}>
                  <img
                    src={heroSrc}
                    alt="Hero illustration showing learning and progress"
                    className="hero-image"
                    onError={onImgError}
                    width="560"
                    height="420"
                    loading="lazy"
                    style={{ maxWidth: "100%", height: "auto", display: "block" }}
                  />
                </figure>
              ) : (
                <div
                  className="hero-asset-missing"
                  role="status"
                  aria-live="polite"
                  title={`Stitched asset missing: ${STITCH_HERO_FILENAME}`}
                >
                  <div className="hero-asset-missing-inner">
                    <svg
                      className="hero-asset-missing-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M21 19V5a2 2 0 0 0-2-2H5C3.89 3 3 3.89 3 5v14c0 1.11.89 2 2 2h14c1.1 0 2-.89 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                        opacity="0.9"
                      />
                    </svg>

                    <div className="hero-asset-missing-text">
                      <p className="muted">
                        Optional design asset not found: <strong>{STITCH_HERO_FILENAME}</strong>
                      </p>
                      <p className="muted small">Attempted URL: <code className="code">{attemptedUrl || "unknown"}</code></p>

                      <div className="hero-asset-missing-actions">
                        <button className="btn btn-tertiary" onClick={handleRetry} aria-label="Retry loading hero asset">
                          Retry
                        </button>
                        <a
                          href={STITCH_SCREEN_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-inline"
                          aria-label="Open Stitch screen in a new tab"
                        >
                          View design
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}