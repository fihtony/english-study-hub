import { Link } from 'react-router-dom'

function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/lessons"
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200"
          >
            Lessons
          </Link>
          <Link
            to="/flashcards"
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200"
          >
            Flashcards
          </Link>
          <Link
            to="/progress"
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200"
          >
            Progress
          </Link>
          <Link
            to="/library"
            className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200"
          >
            Library
          </Link>
        </nav>
        <button
          type="button"
          className="text-sm font-medium tracking-tight text-on-surface-variant hover:text-primary transition-colors duration-200"
        >
          Sign In
        </button>
      </div>
    </header>
  )
}

export default TopNavBar
