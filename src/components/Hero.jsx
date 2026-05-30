const ArrowForwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

export default function Hero() {
  return (
    <>
      <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
        Master Academic English with Scholarly Precision.
      </h1>
      <div className="flex justify-center pt-[8px]">
        <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-[48px] py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2">
          Start Learning Now
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-[24px] pt-[48px]">
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
          <ArrowForwardIcon />
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
          <ArrowForwardIcon />
        </a>
      </div>
    </>
  )
}