function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tight text-blue-900 font-h1">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-gutter" role="navigation" aria-label="Main navigation">
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#lessons">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#flashcards">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#progress">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#library">Library</a>
        </nav>
        <button className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" type="button">
          Sign In
        </button>
      </div>
    </header>
  )
}

export default TopNavBar
