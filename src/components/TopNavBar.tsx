import React from 'react';

export function TopNavBar() {
  return (
    <nav className="bg-white border-b border-outline-variant top-0 z-50" data-testid="top-nav-bar">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span className="text-xl font-bold tracking-tight text-primary font-h1">Linguist Library</span>
        <div className="hidden md:flex items-center gap-8">
          <span className="font-['Work_Sans'] text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer" role="link" aria-current="page">Lessons</span>
          <span className="font-['Work_Sans'] text-sm font-medium tracking-tight text-on-surface-variant cursor-pointer transition-colors duration-200 hover:text-primary">Flashcards</span>
          <span className="font-['Work_Sans'] text-sm font-medium tracking-tight text-on-surface-variant cursor-pointer transition-colors duration-200 hover:text-primary">Progress</span>
          <span className="font-['Work_Sans'] text-sm font-medium tracking-tight text-on-surface-variant cursor-pointer transition-colors duration-200 hover:text-primary">Library</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-['Work_Sans'] text-sm font-medium tracking-tight text-on-surface-variant transition-colors duration-200 hover:text-primary cursor-pointer">Sign In</button>
        </div>
      </div>
    </nav>
  );
}
