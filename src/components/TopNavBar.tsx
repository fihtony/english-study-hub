export default function TopNavBar() {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 docked full-width top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span className="text-xl font-bold tracking-tighter text-blue-900 dark:text-blue-100 font-h1">
          Linguist Library
        </span>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="font-['Work_Sans'] text-sm font-medium tracking-tight text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 pb-1 cursor-pointer active:opacity-80"
            href="#"
          >
            Lessons
          </a>
          <a
            className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer active:opacity-80"
            href="#"
          >
            Flashcards
          </a>
          <a
            className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer active:opacity-80"
            href="#"
          >
            Progress
          </a>
          <a
            className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-200 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer active:opacity-80"
            href="#"
          >
            Library
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 transition-colors duration-200 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}
