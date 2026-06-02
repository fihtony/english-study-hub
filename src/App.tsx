import { ArrowForwardIcon } from './components/ArrowForwardIcon';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      {/* TopNavBar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1120px] mx-auto w-full px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-primary">Linguist Library</div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Lessons</a>
            <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Flashcards</a>
            <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Progress</a>
            <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Library</a>
          </nav>
          <button className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-[1120px] w-full text-center space-y-12">
          {/* Big Headline */}
          <h1 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary max-w-3xl mx-auto">
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA */}
          <div className="flex justify-center pt-2">
            <button className="bg-[#f57d32] text-white text-base font-medium px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2">
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
            <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
              <span className="text-xs font-semibold uppercase tracking-[0.1em]">Advanced Grammar</span>
              <ArrowForwardIcon className="text-sm" />
            </a>
            <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
            <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
              <span className="text-xs font-semibold uppercase tracking-[0.1em]">Research Writing</span>
              <ArrowForwardIcon className="text-sm" />
            </a>
            <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
            <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
              <span className="text-xs font-semibold uppercase tracking-[0.1em]">Formal Vocabulary</span>
              <ArrowForwardIcon className="text-sm" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200">
        <div className="max-w-[1120px] mx-auto w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex gap-6">
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;