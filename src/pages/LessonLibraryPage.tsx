import TopNavBar from '../components/TopNavBar'
import LessonCard from '../components/LessonCard'
import Footer from '../components/Footer'

const lessons = [
  { id: 'lesson-1', unitLabel: 'UNIT 01', title: 'Advanced Syntax in Academic Prose' },
  { id: 'lesson-2', unitLabel: 'UNIT 01', title: 'Etymology and the Evolution of Modern Lexicon' },
  { id: 'lesson-3', unitLabel: 'UNIT 02', title: 'Nuanced Argumentation: The Art of the Thesis' },
  { id: 'lesson-4', unitLabel: 'UNIT 02', title: 'Comparative Literature: Analyzing Cross-Cultural Themes' },
  { id: 'lesson-5', unitLabel: 'UNIT 03', title: 'Scientific Methodology and Report Composition' },
]

export default function LessonLibraryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto min-h-screen flex-1">
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">
            CURRICULUM
          </p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>
        <div className="flex flex-col space-y-0">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
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