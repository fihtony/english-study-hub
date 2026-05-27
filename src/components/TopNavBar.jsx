function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900 font-['Work_Sans']">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors cursor-pointer" href="#">
            Lessons
          </a>
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors cursor-pointer" href="#">
            Flashcards
          </a>
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors cursor-pointer" href="#">
            Progress
          </a>
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors cursor-pointer" href="#">
            Library
          </a>
        </nav>
        <button className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors cursor-pointer">
          Sign In
        </button>
      </div>
    </header>
  )
}

export default TopNavBar