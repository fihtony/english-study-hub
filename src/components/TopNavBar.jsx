export default function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary font-h1">Linguist Library</div>
        <nav className="hidden md:flex items-center gap-gutter" role="navigation" aria-label="Main navigation">
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" href="/lessons">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" href="/flashcards">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" href="/progress">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" href="/library">Library</a>
        </nav>
        <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" aria-label="Sign In">
          Sign In
        </button>
      </div>
    </header>
  )
}