import { ArrowIcon } from '../components/ArrowIcon'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 w-full text-center space-y-12">
      <div className="max-w-[1120px] w-full space-y-12">
        {/* Big Headline */}
        <h1 className="text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>

        {/* Single Primary CTA */}
        <div className="flex justify-center pt-2">
          <button
            className="bg-[#f57d32] text-white text-base font-medium px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2"
          >
            Start Learning Now
          </button>
        </div>

        {/* 3 Plain Text Category Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
          <a
            href="#"
            className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.05em]">Advanced Grammar</span>
            <ArrowIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
          <a
            href="#"
            className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.05em]">Research Writing</span>
            <ArrowIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
          <a
            href="#"
            className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.05em]">Formal Vocabulary</span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
