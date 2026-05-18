function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <header style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        borderBottom: '1px solid var(--color-outline-variant)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          maxWidth: 'var(--spacing-container-max)',
          margin: '0 auto',
          width: '100%',
        }}>
          <div style={{
            fontFamily: 'var(--font-h2)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-primary-container)',
          }}>
            {/* stitch_node_id: logo_text */}
            Linguist Library
          </div>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-gutter)',
          }} className="hidden md:flex">
            {/* stitch_node_id: nav_lessons */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>Lessons</a>
            {/* stitch_node_id: nav_flashcards */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>Flashcards</a>
            {/* stitch_node_id: nav_progress */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>Progress</a>
            {/* stitch_node_id: nav_library */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>Library</a>
          </nav>
          {/* stitch_node_id: signin_button */}
          <button style={{
            fontFamily: 'var(--font-button)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-on-surface-variant)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}>
            Sign In
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-margin-mobile) var(--spacing-margin-mobile) var(--spacing-section-padding)',
      }}>
        <div style={{
          maxWidth: 'var(--spacing-container-max)',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-stack-lg)',
        }}>
          {/* Big Headline */}
          {/* stitch_node_id: headline_text */}
          <h1 style={{
            fontFamily: 'var(--font-h1)',
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--color-primary)',
            maxWidth: '768px',
            margin: '0 auto',
          }}>
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'var(--spacing-stack-sm)' }}>
            {/* stitch_node_id: cta_start_learning */}
            <button style={{
              backgroundColor: 'var(--color-on-tertiary-container)',
              color: 'var(--color-on-tertiary)',
              fontFamily: 'var(--font-button)',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: 1,
              padding: '16px 48px',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            md: { flexDirection: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-gutter)',
            paddingTop: 'var(--spacing-stack-lg)',
          }} className="flex-col md:flex-row">
            {/* stitch_node_id: category_advanced_grammar */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>
              <span style={{
                fontFamily: 'var(--font-label-caps)',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>Advanced Grammar</span>
              <span style={{ fontSize: '14px' }}>→</span>
            </a>

            <div style={{
              width: '1px',
              height: '16px',
              backgroundColor: 'var(--color-outline-variant)',
            }} className="hidden md:block" />

            {/* stitch_node_id: category_research_writing */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>
              <span style={{
                fontFamily: 'var(--font-label-caps)',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>Research Writing</span>
              <span style={{ fontSize: '14px' }}>→</span>
            </a>

            <div style={{
              width: '1px',
              height: '16px',
              backgroundColor: 'var(--color-outline-variant)',
            }} className="hidden md:block" />

            {/* stitch_node_id: category_formal_vocabulary */}
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-on-surface-variant)',
              transition: 'color 0.2s',
            }}>
              <span style={{
                fontFamily: 'var(--font-label-caps)',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>Formal Vocabulary</span>
              <span style={{ fontSize: '14px' }}>→</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        width: '100%',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          md: { flexDirection: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '48px 32px',
          maxWidth: 'var(--spacing-container-max)',
          margin: '0 auto',
          gap: '16px',
        }} className="flex-col md:flex-row">
          <div style={{
            fontFamily: 'var(--font-body-ui)',
            fontSize: '12px',
            color: '#64748b',
          }}>
            {/* stitch_node_id: footer_copyright */}
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div style={{
            display: 'flex',
            gap: '24px',
          }}>
            {/* stitch_node_id: footer_terms */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '12px',
              color: '#64748b',
              transition: 'color 0.2s',
            }}>Terms of Service</a>
            {/* stitch_node_id: footer_privacy */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '12px',
              color: '#64748b',
              transition: 'color 0.2s',
            }}>Privacy Policy</a>
            {/* stitch_node_id: footer_contact */}
            <a href="#" style={{
              fontFamily: 'var(--font-body-ui)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#1e293b',
              transition: 'color 0.2s',
            }}>Contact Support</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPage