export default function TopNavBar() {
  return (
    <header className="bg-white border-b border-outline-variant top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tight text-primary font-h1">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-gutter">
          <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
            Lessons
          </a>
          <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
            Flashcards
          </a>
          <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
            Progress
          </a>
          <a className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">
            Library
          </a>
        </nav>
        <button className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}
