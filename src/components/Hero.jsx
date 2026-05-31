import React from 'react'

export default function Hero() {
  return (
    <main class="flex-1 flex flex-col items-center justify-center px-margin-mobile py-section-padding">
      <div class="max-w-[1120px] w-full text-center space-y-stack-lg">
        {/* Big Headline */}
        <h1 class="font-h1 text-h1 text-primary max-w-3xl mx-auto">
          Master Academic English with Scholarly Precision.
        </h1>

        {/* Single Primary CTA */}
        <div class="flex justify-center pt-stack-sm">
          <button class="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
            Start Learning Now
          </button>
        </div>

        {/* 3 Plain Text Category Links */}
        <div class="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
          <a class="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span class="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 12H19.5M19.5 12L12 4.5M19.5 12L12 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div class="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a class="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span class="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 12H19.5M19.5 12L12 4.5M19.5 12L12 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <div class="hidden md:block w-px h-4 bg-outline-variant"></div>
          <a class="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            <span class="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 12H19.5M19.5 12L12 4.5M19.5 12L12 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </main>
  )
}