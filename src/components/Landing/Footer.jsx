import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--colors-surface-container-low)',
        borderTop: '1px solid var(--colors-outline-variant)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--spacing-container-max)',
          margin: '0 auto',
          width: '100%',
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body-ui)',
            fontSize: '12px',
            color: 'var(--colors-on-surface-variant)',
          }}
        >
          © 2024 Linguist Library. Premium Academic English Study.
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '12px',
              color: 'var(--colors-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            Terms of Service
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '12px',
              color: 'var(--colors-on-surface-variant)',
              textDecoration: 'none',
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '12px',
              color: 'var(--colors-on-surface)',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;