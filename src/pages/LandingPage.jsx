import React from 'react';
import Header from '../components/Landing/Header.jsx';
import Hero from '../components/Landing/Hero.jsx';
import Footer from '../components/Landing/Footer.jsx';

function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 'var(--spacing-margin-mobile)',
          paddingRight: 'var(--spacing-margin-mobile)',
          paddingTop: 'var(--spacing-section-padding)',
          paddingBottom: 'var(--spacing-section-padding)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--spacing-container-max)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Hero />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;