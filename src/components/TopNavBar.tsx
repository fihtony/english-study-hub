import { Link, useLocation } from 'react-router-dom'

const TopNavBar = () => {
  const location = useLocation()
  const isLessonsActive = location.pathname === '/lessons' || location.pathname === '/quiz'

  return (
    <nav className="bg-white border-b border-outline-variant docked full-width top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <Link to="/" className="text-xl font-bold tracking-tighter text-primary font-h1">
          Linguist Library
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/lessons"
            className={`font-body-ui text-sm font-medium tracking-tight transition-colors duration-200 pb-1 cursor-pointer ${
              isLessonsActive
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            Lessons
          </Link>
          <button
            type="button"
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
          >
            Flashcards
          </button>
          <button
            type="button"
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
          >
            Progress
          </button>
          <button
            type="button"
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
          >
            Library
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TopNavBar