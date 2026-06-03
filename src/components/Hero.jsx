function ArrowForwardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

export default function Hero() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-padding">
      <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
        <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>
        <div className="flex justify-center pt-stack-sm">
          <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
            <ArrowForwardIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
            <ArrowForwardIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors" href="#">
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
            <ArrowForwardIcon />
          </a>
        </div>
      </div>
    </main>
  )
}