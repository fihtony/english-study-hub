import { useState, useMemo } from 'react'
import LessonCard from '../components/LessonCard'
import { lessons, Lesson } from '../data/lessons'

export interface FilterOptions {
  search: string
  difficulty: string
}

export function filterLessons(lessons: Lesson[], filters: FilterOptions): Lesson[] {
  return lessons.filter((lesson) => {
    const matchesSearch =
      filters.search === '' ||
      lesson.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      lesson.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesDifficulty =
      filters.difficulty === '' || lesson.difficulty === filters.difficulty
    return matchesSearch && matchesDifficulty
  })
}

function TopNavBar() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900 dark:text-blue-100">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Progress</a>
          <a className="font-['Work_Sans'] text-sm font-medium tracking-tight text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 pb-1 cursor-pointer" href="#">Library</a>
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

function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex items-center space-x-6">
          <a className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" href="#">Terms of Service</a>
          <a className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" href="#">Privacy Policy</a>
          <a className="font-['Work_Sans'] text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

function LessonLibraryPage() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const filteredLessons = useMemo(
    () => filterLessons(lessons, { search, difficulty }),
    [search, difficulty]
  )

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto min-h-screen">
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">CURRICULUM</p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>
        <div className="mb-stack-md">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-outline-variant rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2 border border-outline-variant rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col space-y-0">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
          {filteredLessons.length === 0 && (
            <p className="text-center py-8 text-on-surface-variant">No lessons found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LessonLibraryPage