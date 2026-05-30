import React from 'react'

// Arrow Forward Icon Component
const ArrowForwardIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25 12.25L11.25 17.25L16.25 12.25"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// TopNavBar Component
const TopNavBar = () => (
  <header className="bg-white border-b border-outline-variant sticky top-0 z-50">
    <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tighter text-primary font-h1">
        Linguist Library
      </div>
      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6">
        <a
          href="#"
          className="font-body-ui text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
        >
          Lessons
        </a>
        <a
          href="#"
          className="font-body-ui text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
        >
          Flashcards
        </a>
        <a
          href="#"
          className="font-body-ui text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
        >
          Progress
        </a>
        <a
          href="#"
          className="font-body-ui text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
        >
          Library
        </a>
      </nav>
      {/* Sign In Button */}
      <button className="font-body-ui text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
        Sign In
      </button>
    </div>
  </header>
)

// CategoryLink Component
const CategoryLink = ({ label }) => (
  <a
    href="#"
    className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
  >
    <span className="font-label-caps text-label-caps uppercase tracking-widest">
      {label}
    </span>
    <ArrowForwardIcon />
  </a>
)

// Footer Component
const Footer = () => (
  <footer className="bg-surface-container-low border-t border-outline-variant">
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full gap-4">
      {/* Copyright */}
      <div className="font-body-ui text-body-ui text-on-surface-variant">
        © {new Date().getFullYear()} Linguist Library. Premium Academic English Study.
      </div>
      {/* Links */}
      <div className="flex gap-6">
        <a
          href="#"
          className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="font-body-ui text-body-ui font-semibold text-on-surface hover:text-primary transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  </footer>
)

// Main LandingPage Component
const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
          {/* Headline */}
          <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
            Master Academic English with Scholarly Precision.
          </h1>
          {/* CTA Button */}
          <div className="flex justify-center pt-stack-sm">
            <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
              Start Learning Now
            </button>
          </div>
          {/* Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
            <CategoryLink label="Advanced Grammar" />
            <div className="hidden md:block w-px h-4 bg-outline-variant" />
            <CategoryLink label="Research Writing" />
            <div className="hidden md:block w-px h-4 bg-outline-variant" />
            <CategoryLink label="Formal Vocabulary" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
