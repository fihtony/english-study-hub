import { Link } from 'react-router-dom'

// Arrow icon component using inline SVG to ensure reliable rendering
const ArrowForwardIcon = () => (
  <svg
    className="w-4 h-4"
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
)

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-100 top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-primary">
            Linguist Library
          </div>
          <nav className="hidden md:flex items-center gap-gutter">
            <Link
              to="#"
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Lessons
            </Link>
            <Link
              to="#"
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Flashcards
            </Link>
            <Link
              to="#"
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Progress
            </Link>
            <Link
              to="#"
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-primary transition-colors duration-200"
            >
              Library
            </Link>
          </nav>
          <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-primary transition-colors duration-200">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <div className="max-w-container-max w-full text-center space-y-stack-lg">
          {/* Big Headline */}
          <h1 className="text-h1 text-primary max-w-3xl mx-auto font-h1">
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA */}
          <div className="flex justify-center pt-stack-sm">
            <button
              className="bg-on-tertiary-container text-on-tertiary text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 font-button"
            >
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
            <Link
              to="#"
              className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="text-label-caps uppercase tracking-widest">Advanced Grammar</span>
              <ArrowForwardIcon />
            </Link>
            <div className="hidden md:block w-px h-4 bg-outline-variant" />
            <Link
              to="#"
              className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="text-label-caps uppercase tracking-widest">Research Writing</span>
              <ArrowForwardIcon />
            </Link>
            <div className="hidden md:block w-px h-4 bg-outline-variant" />
            <Link
              to="#"
              className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
              <ArrowForwardIcon />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full gap-4 md:gap-0">
          <div className="text-xs text-slate-500">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex space-x-6">
            <Link
              to="#"
              className="text-xs text-slate-500 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-xs text-slate-500 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-xs text-slate-900 font-semibold hover:text-primary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
