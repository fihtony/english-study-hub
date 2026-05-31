function ArrowForwardIcon() {
  return (
    <svg class="text-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function TopNavBar() {
  return (
    <header class="bg-white border-b border-gray-100">
      <div class="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div class="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav class="hidden md:flex items-center space-x-6">
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">Lessons</a>
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">Flashcards</a>
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">Progress</a>
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">Library</a>
        </nav>
        <button class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <main class="flex-grow flex flex-col items-center justify-center px-4 py-20">
      <div class="max-w-[1120px] w-full text-center space-y-12">
        <h1 class="text-5xl font-bold text-primary max-w-3xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          Master Academic English with Scholarly Precision.
        </h1>
        <div class="flex justify-center pt-2">
          <button class="bg-on-tertiary-container text-on-tertiary font-medium px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2" style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '16px', lineHeight: 1 }}>
            Start Learning Now
          </button>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
          <a class="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span class="text-xs font-semibold uppercase tracking-widest">Advanced Grammar</span>
            <ArrowForwardIcon />
          </a>
          <div class="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a class="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span class="text-xs font-semibold uppercase tracking-widest">Research Writing</span>
            <ArrowForwardIcon />
          </a>
          <div class="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a class="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span class="text-xs font-semibold uppercase tracking-widest">Formal Vocabulary</span>
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
    <footer class="bg-surface border-t border-gray-200">
      <div class="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div class="text-xs text-on-surface-variant" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          © {year} Linguist Library. Premium Academic English Study.
        </div>
        <div class="flex space-x-6">
          <a class="text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a class="text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a class="text-xs font-semibold text-on-surface hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div class="flex flex-col min-h-screen bg-background text-on-background" style={{ fontFamily: 'Work Sans, sans-serif' }}>
      <TopNavBar />
      <Hero />
      <Footer />
    </div>
  )
}
