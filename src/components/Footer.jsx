import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link footer-link-strong">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer