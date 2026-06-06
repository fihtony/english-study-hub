import { Link } from 'react-router-dom'

function ArrowForwardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function Hero() {
  return (
    <div className="max-w-[1120px] w-full text-center space-y-stack-lg">
      {/* Big Headline */}
      <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
        Master Academic English with Scholarly Precision.
      </h1>

      {/* Single Primary CTA */}
      <div className="flex justify-center pt-stack-sm">
        <button
          type="button"
          className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          Start Learning Now
        </button>
      </div>

      {/* 3 Plain Text Category Links */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-stack-lg">
        <Link
          to="/lessons?category=grammar"
          className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
        >
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
          <ArrowForwardIcon />
        </Link>
        <div className="hidden md:block w-px h-4 bg-outline-variant" />
        <Link
          to="/lessons?category=writing"
          className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
        >
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
          <ArrowForwardIcon />
        </Link>
        <div className="hidden md:block w-px h-4 bg-outline-variant" />
        <Link
          to="/lessons?category=vocabulary"
          className="group flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors"
        >
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
          <ArrowForwardIcon />
        </Link>
      </div>
    </div>
  )
}

export default Hero
