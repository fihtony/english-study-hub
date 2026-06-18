import Header from '../components/Header'
import Footer from '../components/Footer'
import LessonCard from '../components/LessonCard'

const lessons = [
  {
    unitNumber: '01',
    unitLabel: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
  },
  {
    unitNumber: '01',
    unitLabel: 'UNIT 01',
    title: 'Etymology and the Evolution of Modern Lexicon',
  },
  {
    unitNumber: '02',
    unitLabel: 'UNIT 02',
    title: 'Nuanced Argumentation: The Art of the Thesis',
  },
  {
    unitNumber: '02',
    unitLabel: 'UNIT 02',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
  },
  {
    unitNumber: '03',
    unitLabel: 'UNIT 03',
    title: 'Scientific Methodology and Report Composition',
  },
]

export default function LessonLibraryPage() {
  return (
    <div className="app-shell">
      <Header />
      <main className="pt-[120px] pb-[80px] px-4 md:px-6 max-w-[1120px] mx-auto min-h-screen flex-1">
        {/* Header Section */}
        <div className="mb-12 border-b border-outline-variant pb-6">
          <p className="font-label-caps text-[12px] text-on-secondary-container mb-2 tracking-[0.05em]">
            CURRICULUM
          </p>
          <h1 className="font-h1 text-[48px] text-primary leading-[1.2] tracking-[-0.02em] font-bold">
            Lesson Library
          </h1>
        </div>

        {/* Minimalist Lesson List */}
        <div className="flex flex-col">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={index}
              unitNumber={lesson.unitNumber}
              unitLabel={lesson.unitLabel}
              title={lesson.title}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
