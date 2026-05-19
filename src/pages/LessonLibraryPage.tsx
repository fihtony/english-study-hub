import Header from '../components/Header'
import Footer from '../components/Footer'
import LessonList from '../components/LessonList'

const lessons = [
  {
    id: '1',
    unit: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
    difficulty: 'Advanced',
    duration: '45 min',
    description: 'Master complex sentence structures for academic writing.',
  },
  {
    id: '2',
    unit: 'UNIT 01',
    title: 'Etymology and the Evolution of Modern Lexicon',
    difficulty: 'Intermediate',
    duration: '30 min',
    description: 'Explore the historical roots of English vocabulary.',
  },
  {
    id: '3',
    unit: 'UNIT 02',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    difficulty: 'Advanced',
    duration: '50 min',
    description: 'Build compelling arguments in academic discourse.',
  },
  {
    id: '4',
    unit: 'UNIT 02',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    difficulty: 'Intermediate',
    duration: '40 min',
    description: 'Analyze literature across different cultural contexts.',
  },
  {
    id: '5',
    unit: 'UNIT 03',
    title: 'Scientific Methodology and Report Composition',
    difficulty: 'Advanced',
    duration: '55 min',
    description: 'Write precise scientific reports and research papers.',
  },
]

export default function LessonLibraryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[120px] pb-[80px] px-[16px] md:px-[24px] max-w-[1120px] mx-auto">
        <div className="mb-[48px] border-b border-outline-variant pb-[24px]">
          <p className="font-label-caps text-[12px] text-on-secondary-container mb-[8px] tracking-[0.05em]">CURRICULUM</p>
          <h1 className="font-h1 text-[48px] text-primary" style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Lesson Library</h1>
        </div>
        <LessonList lessons={lessons} />
      </main>
      <Footer />
    </div>
  )
}