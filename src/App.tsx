import './index.css'

const ArrowForwardIcon = () => (
  <svg
    className="inline-block align-middle"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M10 17L15 12L10 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tight text-primary font-h1">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Lessons
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Flashcards
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Progress
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Library
          </a>
        </nav>
        <button
          className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer"
          type="button"
        >
          Sign In
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-16 py-20">
      <div className="max-w-[1120px] w-full text-center space-y-12">
        <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>

        <div className="flex justify-center pt-2">
          <button
            className="bg-on-tertiary-container text-on-tertiary font-button text-button px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            type="button"
          >
            Start Learning Now
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            <span className="font-label-caps text-label-caps uppercase tracking-widest">
              Advanced Grammar
            </span>
            <ArrowForwardIcon />
          </a>

          <div className="hidden md:block w-px h-4 bg-outline-variant" />

          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            <span className="font-label-caps text-label-caps uppercase tracking-widest">
              Research Writing
            </span>
            <ArrowForwardIcon />
          </a>

          <div className="hidden md:block w-px h-4 bg-outline-variant" />

          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            href="#"
          >
            <span className="font-label-caps text-label-caps uppercase tracking-widest">
              Formal Vocabulary
            </span>
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
    <footer className="bg-surface-container border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full gap-4">
        <div className="font-body-ui text-body-ui text-on-surface-variant">
          &copy; {year} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex gap-6">
          <a
            className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-ui text-body-ui font-semibold text-on-surface hover:text-primary transition-colors"
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
    <div className="flex flex-col min-h-screen min-h-[100dvh]">
      <TopNavBar />
      <Hero />
      <Footer />
    </div>
  )
}

export default App
