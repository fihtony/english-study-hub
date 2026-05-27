function LandingPage() {
  return (
    <>
      {/* TopNavBar */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 docked full-width top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-blue-900 dark:text-blue-100 font-['Work_Sans']">
            Linguist Library
          </div>
          <nav className="hidden md:flex items-center space-x-gutter">
            <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
              Lessons
            </a>
            <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
              Flashcards
            </a>
            <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
              Progress
            </a>
            <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
              Library
            </a>
          </nav>
          <button className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80">
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
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800 full-width bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex space-x-6">
            <a className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors font-semibold text-slate-900 dark:text-slate-100" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
