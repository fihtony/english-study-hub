import ArrowForwardIcon from '../components/Icons'

const Header = () => (
  <header className="bg-white border-b border-gray-100 top-0 z-50">
    <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
      <div className="text-xl font-bold tracking-tighter text-blue-900">Linguist Library</div>
      <nav className="hidden md:flex items-center gap-6">
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">
          Lessons
        </a>
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">
          Flashcards
        </a>
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">
          Progress
        </a>
        <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">
          Library
        </a>
      </nav>
      <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200">
        Sign In
      </button>
    </div>
  </header>
)

const Footer = () => (
  <footer className="bg-slate-50 border-t border-gray-200 bottom-0 w-full">
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full gap-4">
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
        <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors font-semibold text-slate-900" href="#">
          Contact Support
        </a>
      </div>
    </div>
  </footer>
)

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9ff] text-[#111c2c]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-[1120px] w-full text-center space-y-12">
          {/* Big Headline */}
          <h1 className="text-5xl font-bold leading-tight tracking-[-0.02em] text-[#002045] max-w-3xl mx-auto">
            Master Academic English with Scholarly Precision.
          </h1>
          {/* Single Primary CTA */}
          <div className="flex justify-center pt-2">
            <button className="bg-[#f57d32] text-white font-medium text-base px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2">
              Start Learning Now
            </button>
          </div>
          {/* 3 Plain Text Category Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors" href="#">
              <span className="text-xs font-semibold uppercase tracking-[0.05em]">Advanced Grammar</span>
              <ArrowForwardIcon />
            </a>
            <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
            <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors" href="#">
              <span className="text-xs font-semibold uppercase tracking-[0.05em]">Research Writing</span>
              <ArrowForwardIcon />
            </a>
            <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
            <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors" href="#">
              <span className="text-xs font-semibold uppercase tracking-[0.05em]">Formal Vocabulary</span>
              <ArrowForwardIcon />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
