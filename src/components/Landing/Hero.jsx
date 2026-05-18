import React from 'react';

function Hero() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-stack-lg)', paddingTop: 'var(--spacing-stack-lg)' }}>
      {/* Big Headline */}
      <h1
        style={{
          fontFamily: 'var(--font-h1)',
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          color: 'var(--colors-primary)',
          maxWidth: '768px',
          margin: '0 auto',
        }}
      >
        Master Academic English with Scholarly Precision.
      </h1>

      {/* Single Primary CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'var(--spacing-stack-sm)' }}>
        <button
          style={{
            backgroundColor: 'var(--colors-on-tertiary-container)',
            color: 'var(--colors-on-tertiary)',
            fontFamily: 'var(--font-button)',
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '1',
            padding: '16px 48px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
          }}
        >
          Start Learning Now
        </button>
      </div>

      {/* 3 Plain Text Category Links */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--spacing-gutter)',
          paddingTop: 'var(--spacing-stack-lg)',
        }}
      >
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--colors-on-surface-variant)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-label-caps)',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Advanced Grammar
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            arrow_forward
          </span>
        </a>

        <div
          style={{
            width: '1px',
            height: '16px',
            backgroundColor: 'var(--colors-outline-variant)',
          }}
        />

        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--colors-on-surface-variant)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-label-caps)',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Research Writing
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            arrow_forward
          </span>
        </a>

        <div
          style={{
            width: '1px',
            height: '16px',
            backgroundColor: 'var(--colors-outline-variant)',
          }}
        />

        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'var(--colors-on-surface-variant)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-label-caps)',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Formal Vocabulary
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            arrow_forward
          </span>
        </a>
      </div>
    </div>
  );
}

export default Hero;