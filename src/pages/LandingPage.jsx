import ArrowForwardIcon from '../components/ArrowForwardIcon'

const navLinks = [
  { label: 'Lessons', href: '#' },
  { label: 'Flashcards', href: '#' },
  { label: 'Progress', href: '#' },
  { label: 'Library', href: '#' },
]

const categories = [
  { label: 'Advanced Grammar', href: '#' },
  { label: 'Research Writing', href: '#' },
  { label: 'Formal Vocabulary', href: '#' },
]

function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200">
          Sign In
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-[1120px] w-full text-center space-y-12">
        <h1 className="text-5xl font-bold text-primary max-w-3xl mx-auto leading-tight tracking-tight">
          Master Academic English with Scholarly Precision.
        </h1>
        <div className="flex justify-center pt-2">
          <button className="bg-on-tertiary-container text-on-tertiary text-base font-medium px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
          {categories.map((cat, index) => (
            <div key={cat.label} className="flex items-center gap-2">
              <a
                href={cat.href}
                className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-widest">
                  {cat.label}
                </span>
                <ArrowForwardIcon />
              </a>
              {index < categories.length - 1 && (
                <div className="hidden md:block w-px h-4 bg-outline-variant" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full gap-4">
        <div className="text-xs text-slate-500">
          © {year} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex gap-6">
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-slate-900 font-semibold hover:text-blue-900 transition-colors" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <Hero />
      <Footer />
    </div>
  )
}

export default LandingPage
