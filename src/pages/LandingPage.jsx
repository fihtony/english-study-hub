import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './LandingPage.css'

function LandingPage() {
  return (
    <>
      <Header />
      <main className="landing-main">
        <div className="landing-hero">
          <h1 className="font-h1 landing-headline">
            Master Academic English with Scholarly Precision.
          </h1>
          <div className="landing-cta">
            <button className="cta-button">
              Start Learning Now
            </button>
          </div>
          <div className="landing-categories">
            <a href="#" className="category-link">
              <span className="font-label-caps">Advanced Grammar</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <span className="category-divider"></span>
            <a href="#" className="category-link">
              <span className="font-label-caps">Research Writing</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <span className="category-divider"></span>
            <a href="#" className="category-link">
              <span className="font-label-caps">Formal Vocabulary</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default LandingPage