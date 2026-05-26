import TopNavBar from '../components/TopNavBar'
import LessonCard from '../components/LessonCard'

const lessons = [
  { unit: 'UNIT 01', title: 'Advanced Syntax in Academic Prose' },
  { unit: 'UNIT 01', title: 'Etymology and the Evolution of Modern Lexicon' },
  { unit: 'UNIT 02', title: 'Nuanced Argumentation: The Art of the Thesis' },
  { unit: 'UNIT 02', title: 'Comparative Literature: Analyzing Cross-Cultural Themes' },
  { unit: 'UNIT 03', title: 'Scientific Methodology and Report Composition' },
]

export default function LessonLibraryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1 pt-[120px] pb-[80px] px-[16px] md:px-[24px] max-w-[1120px] mx-auto">
        <div className="mb-[48px] border-b border-outline-variant pb-[24px]">
          <p className="font-[Work Sans] text-[12px] text-[#1a6d6e] mb-[8px] tracking-[0.05em] font-semibold uppercase">
            CURRICULUM
          </p>
          <h1 className="font-[Work Sans] text-[48px] text-[#002045] font-bold" style={{ lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Lesson Library
          </h1>
        </div>
        <div className="flex flex-col">
          {lessons.map((lesson, index) => (
            <LessonCard key={index} unit={lesson.unit} title={lesson.title} />
          ))}
        </div>
      </main>
      <footer className="bg-slate-50 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <div className="font-[Work Sans] text-xs text-slate-500">
            © 2024 Linguist Library. Premium Academic English Study.
          </div>
          <div className="flex items-center space-x-6">
            <a className="font-[Work Sans] text-xs text-slate-500 hover:text-[#002045] transition-colors" href="#">Terms of Service</a>
            <a className="font-[Work Sans] text-xs text-slate-500 hover:text-[#002045] transition-colors" href="#">Privacy Policy</a>
            <a className="font-[Work Sans] text-xs text-slate-500 hover:text-[#002045] transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}