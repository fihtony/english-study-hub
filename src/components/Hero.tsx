function ArrowForwardIcon() {
  return (
    <svg
      className="inline-block w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Hero() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-[1120px] w-full text-center space-y-12">
        {/* Big Headline */}
        <h1 className="text-5xl font-bold text-primary max-w-3xl mx-auto leading-tight tracking-tight">
          Master Academic English with Scholarly Precision.
        </h1>

        {/* Single Primary CTA */}
        <div className="flex justify-center">
          <button className="bg-on-tertiary-container text-on-tertiary font-medium text-base px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>

        {/* 3 Plain Text Category Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span className="text-xs font-semibold uppercase tracking-widest">Advanced Grammar</span>
            <ArrowForwardIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span className="text-xs font-semibold uppercase tracking-widest">Research Writing</span>
            <ArrowForwardIcon />
          </a>
          <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span className="text-xs font-semibold uppercase tracking-widest">Formal Vocabulary</span>
            <ArrowForwardIcon />
          </a>
        </div>
      </div>
    </main>
  )
}
