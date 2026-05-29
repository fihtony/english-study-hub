function TopNavBar() {
  return (
    <nav className="bg-white border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span className="text-xl font-bold tracking-tighter text-primary font-h1">Linguist Library</span>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer"
            role="link"
            aria-disabled="true"
          >
            Lessons
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            role="link"
            aria-disabled="true"
          >
            Flashcards
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            role="link"
            aria-disabled="true"
          >
            Progress
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
            role="link"
            aria-disabled="true"
          >
            Library
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant transition-colors duration-200 hover:text-secondary cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TopNavBar