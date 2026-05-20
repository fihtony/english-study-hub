import React from 'react'

export default function TopNavBar() {
  return (
    <header className="bg-white border-b border-gray-100 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        {/* stitch_node_id: logo-001 */}
        <div className="text-xl font-bold tracking-tighter text-blue-900 font-h1">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center gap-gutter">
          {/* stitch_node_id: nav-lessons-001 */}
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Lessons</a>
          {/* stitch_node_id: nav-flashcards-001 */}
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Flashcards</a>
          {/* stitch_node_id: nav-progress-001 */}
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Progress</a>
          {/* stitch_node_id: nav-library-001 */}
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200" href="#">Library</a>
        </nav>
        {/* stitch_node_id: signin-btn-001 */}
        <button className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-blue-900 transition-colors duration-200">
          Sign In
        </button>
      </div>
    </header>
  )
}