const ArrowForwardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const TopNavBar = () => (
  <header className="bg-white border-b border-gray-100 top-0 z-50">
    <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
      <div className="text-xl font-bold tracking-tight text-primary">Linguist Library</div>
      <nav className="hidden md:flex items-center gap-6">
        <a
          className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-blue-900 transition-colors duration-200"
          href="#"
        >
          Lessons
        </a>
        <a
          className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-blue-900 transition-colors duration-200"
          href="#"
        >
          Flashcards
        </a>
        <a
          className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-blue-900 transition-colors duration-200"
          href="#"
        >
          Progress
        </a>
        <a
          className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-blue-900 transition-colors duration-200"
          href="#"
        >
          Library
        </a>
      </nav>
      <button className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-blue-900 transition-colors duration-200">
        Sign In
      </button>
    </div>
  </header>
)

const Hero = () => (
  <div className="flex flex-col items-center justify-center px-4 py-20 w-full text-center">
    <div className="max-w-[1120px] w-full space-y-12">
      <h1 className="text-5xl font-bold text-primary max-w-3xl mx-auto leading-tight tracking-tight">
        Master Academic English with Scholarly Precision.
      </h1>
      <div className="flex justify-center pt-2">
        <button className="bg-on-tertiary-container text-white font-medium text-base px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
          Start Learning Now
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
        <a className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
          <span className="text-xs font-semibold uppercase tracking-widest">Advanced Grammar</span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant" />
        <a className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
          <span className="text-xs font-semibold uppercase tracking-widest">Research Writing</span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant" />
        <a className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
          <span className="text-xs font-semibold uppercase tracking-widest">Formal Vocabulary</span>
          <ArrowForwardIcon />
        </a>
      </div>
    </div>
  </div>
)

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 bottom-0 w-full">
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full gap-4">
      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} Linguist Library. Premium Academic English Study.
      </div>
      <div className="flex gap-6">
        <a className="text-xs text-gray-500 hover:text-blue-900 transition-colors" href="#">
          Terms of Service
        </a>
        <a className="text-xs text-gray-500 hover:text-blue-900 transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="text-xs font-semibold text-gray-900 hover:text-blue-900 transition-colors" href="#">
          Contact Support
        </a>
      </div>
    </div>
  </footer>
)

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <TopNavBar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
