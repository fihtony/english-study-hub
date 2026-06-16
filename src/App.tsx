import './index.css'

// Arrow icon component to replace Material Symbols (deterministic rendering)
const ArrowForwardIcon = () => (
  <svg
    className="text-sm"
    width="20"
    height="20"
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

function Header() {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary font-h1">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-gutter">
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Lessons
          </a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Flashcards
          </a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Progress
          </a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Library
          </a>
        </nav>
        <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}

function MainContent() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
      <div className="max-w-container-max w-full text-center space-y-stack-lg">
        {/* Big Headline */}
        <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>
        {/* Single Primary CTA */}
        <div className="flex justify-center pt-stack-sm">
          <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>
        {/* 3 Plain Text Category Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
            <ArrowForwardIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
            <ArrowForwardIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
            <ArrowForwardIcon />
          </a>
        </div>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant bottom-0 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-on-surface-variant">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold text-primary" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App
