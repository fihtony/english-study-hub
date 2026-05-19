export default function LessonLibraryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* TopNavBar */}
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-primary">
            Linguist Library
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
            <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
            <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Progress</a>
            <a className="text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer" href="#">Library</a>
          </nav>
          <div className="flex items-center">
            <button className="bg-tertiary-container hover:bg-opacity-90 text-on-tertiary px-5 py-2.5 text-button rounded-lg transition-all active:opacity-80">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto flex-1">
        {/* Header Section */}
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">CURRICULUM</p>
          <h1 className="text-h1 text-primary">Lesson Library</h1>
        </div>

        {/* Minimalist Lesson List */}
        <div className="flex flex-col space-y-0">
          {/* Lesson Item 1 */}
          <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline mb-1">UNIT 01</span>
              <h2 className="text-h3 text-on-background group-hover:text-secondary transition-colors">Advanced Syntax in Academic Prose</h2>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
          </a>

          {/* Lesson Item 2 */}
          <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline mb-1">UNIT 01</span>
              <h2 className="text-h3 text-on-background group-hover:text-secondary transition-colors">Etymology and the Evolution of Modern Lexicon</h2>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
          </a>

          {/* Lesson Item 3 */}
          <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline mb-1">UNIT 02</span>
              <h2 className="text-h3 text-on-background group-hover:text-secondary transition-colors">Nuanced Argumentation: The Art of the Thesis</h2>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
          </a>

          {/* Lesson Item 4 */}
          <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline mb-1">UNIT 02</span>
              <h2 className="text-h3 text-on-background group-hover:text-secondary transition-colors">Comparative Literature: Analyzing Cross-Cultural Themes</h2>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
          </a>

          {/* Lesson Item 5 */}
          <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline mb-1">UNIT 03</span>
              <h2 className="text-h3 text-on-background group-hover:text-secondary transition-colors">Scientific Methodology and Report Composition</h2>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="text-xs text-slate-500">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex items-center space-x-6">
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}