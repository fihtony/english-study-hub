function Hero() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 min-h-screen">
      <div className="max-w-[1120px] w-full text-center space-y-12">
        <h1 className="font-[family-name:var(--font-h1)] text-[48px] leading-[1.2] tracking-[-0.02em] font-bold text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>
        <div className="flex justify-center pt-2">
          <button className="bg-[#f57d32] text-white font-[family-name:var(--font-button)] text-[16px] leading-[1] font-medium px-12 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#13696a] focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12">
          <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
            <span className="font-[family-name:var(--font-label-caps)] text-[12px] leading-[1] tracking-[0.05em] uppercase">Advanced Grammar</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
          <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
            <span className="font-[family-name:var(--font-label-caps)] text-[12px] leading-[1] tracking-[0.05em] uppercase">Research Writing</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <div className="hidden md:block w-px h-4 bg-[#c4c6cf]"></div>
          <a className="group flex items-center space-x-2 text-[#43474e] hover:text-[#13696a] transition-colors cursor-pointer" href="#">
            <span className="font-[family-name:var(--font-label-caps)] text-[12px] leading-[1] tracking-[0.05em] uppercase">Formal Vocabulary</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </main>
  )
}

export default Hero