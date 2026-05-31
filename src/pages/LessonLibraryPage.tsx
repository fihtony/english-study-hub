import { LessonCard, Lesson } from '../components/LessonCard'

const lessons: Lesson[] = [
  { id: '1', unit: 'UNIT 01', title: 'Advanced Syntax in Academic Prose' },
  { id: '2', unit: 'UNIT 01', title: 'Etymology and the Evolution of Modern Lexicon' },
  { id: '3', unit: 'UNIT 02', title: 'Nuanced Argumentation: The Art of the Thesis' },
  { id: '4', unit: 'UNIT 02', title: 'Comparative Literature: Analyzing Cross-Cultural Themes' },
  { id: '5', unit: 'UNIT 03', title: 'Scientific Methodology and Report Composition' },
]

export default function LessonLibraryPage() {
  return (
    <div className="flex flex-col space-y-0">
      <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
        <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">
          CURRICULUM
        </p>
        <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
      </div>

      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  )
}
