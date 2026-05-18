import { useState, useMemo } from 'react'
import { lessons, filterLessons } from '../data/lessons'
import LessonCard from '../components/LessonCard'
import { Difficulty } from '../types/lesson'

function NavBar() {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-primary">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer" href="#">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer" href="#">Library</a>
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
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-slate-500">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex items-center space-x-6">
          <a className="font-body-ui text-xs text-slate-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-body-ui text-xs text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-ui text-xs text-slate-500 hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
      <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">CURRICULUM</p>
      <h1 className="font-h1 text-h1 text-primary mb-stack-md">Lesson Library</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search lessons..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-outline rounded-lg font-body-ui text-body-ui focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        />
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline">search</span>
      </div>
    </div>
  )
}

export function FilterBar({ value, onChange }: { value: Difficulty | 'All'; onChange: (v: Difficulty | 'All') => void }) {
  const options: (Difficulty | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced']
  return (
    <div className="flex gap-2 mb-stack-md flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-lg font-body-ui text-sm transition-colors ${
            value === opt
              ? 'bg-secondary text-white'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function LessonLibraryPage() {
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All')

  const filteredLessons = useMemo(() => {
    return filterLessons(lessons, search, difficulty)
  }, [search, difficulty])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto flex-1 w-full">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar value={difficulty} onChange={setDifficulty} />
        <div className="flex flex-col space-y-0">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} />
          ))}
          {filteredLessons.length === 0 && (
            <div className="py-12 text-center text-on-surface-variant">
              <p className="font-body-ui">No lessons found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}