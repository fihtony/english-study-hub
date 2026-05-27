function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900">Linguist Library</div>
        <nav className="hidden md:flex items-center gap-gutter">
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Lessons</a>
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Flashcards</a>
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Progress</a>
          <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Library</a>
        </nav>
        <button className="text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200">
          Sign In
        </button>
      </div>
    </header>
  )
}

export default TopNavBar