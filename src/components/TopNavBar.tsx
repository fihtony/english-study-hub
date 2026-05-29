import { Link, useLocation } from 'react-router-dom'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Lessons', href: '/lessons' },
  { label: 'Flashcards', href: '#' },
  { label: 'Progress', href: '#' },
  { label: 'Library', href: '#' },
]

function TopNavBar() {
  const location = useLocation()

  return (
    <header className="bg-surface border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <Link to="/" className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              link.label === 'Library' && location.pathname === '/lessons'
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-body-ui text-sm font-medium tracking-tight transition-colors duration-200 ${
                  isActive
                    ? 'text-secondary border-b-2 border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {link.label}
              </a>
            )
          })}
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