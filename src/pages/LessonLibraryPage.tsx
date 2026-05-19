import { useState } from 'react'
import { lessons, filterLessons, Lesson } from '../data/lessons'

const units = ['UNIT 01', 'UNIT 02', 'UNIT 03']
const difficulties = ['Beginner', 'Intermediate', 'Advanced']

export default function LessonLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [selectedUnit, setSelectedUnit] = useState<string>('')

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = filterLessons([lesson], searchTerm).length > 0
    const matchesDifficulty = !selectedDifficulty || lesson.difficulty === selectedDifficulty
    const matchesUnit = !selectedUnit || lesson.unit === selectedUnit
    return matchesSearch && matchesDifficulty && matchesUnit
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* TopNavBar */}
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <div className="text-xl font-bold tracking-tighter text-primary">
            Linguist Library
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
            <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
            <a className="text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Progress</a>
            <a className="text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer" href="#">Library</a>
          </nav>
          <div className="flex items-center">
            <button className="bg-tertiary-container hover:bg-opacity-90 text-on-tertiary px-5 py-2.5 text-button rounded-lg transition-all active:opacity-80">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto flex-1">
        {/* Header Section */}
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">CURRICULUM</p>
          <h1 className="text-h1 text-primary">Lesson Library</h1>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-stack-lg space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-outline-variant rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-outline-variant rounded-lg bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Unit Chips */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedUnit('')}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedUnit === ''
                    ? 'bg-secondary text-on-secondary border-secondary'
                    : 'bg-surface-container-low text-on-surface border-outline-variant hover:border-secondary'
                }`}
              >
                All Units
              </button>
              {units.map(unit => (
                <button
                  key={unit}
                  onClick={() => setSelectedUnit(unit === selectedUnit ? '' : unit)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    selectedUnit === unit
                      ? 'bg-secondary text-on-secondary border-secondary'
                      : 'bg-surface-container-low text-on-surface border-outline-variant hover:border-secondary'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="flex flex-col space-y-0">
          {filteredLessons.length === 0 ? (
            <p className="text-on-surface-variant py-8 text-center">No lessons match your criteria.</p>
          ) : (
            filteredLessons.map((lesson: Lesson) => (
              <a
                key={lesson.id}
                className="group flex items-start justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
                href="#"
              >
                <div className="flex flex-col flex-1">
                  <span className="text-[10px] text-outline mb-1">{lesson.unit}</span>
                  <h2 className="text-h3 text-on-background group-hover:text-secondary transition-colors">{lesson.title}</h2>
                  <p className="text-sm text-on-surface-variant mt-1">{lesson.description}</p>
                  <div className="flex gap-3 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      lesson.difficulty === 'Advanced' ? 'bg-error-container text-on-error-container' :
                      lesson.difficulty === 'Intermediate' ? 'bg-tertiary-container text-on-tertiary-container' :
                      'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      {lesson.duration}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all ml-4">arrow_forward</span>
              </a>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="text-xs text-slate-500">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex items-center space-x-6">
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs text-slate-500 hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}