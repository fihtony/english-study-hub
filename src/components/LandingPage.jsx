export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col">
      {/* TopNavBar - stitch_node_id: nav_header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-blue-900 dark:text-blue-100 font-['Work_Sans']" data-stitch-id="nav_logo">
            Linguist Library
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80"
              href="#"
              data-stitch-id="nav_lessons"
            >
              Lessons
            </a>
            <a
              className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80"
              href="#"
              data-stitch-id="nav_flashcards"
            >
              Flashcards
            </a>
            <a
              className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80"
              href="#"
              data-stitch-id="nav_progress"
            >
              Progress
            </a>
            <a
              className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80"
              href="#"
              data-stitch-id="nav_library"
            >
              Library
            </a>
          </nav>
          <button
            className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 cursor-pointer active:opacity-80"
            data-stitch-id="nav_signin"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Canvas - stitch_node_id: hero_section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-32 md:px-16 md:py-40">
        <div className="max-w-[1120px] w-full text-center space-y-12">
          {/* Big Headline - stitch_node_id: hero_headline */}
          <h1
            className="font-['Work_Sans'] text-5xl md:text-6xl font-bold leading-tight text-blue-900 dark:text-blue-100 max-w-3xl mx-auto"
            data-stitch-id="hero_title"
          >
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA - stitch_node_id: hero_cta */}
          <div className="flex justify-center pt-2" data-stitch-id="cta_container">
            <button
              className="bg-on-tertiary-container text-white font-['Work_Sans'] font-medium text-base px-12 py-4 rounded-2xl shadow-sm hover:shadow-md hover:opacity-90 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              data-stitch-id="cta_button"
            >
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links - stitch_node_id: category_links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8" data-stitch-id="categories_section">
            <a
              className="group flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              href="#"
              data-stitch-id="category_grammar"
            >
              <span className="font-['Work_Sans'] text-xs font-semibold uppercase tracking-widest">Advanced Grammar</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <a
              className="group flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              href="#"
              data-stitch-id="category_writing"
            >
              <span className="font-['Work_Sans'] text-xs font-semibold uppercase tracking-widest">Research Writing</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <a
              className="group flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
              href="#"
              data-stitch-id="category_vocabulary"
            >
              <span className="font-['Work_Sans'] text-xs font-semibold uppercase tracking-widest">Formal Vocabulary</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer - stitch_node_id: footer_section */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800" data-stitch-id="footer">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400" data-stitch-id="footer_copyright">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex space-x-6">
            <a
              className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
              href="#"
              data-stitch-id="footer_terms"
            >
              Terms of Service
            </a>
            <a
              className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
              href="#"
              data-stitch-id="footer_privacy"
            >
              Privacy Policy
            </a>
            <a
              className="font-['Work_Sans'] text-xs text-slate-900 dark:text-slate-100 hover:text-blue-900 dark:hover:text-blue-100 transition-colors font-semibold"
              href="#"
              data-stitch-id="footer_contact"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
