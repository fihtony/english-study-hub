export default function TopNavBar() {
  return (
    <nav class="bg-white border-b border-gray-100 docked full-width top-0 z-50">
      <div class="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span class="text-xl font-bold tracking-tighter text-blue-900 font-h1">Linguist Library</span>
        <div class="hidden md:flex items-center gap-8">
          <a class="font-body-ui text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer active:opacity-80" href="#">Lessons</a>
          <a class="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Flashcards</a>
          <a class="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Progress</a>
          <a class="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Library</a>
        </div>
        <div class="flex items-center gap-4">
          <button class="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80">Sign In</button>
        </div>
      </div>
    </nav>
  )
}