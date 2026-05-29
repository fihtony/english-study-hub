import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Lessons', href: '/lessons' },
  { label: 'Flashcards', href: '/flashcards' },
  { label: 'Progress', href: '/progress' },
  { label: 'Library', href: '/library' },
]

function TopNavBar() {
  const location = useLocation()

  return (
    <header className="bg-white border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <Link to="/" className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`font-body-ui text-sm font-medium tracking-tight transition-colors duration-200 ${
                location.pathname === link.href
                  ? 'text-secondary border-b-2 border-secondary pb-1'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <button className="bg-tertiary-container hover:opacity-90 text-on-tertiary px-5 py-2.5 font-button text-button rounded-lg transition-all active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar