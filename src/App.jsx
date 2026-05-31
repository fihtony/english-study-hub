import './index.css'

function ArrowForwardIcon() {
  return (
    <svg
      className="inline-block w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6H6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V14M14 10L20 4M20 4L14 10M20 4H10M10 14H8C7.46957 14 6.96086 14.2107 6.58579 14.5858C6.21071 14.9609 6 15.4696 6 16V18C6 18.5304 6.21071 19.0391 6.58579 19.4142C6.96086 19.7893 7.46957 20 8 20H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            Lessons
          </a>
          <a
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            Flashcards
          </a>
          <a
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            Progress
          </a>
          <a
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            Library
          </a>
        </nav>
        <button type="button" className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-[1120px] w-full text-center space-y-12">
        <h1 className="text-5xl font-bold text-primary max-w-3xl mx-auto leading-tight tracking-tight">
          Master Academic English with Scholarly Precision.
        </h1>

        <div className="flex justify-center">
          <button type="button" className="bg-on-tertiary-container text-on-tertiary text-base font-medium px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Advanced Grammar</span>
            <ArrowForwardIcon />
          </a>

          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>

          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Research Writing</span>
            <ArrowForwardIcon />
          </a>

          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>

          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Formal Vocabulary</span>
            <ArrowForwardIcon />
          </a>
        </div>
      </div>
    </main>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-low border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-on-surface-variant">
          © {year} Linguist Library. Premium Academic English Study.
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
            className="text-xs font-semibold text-on-surface hover:text-primary transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <HeroSection />
      <Footer />
    </div>
  )
}

export default App
