import { lessons } from '../data/lessons'
import type { Lesson } from '../data/lessons'

interface HeaderProps {
  activeTab: string
}

function Header({ activeTab }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <div className="text-xl font-bold tracking-tighter text-blue-900">
          Linguist Library
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors duration-200 cursor-pointer" href="#">Progress</a>
          <a className={`font-body-ui text-sm font-medium tracking-tight pb-1 cursor-pointer ${activeTab === 'Library' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-slate-600 hover:text-teal-600'}`} href="#">Library</a>
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

interface LessonItemProps {
  lesson: Lesson
}

function LessonItem({ lesson }: LessonItemProps) {
  return (
    <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">{lesson.unit}</span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">{lesson.title}</h2>
      </div>
      <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
    </a>
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
          <a className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
          <a className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

export default function LessonLibraryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header activeTab="Library" />

      <main className="pt-[120px] pb-[80px] px-4 md:px-6 max-w-[1120px] mx-auto flex-1">
        <div className="mb-8 border-b border-outline-variant pb-6">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-2 tracking-widest">CURRICULUM</p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>

        <div className="flex flex-col space-y-0">
          {lessons.map(lesson => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}