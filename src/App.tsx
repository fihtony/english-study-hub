import './index.css'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* TopNavBar */}
      <header className="bg-white border-b full-width top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-blue-900">Linguist Library</div>
          <nav className="hidden md:flex items-center space-x-gutter">
            <a className="text-sm font-medium text-on-surface-variant hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
            <a className="text-sm font-medium text-on-surface-variant hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
            <a className="text-sm font-medium text-on-surface-variant hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">Progress</a>
            <a className="text-sm font-medium text-on-surface-variant hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">Library</a>
          </nav>
          <button className="text-sm font-medium text-on-surface-variant hover:text-blue-900 transition-colors duration-200 cursor-pointer">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
        <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
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
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
              <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
            <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
              <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t full-width bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="text-xs text-slate-500">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex space-x-6">
            <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
            <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors font-semibold text-slate-900" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App