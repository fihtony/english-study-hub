import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "../styles/CSTL4.module.css";

/**
 * Footer component
 * - Responsive layout using CSS Modules (CSTL4.module.css)
 * - Accessible links and icons
 * - Produces a safe, XSS-free output by using static link constants only
 */

const NAV_LINKS = [
  { label: "About", href: "/about", external: false },
  { label: "Docs", href: "/docs", external: false },
  { label: "Blog", href: "/blog", external: false },
  { label: "Careers", href: "/careers", external: false },
];

const POLICY_LINKS = [
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Terms", href: "/terms", external: false },
  { label: "Accessibility", href: "/accessibility", external: false },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    aria: "Follow us on Twitter",
    // simple lightweight SVG
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M22 5.92c-.66.3-1.37.5-2.12.59a3.7 3.7 0 0 0 1.62-2.03 7.42 7.42 0 0 1-2.35.9 3.7 3.7 0 0 0-6.31 3.37A10.5 10.5 0 0 1 3.16 4.6a3.7 3.7 0 0 0 1.15 4.94c-.53-.02-1.03-.16-1.47-.4v.04a3.7 3.7 0 0 0 2.97 3.63c-.34.09-.7.14-1.07.14-.26 0-.52-.03-.77-.07a3.7 3.7 0 0 0 3.45 2.57A7.42 7.42 0 0 1 2 19.54a10.47 10.47 0 0 0 5.67 1.66c6.8 0 10.53-5.64 10.53-10.53v-.48A7.5 7.5 0 0 0 22 5.92z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    aria: "View our GitHub",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.39.98.11-.76.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.03 11.03 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.45-2.71 5.43-5.29 5.71.42.36.8 1.08.8 2.18 0 1.58-.01 2.85-.01 3.24 0 .3.21.67.8.56 4.57-1.53 7.85-5.85 7.85-10.95C23.5 5.73 18.27.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    aria: "Connect on LinkedIn",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98A1.99 1.99 0 0 0 7.96 5.48 1.99 1.99 0 0 0 4.98 3.5zM3.5 8.98h3v11.52h-3V8.98zM10.5 8.98h2.88v1.57h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.63v6.88h-3V15.7c0-1.44-.03-3.3-2.01-3.3-2.01 0-2.32 1.57-2.32 3.18v5.94h-3V8.98z" />
      </svg>
    ),
  },
];

function Footer() {
  try {
    const year = (() => {
      try {
        return new Date().getFullYear();
      } catch {
        return "2026";
      }
    })();

    // Defensive: ensure styles is an object from CSS modules; fall back to safe class names
    const s = styles && typeof styles === "object" ? styles : {};

    return (
      <footer className={s.footer || "footer"} role="contentinfo">
        <div className={s.container || "footerContainer"}>
          <div className={s.brand || "footerBrand"}>
            <a
              className={s.logoLink || "logoLink"}
              href="/"
              aria-label="Constellation home"
            >
              {/* simple accessible logo */}
              <svg
                className={s.logo || "logo"}
                width="36"
                height="36"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <rect width="48" height="48" rx="8" fill="#0B72B9" />
                <path
                  d="M12 32l8-14 8 14"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className={s.brandName || "brandName"}>Constellation</span>
            </a>
            <p className={s.copy || "copy"}>
              © {year} Constellation. All rights reserved.
            </p>
          </div>

          <nav
            className={s.columns || "footerColumns"}
            aria-label="Footer navigation"
          >
            <div className={s.linksColumn || "linksColumn"}>
              <h3 className={s.columnTitle || "columnTitle"}>Explore</h3>
              <ul className={s.linkList || "linkList"}>
                {NAV_LINKS.map((link) => (
                  <li key={link.label} className={s.linkItem || "linkItem"}>
                    <a
                      href={link.href}
                      className={s.link || "link"}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.linksColumn || "linksColumn"}>
              <h3 className={s.columnTitle || "columnTitle"}>Legal</h3>
              <ul className={s.linkList || "linkList"}>
                {POLICY_LINKS.map((link) => (
                  <li key={link.label} className={s.linkItem || "linkItem"}>
                    <a
                      href={link.href}
                      className={s.link || "link"}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className={s.social || "footerSocial"}>
            <h3 className={s.columnTitle || "columnTitle"}>Stay connected</h3>
            <ul className={s.socialList || "socialList"}>
              {SOCIAL_LINKS.map((slink) => (
                <li key={slink.label} className={s.socialItem || "socialItem"}>
                  <a
                    href={slink.href}
                    aria-label={slink.aria || slink.label}
                    title={slink.label}
                    className={s.socialLink || "socialLink"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={s.iconWrapper || "iconWrapper"}>
                      {slink.icon}
                    </span>
                    <span className={s.screenReaderOnly || "srOnly"}>
                      {slink.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    );
  } catch (err) {
    // Graceful fallback UI if render fails
    // Log to console for observability (avoid exposing error details in UI)
    // eslint-disable-next-line no-console
    console.error("Footer render error:", err);
    return (
      <footer className={styles?.footer || "footer"} role="contentinfo">
        <div className={styles?.container || "footerContainer"}>
          <p className={styles?.copy || "copy"}>© {new Date().getFullYear()} Constellation.</p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  // no props expected; PropTypes kept to signal intent and allow extension
};

export default memo(Footer);