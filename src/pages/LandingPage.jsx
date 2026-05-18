/* stitch_node_id: 114f29c8bf6f4f3c9fd7f0a3b5e8d2c1 */
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* TopNavBar */}
      <header className="top-nav-bar">
        <div className="nav-container">
          {/* stitch_node_id: 115a2b3c4d5e6f7a8b9c0d1e2f3a4b5c */}
          <div className="logo">Linguist Library</div>
          <nav className="nav-links">
            {/* stitch_node_id: 216b3c4d5e6f7a8b9c0d1e2f3a4b5c6d */}
            <a href="#" className="nav-link">Lessons</a>
            {/* stitch_node_id: 317c4d5e6f7a8b9c0d1e2f3a4b5c6d7e */}
            <a href="#" className="nav-link">Flashcards</a>
            {/* stitch_node_id: 418d5e6f7a8b9c0d1e2f3a4b5c6d7e8f */}
            <a href="#" className="nav-link">Progress</a>
            {/* stitch_node_id: 519e6f7a8b9c0d1e2f3a4b5c6d7e8f9a */}
            <a href="#" className="nav-link">Library</a>
          </nav>
          {/* stitch_node_id: 620f7a8b9c0d1e2f3a4b5c6d7e8f9a0b */}
          <button className="sign-in-btn">Sign In</button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="main-canvas">
        <div className="hero-content">
          {/* stitch_node_id: 721a8b9c0d1e2f3a4b5c6d7e8f9a0b1c */}
          <h1 className="hero-headline font-h1">
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA */}
          <div className="cta-container">
            {/* stitch_node_id: 822b9c0d1e2f3a4b5c6d7e8f9a0b1c2d */}
            <button className="primary-cta">
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div className="category-links">
            {/* stitch_node_id: 923c0d1e2f3a4b5c6d7e8f9a0b1c2d3e */}
            <a href="#" className="category-link">
              <span className="category-label">Advanced Grammar</span>
              <span className="material-symbols-outlined arrow-icon">arrow_forward</span>
            </a>
            <div className="divider" />
            {/* stitch_node_id: 024d1e2f3a4b5c6d7e8f9a0b1c2d3e4f */}
            <a href="#" className="category-link">
              <span className="category-label">Research Writing</span>
              <span className="material-symbols-outlined arrow-icon">arrow_forward</span>
            </a>
            <div className="divider" />
            {/* stitch_node_id: 125e2f3a4b5c6d7e8f9a0b1c2d3e4f5a */}
            <a href="#" className="category-link">
              <span className="category-label">Formal Vocabulary</span>
              <span className="material-symbols-outlined arrow-icon">arrow_forward</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* stitch_node_id: 226f3a4b5c6d7e8f9a0b1c2d3e4f5a6b */}
          <div className="copyright">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="footer-links">
            {/* stitch_node_id: 327a4b5c6d7e8f9a0b1c2d3e4f5a6b7c */}
            <a href="#" className="footer-link">Terms of Service</a>
            {/* stitch_node_id: 428b5c6d7e8f9a0b1c2d3e4f5a6b7c8d */}
            <a href="#" className="footer-link">Privacy Policy</a>
            {/* stitch_node_id: 529c6d7e8f9a0b1c2d3e4f5a6b7c8d9e */}
            <a href="#" className="footer-link footer-link-bold">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;