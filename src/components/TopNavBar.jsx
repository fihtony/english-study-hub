export default function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900 font-h1">Linguist Library</div>
        <nav className="hidden md:flex items-center space-x-gutter">
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Library</a>
        </nav>
        <button className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200 cursor-pointer active:opacity-80">
          Sign In
        </button>
      </div>
    </header>
  )
}