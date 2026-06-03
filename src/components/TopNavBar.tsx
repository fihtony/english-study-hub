import { Link, useLocation } from 'react-router-dom'

function TopNavBar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/lessons', label: 'Lessons' },
    { path: '/flashcards', label: 'Flashcards' },
    { path: '/progress', label: 'Progress' },
    { path: '/library', label: 'Library' },
  ]

  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body-ui text-sm font-medium tracking-tight ${
                isActive(link.path)
                  ? 'text-secondary border-b-2 border-secondary pb-1'
                  : 'text-on-surface-variant hover:text-secondary transition-colors duration-200'
              } cursor-pointer`}
              aria-label={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <button className="bg-tertiary-container text-on-tertiary px-5 py-2.5 font-button text-button rounded-lg transition-all active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar