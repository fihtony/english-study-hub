import { useLocation } from 'react-router-dom'

interface NavLink {
  label: string
  path: string
  isActive?: boolean
}

const TopNavBar = () => {
  const location = useLocation()

  const navLinks: NavLink[] = [
    { label: 'Lessons', path: '/lessons' },
    { label: 'Flashcards', path: '#' },
    { label: 'Progress', path: '#' },
    { label: 'Library', path: '#' },
  ]

  return (
    <header className="bg-white border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.path}
              aria-label={link.label}
              className={`font-body-ui text-sm font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
                location.pathname === link.path
                  ? 'text-secondary border-b-2 border-secondary pb-1'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              {link.label}
            </a>
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