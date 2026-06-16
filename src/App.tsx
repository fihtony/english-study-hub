import './index.css'

// Inline SVG arrow icon to match Material Symbols Outlined style
const ArrowForwardIcon = () => (
  <svg 
    className="material-symbols-outlined text-sm" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z" 
      fill="currentColor"
    />
  </svg>
)

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* TopNavBar */}
      <header className="bg-white border-b border-gray-100 docked top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-blue-900">Linguist Library</div>
          <nav className="hidden md:flex items-center gap-[24px]">
            <a 
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" 
              href="#"
            >
              Lessons
            </a>
            <a 
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" 
              href="#"
            >
              Flashcards
            </a>
            <a 
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" 
              href="#"
            >
              Progress
            </a>
            <a 
              className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" 
              href="#"
            >
              Library
            </a>
          </nav>
          <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-[16px] py-[80px]">
        <div className="max-w-[1120px] w-full text-center space-y-[48px]">
          {/* Big Headline */}
          <h1 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary max-w-3xl mx-auto">
            Master Academic English with Scholarly Precision.
          </h1>

          {/* Single Primary CTA */}
          <div className="flex justify-center pt-[8px]">
            <button className="bg-[#f57d32] text-white text-[16px] font-medium leading-[1] px-[48px] py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2">
              Start Learning Now
            </button>
          </div>

          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-[24px] pt-[48px]">
            <a className="group flex items-center gap-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
              <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold uppercase">Advanced Grammar</span>
              <ArrowForwardIcon />
            </a>
            <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
            <a className="group flex items-center gap-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
              <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold uppercase">Research Writing</span>
              <ArrowForwardIcon />
            </a>
            <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
            <a className="group flex items-center gap-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
              <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold uppercase">Formal Vocabulary</span>
              <ArrowForwardIcon />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full gap-4 md:gap-0">
          <div className="text-xs text-slate-500">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex gap-6">
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
