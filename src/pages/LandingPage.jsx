import { useState } from 'react';

function ArrowForwardIcon() {
  return (
    <svg className="material-symbols-outlined text-sm" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M10 17l5-5-5-5v10z" transform="rotate(90 12 12)" />
    </svg>
  );
}

function Header() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            Lessons
          </a>
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            Flashcards
          </a>
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            Progress
          </a>
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
            Library
          </a>
        </nav>
        <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80">
          Sign In
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="max-w-[1120px] w-full text-center space-y-12">
      {/* Big Headline */}
      <h1 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary max-w-3xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif' }}>
        Master Academic English with Scholarly Precision.
      </h1>

      {/* Single Primary CTA */}
      <div className="flex justify-center">
        <button
          className="bg-[#f57d32] text-white text-[16px] leading-[1] font-medium px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
          onClick={() => setClicked(true)}
        >
          Start Learning Now
        </button>
      </div>

      {/* 3 Plain Text Category Links */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold uppercase" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Advanced Grammar
          </span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold uppercase" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Research Writing
          </span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold uppercase" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            Formal Vocabulary
          </span>
          <ArrowForwardIcon />
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 fixed bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-slate-500" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors font-semibold text-slate-900" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}