import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/CSTL4.module.css";

/**
 * Header component - top navigation with responsive mobile menu.
 * Accessible: hamburger button with aria-expanded/controls, Escape closes menu,
 * focus is moved to first nav link when menu opens, body scroll locked while open.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const firstLinkRef = useRef(null);
  const menuId = "primary-navigation";

  useEffect(() => {
    // Close menu on Escape and on navigation via browser history (popstate).
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const onPopState = () => setMenuOpen(false);

    window.addEventListener("keydown", onKey, { passive: true });
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    // Move focus to first link when opening mobile menu.
    if (menuOpen) {
      try {
        firstLinkRef.current?.focus();
      } catch (err) {
        // Non-fatal; log for debugging
        // eslint-disable-next-line no-console
        console.error("Failed to move focus to menu link", err);
      }
    }
    // Lock body scroll while mobile menu is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Docs", to: "/docs" },
    { label: "About", to: "/about" },
  ];

  const handleToggle = (evt) => {
    try {
      evt?.preventDefault();
    } catch (err) {
      // ignore
    }
    setMenuOpen((v) => !v);
  };

  const handleCTAClick = (evt) => {
    try {
      evt.preventDefault();
      setMenuOpen(false);
      navigate("/signup");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("CTA navigation failed", err);
    }
  };

  const handleLinkClick = () => {
    // Close mobile menu when navigating via links
    setMenuOpen(false);
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerInner}>
        <div className={styles.logoArea}>
          <Link to="/" className={styles.logoLink} aria-label="Constellation home">
            <svg
              className={styles.logoMark}
              width="36"
              height="36"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <rect width="36" height="36" rx="6" fill="#0B5FFF" />
              <path d="M9 20 L15 12 L21 20" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="8" r="2" fill="#fff"/>
            </svg>
            <span className={styles.brand}>Constellation</span>
          </Link>
        </div>

        <nav className={styles.navWrap} aria-label="Main navigation">
          {/* Desktop / larger screens navigation */}
          <ul className={styles.navList}>
            {navLinks.map((nl, idx) => (
              <li key={nl.to} className={styles.navItem}>
                <Link
                  to={nl.to}
                  className={styles.navLink}
                  onClick={handleLinkClick}
                  ref={idx === 0 ? firstLinkRef : undefined}
                >
                  {nl.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.ctaWrap}>
            <button
              type="button"
              onClick={handleCTAClick}
              className={styles.ctaButton}
              aria-label="Get started"
            >
              Get started
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className={styles.mobileControls}>
          <button
            type="button"
            className={styles.menuButton}
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={handleToggle}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 6 L18 18 M6 18 L18 6" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M3 7h18M3 12h18M3 17h18" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id={menuId}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileNavList}>
          {navLinks.map((nl, idx) => (
            <li key={nl.to} className={styles.mobileNavItem}>
              <Link
                to={nl.to}
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
                ref={idx === 0 ? firstLinkRef : undefined}
              >
                {nl.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCTA}>
          <button
            type="button"
            onClick={handleCTAClick}
            className={styles.mobileCTAButton}
            aria-label="Get started"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  // no props for now - kept for future extensibility
};

export default Header;