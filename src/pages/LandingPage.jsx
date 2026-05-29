import { ArrowForwardIcon } from '../components/icons/ArrowForwardIcon'

function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        {/* stitch_node_id: nav-logo */}
        <div className="text-xl font-bold tracking-tighter text-blue-900" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {/* stitch_node_id: nav-lessons */}
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Lessons</a>
          {/* stitch_node_id: nav-flashcards */}
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Flashcards</a>
          {/* stitch_node_id: nav-progress */}
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Progress</a>
          {/* stitch_node_id: nav-library */}
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Library</a>
        </nav>
        {/* stitch_node_id: nav-signin */}
        <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Sign In
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        {/* stitch_node_id: footer-copyright */}
        <div className="text-xs text-slate-500" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          {/* stitch_node_id: footer-terms */}
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Terms of Service</a>
          {/* stitch_node_id: footer-privacy */}
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Privacy Policy</a>
          {/* stitch_node_id: footer-contact */}
          <a className="text-xs text-slate-700 font-semibold hover:text-blue-900 transition-colors" href="#" style={{ fontFamily: 'Work Sans, sans-serif' }}>Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

function CategoryLink({ label }) {
  return (
    <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '0.05em' }}>{label}</span>
      <ArrowForwardIcon className="w-4 h-4" />
    </a>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-[1120px] w-full text-center space-y-12">
          {/* stitch_node_id: hero-headline */}
          <h1 className="text-5xl font-bold text-primary max-w-3xl mx-auto" style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '48px', lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: 700 }}>
            Master Academic English with Scholarly Precision.
          </h1>
          {/* Single Primary CTA */}
          <div className="flex justify-center pt-2">
            {/* stitch_node_id: hero-cta */}
            <button className="bg-[#f57d32] text-white px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2" style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '16px', fontWeight: 500 }}>
              Start Learning Now
            </button>
          </div>
          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <CategoryLink label="Advanced Grammar" />
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            <CategoryLink label="Research Writing" />
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            <CategoryLink label="Formal Vocabulary" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}