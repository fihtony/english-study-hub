import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          Linguist Library
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link">Lessons</a>
          <a href="#" className="nav-link">Flashcards</a>
          <a href="#" className="nav-link">Progress</a>
          <a href="#" className="nav-link">Library</a>
        </nav>
        <button className="sign-in-button">
          Sign In
        </button>
      </div>
    </header>
  )
}

export default Header