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
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body-ui text-sm font-medium tracking-tight ${
                isActive(link.path)
                  ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                  : 'text-slate-600 hover:text-teal-600 transition-colors duration-200'
              } cursor-pointer`}
              aria-label={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <button className="bg-[#DD6B20] text-white px-5 py-2.5 font-button text-button rounded-lg transition-all active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNavBar