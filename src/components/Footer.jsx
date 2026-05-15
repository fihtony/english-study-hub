import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-heading" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-footer-about">
              About
            </h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#mission">Our Mission</a></li>
              <li><a href="#team">Team</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-footer-product">
              Product
            </h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#download">Download</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-footer-legal">
              Legal
            </h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
              <li><a href="#cookies">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright" data-stitch-id="45ac4478a1b7455f861d7377f92105e6-footer-copyright">
            © 2024 Linguist Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
