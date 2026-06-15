export default function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">Linguist Library</div>
        <nav className="hidden md:flex items-center gap-gutter" role="navigation" aria-label="Main navigation">
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200" href="/lessons">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200" href="/flashcards">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200" href="/progress">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200" href="/library">Library</a>
        </nav>
        <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200">
          Sign In
        </button>
      </div>
    </header>
  )
}