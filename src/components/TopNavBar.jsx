export default function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary font-h1">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-[24px]">
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">
            Lessons
          </a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">
            Flashcards
          </a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">
            Progress
          </a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">
            Library
          </a>
        </nav>
        <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}