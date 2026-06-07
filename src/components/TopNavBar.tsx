import { Link, useLocation } from 'react-router-dom'

const TopNavBar = () => {
  const location = useLocation()

  const navLinks = [
    { id: 'lessons', path: '/lessons', label: 'Lessons', ariaLabel: 'Navigate to Lessons page' },
    { id: 'flashcards', path: '#', label: 'Flashcards', ariaLabel: 'Navigate to Flashcards page' },
    { id: 'progress', path: '#', label: 'Progress', ariaLabel: 'Navigate to Progress page' },
    { id: 'library', path: '#', label: 'Library', ariaLabel: 'Navigate to Library page' },
  ]

  return (
    <header className="bg-surface border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <Link to="/" className="text-xl font-bold tracking-tighter text-primary" aria-label="Linguist Library Home">
          Linguist Library
        </Link>
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              aria-label={link.ariaLabel}
              className={`font-body-ui text-sm font-medium tracking-tight hover:text-secondary transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-secondary border-b-2 border-secondary pb-1'
                  : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <button className="bg-tertiary-container hover:bg-opacity-90 text-on-tertiary px-5 py-2.5 font-button text-button rounded-lg transition-all active:opacity-80" aria-label="Sign In">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar