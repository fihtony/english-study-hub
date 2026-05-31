const ArrowForwardIcon = () => (
  <svg
    className="text-sm"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18.976 12.002L11.172 20.002L12.586 21.416L22 12.002L12.586 2.586L11.172 4.002L18.976 12.002Z"
      fill="currentColor"
    />
  </svg>
)

function LandingPage() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* TopNavBar */}
      <header className="bg-white border-b border-gray-100 top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-blue-900">
            Linguist Library
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Lessons
            </a>
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Flashcards
            </a>
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Progress
            </a>
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer"
              href="#"
            >
              Library
            </a>
          </nav>
          <button className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-section-padding">
        <div className="max-w-[1120px] w-full text-center space-y-8">
          {/* Big Headline */}
          <h1 className="font-h1 text-primary max-w-3xl mx-auto">
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA */}
          <div className="flex justify-center pt-2">
            <button
              className="bg-on-tertiary-container text-on-tertiary font-button text-button px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <a
              className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
              href="#"
            >
              <span className="font-label-caps uppercase tracking-widest">Advanced Grammar</span>
              <ArrowForwardIcon />
            </a>
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            <a
              className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
              href="#"
            >
              <span className="font-label-caps uppercase tracking-widest">Research Writing</span>
              <ArrowForwardIcon />
            </a>
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            <a
              className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
              href="#"
            >
              <span className="font-label-caps uppercase tracking-widest">Formal Vocabulary</span>
              <ArrowForwardIcon />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="font-body-ui text-xs text-slate-500">
            © {currentYear} Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex space-x-6">
            <a
              className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors font-semibold text-gray-900"
              href="#"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
