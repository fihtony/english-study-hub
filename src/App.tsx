import './index.css'

// Arrow icon component to replace Material Symbols
const ArrowForwardIcon = () => (
  <svg 
    className="text-sm" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M10 17L15 12L10 7" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

// Navigation component
const NavBar = () => (
  <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
    <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
      <div className="text-xl font-bold tracking-tighter text-blue-900">Linguist Library</div>
      <nav className="hidden md:flex items-center space-x-6">
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">
          Lessons
        </a>
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">
          Flashcards
        </a>
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">
          Progress
        </a>
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer" href="#">
          Library
        </a>
      </nav>
      <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200">
        Sign In
      </button>
    </div>
  </header>
)

// Footer component
const Footer = () => (
  <footer className="bg-slate-50 border-t border-gray-200 w-full">
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
      <div className="text-xs text-slate-500">
        © 2024 Linguist Library. Premium Academic English Study.
      </div>
      <div className="flex space-x-6">
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

// Main landing page content
const LandingPage = () => (
  <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
    <div className="max-w-[1120px] w-full text-center space-y-12">
      {/* Big Headline */}
      <h1 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary max-w-3xl mx-auto" style={{ fontFamily: "'Work Sans', sans-serif" }}>
        Master Academic English with Scholarly Precision.
      </h1>
      
      {/* Single Primary CTA */}
      <div className="flex justify-center pt-2">
        <button className="bg-[#f57d32] text-white font-medium text-base px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2" style={{ fontFamily: "'Work Sans', sans-serif" }}>
          Start Learning Now
        </button>
      </div>
      
      {/* 3 Plain Text Category Links */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
        <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em]" style={{ fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.05em" }}>Advanced Grammar</span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
        <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em]" style={{ fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.05em" }}>Research Writing</span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
        <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
          <span className="text-[12px] font-semibold uppercase tracking-[0.05em]" style={{ fontFamily: "'Work Sans', sans-serif", letterSpacing: "0.05em" }}>Formal Vocabulary</span>
          <ArrowForwardIcon />
        </a>
      </div>
    </div>
  </main>
)

// Main App component with sticky footer layout
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff]" data-testid="app-root">
      <NavBar />
      <div className="flex-grow pt-16">
        <LandingPage />
      </div>
      <Footer />
    </div>
  )
}

export default App
