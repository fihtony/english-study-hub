import React from 'react';

function Header() {
  return (
    <header
      style={{
        backgroundColor: 'var(--colors-surface-container-lowest)',
        borderBottom: '1px solid var(--colors-outline-variant)',
      }}
      className="bg-white border-b fixed top-0 left-0 right-0 z-50"
    >
      <div
        style={{
          maxWidth: 'var(--spacing-container-max)',
          margin: '0 auto',
          width: '100%',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'var(--font-h2)',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            color: 'var(--colors-primary)',
          }}
        >
          Linguist Library
        </div>

        {/* Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-gutter)',
          }}
          className="hidden md:flex"
        >
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--colors-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            Lessons
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--colors-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            Flashcards
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--colors-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            Progress
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--colors-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            Library
          </a>
        </nav>

        {/* Sign In Button */}
        <button
          style={{
            fontFamily: 'var(--font-body-ui)',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--colors-on-surface-variant)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;