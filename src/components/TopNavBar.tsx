export default function TopNavBar() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900 dark:text-blue-100">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Lessons
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Flashcards
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200 cursor-pointer"
            href="#"
          >
            Progress
          </a>
          <a
            className="font-body-ui text-sm font-medium tracking-tight text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 pb-1 cursor-pointer"
            href="#"
          >
            Library
          </a>
        </nav>
        <div className="flex items-center">
          <button className="bg-tertiary-container hover:bg-opacity-90 text-on-tertiary px-5 py-2.5 font-button text-button rounded-lg transition-all active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}