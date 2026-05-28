import { Link } from 'react-router-dom'

export default function TopNavBar() {
  return (
    <nav className="bg-white border-b border-gray-100 docked full-width top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span className="text-xl font-bold tracking-tighter text-blue-900 font-h1">Linguist Library</span>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="font-body-ui text-sm font-medium tracking-tight text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer active:opacity-80"
            to="/lessons"
          >
            Lessons
          </Link>
          <Link
            className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 hover:text-teal-600 cursor-pointer active:opacity-80"
            to="/flashcards"
          >
            Flashcards
          </Link>
          <Link
            className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 hover:text-teal-600 cursor-pointer active:opacity-80"
            to="/progress"
          >
            Progress
          </Link>
          <Link
            className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 hover:text-teal-600 cursor-pointer active:opacity-80"
            to="/library"
          >
            Library
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-body-ui text-sm font-medium tracking-tight text-slate-600 transition-colors duration-200 hover:text-teal-600 cursor-pointer active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}