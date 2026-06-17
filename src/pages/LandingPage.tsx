import React from 'react';

// Arrow icon component to replace Material Symbols Outlined
const ArrowForwardIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg 
    className={className}
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5 12H19M19 12L12 5M19 12L12 19" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tighter text-primary font-h1">
            Linguist Library
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-gutter">
            <a 
              className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              Lessons
            </a>
            <a 
              className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              Flashcards
            </a>
            <a 
              className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              Progress
            </a>
            <a 
              className="text-sm font-medium text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              Library
            </a>
          </nav>
          
          {/* Sign In Button */}
          <button className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
          {/* Big Headline */}
          <h1 className="text-h1 text-primary max-w-3xl mx-auto">
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Primary CTA Button */}
          <div className="flex justify-center pt-stack-sm">
            <button className="bg-on-tertiary-container text-on-tertiary font-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
            <a 
              className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              <span className="text-label-caps uppercase tracking-widest">Advanced Grammar</span>
              <ArrowForwardIcon className="text-sm" />
            </a>
            
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            
            <a 
              className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              <span className="text-label-caps uppercase tracking-widest">Research Writing</span>
              <ArrowForwardIcon className="text-sm" />
            </a>
            
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            
            <a 
              className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" 
              href="#"
            >
              <span className="text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
              <ArrowForwardIcon className="text-sm" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="text-xs text-on-surface-variant">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex space-x-6">
            <a 
              className="text-xs text-on-surface-variant hover:text-primary transition-colors" 
              href="#"
            >
              Terms of Service
            </a>
            <a 
              className="text-xs text-on-surface-variant hover:text-primary transition-colors" 
              href="#"
            >
              Privacy Policy
            </a>
            <a 
              className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold text-on-surface" 
              href="#"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
