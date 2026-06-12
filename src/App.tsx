import './index.css'

function ArrowForwardIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-gutter" aria-label="Main navigation">
          <a
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/lessons"
          >
            Lessons
          </a>
          <a
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/flashcards"
          >
            Flashcards
          </a>
          <a
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/progress"
          >
            Progress
          </a>
          <a
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
            href="/library"
          >
            Library
          </a>
        </nav>
        <button
          className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors duration-200"
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
    <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
      <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
        <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>
        <div className="flex justify-center pt-stack-sm">
          <button
            className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            type="button"
          >
            Start Learning Now
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
            href="/lessons/advanced-grammar"
          >
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
            <ArrowForwardIcon className="text-sm" />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant" />
          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
            href="/lessons/research-writing"
          >
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
            <ArrowForwardIcon className="text-sm" />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant" />
          <a
            className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
            href="/lessons/formal-vocabulary"
          >
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
            <ArrowForwardIcon className="text-sm" />
          </a>
        </div>
      </div>
    </main>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-surface border-t border-outline-variant bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="/terms"
          >
            Terms of Service
          </a>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="/privacy"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold"
            href="/contact"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-on-background font-body-ui">
      <TopNavBar />
      <Hero />
      <Footer />
    </div>
  )
}