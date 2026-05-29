function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer" href="#">Library</a>
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

export default TopNavBar