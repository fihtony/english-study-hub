import React from 'react'

const ArrowForwardIcon = () => (
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 12H19.5M19.5 12L12 4.5M19.5 12L12 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Header() {
  return (
    <header class="bg-white border-b border-outline-variant top-0 z-50">
      <div class="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div class="text-xl font-bold tracking-tighter text-primary font-h1">
          Linguist Library
        </div>
        <nav class="hidden md:flex items-center gap-gutter">
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Lessons
          </a>
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Flashcards
          </a>
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Progress
          </a>
          <a class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
            Library
          </a>
        </nav>
        <button class="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}

export { ArrowForwardIcon }