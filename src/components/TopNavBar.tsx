const navLinks = [
  { label: 'Lessons', href: '#' },
  { label: 'Flashcards', href: '#' },
  { label: 'Progress', href: '#' },
  { label: 'Library', href: '#', isActive: true },
]

function TopNavBar() {
  return (
    <header className="bg-white border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-body-ui text-sm font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
                link.isActive
                  ? 'text-secondary border-b-2 border-secondary pb-1'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center">
          <button className="bg-tertiary-container hover:bg-opacity-90 text-on-tertiary px-5 py-2.5 font-button text-button rounded-lg transition-all active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar