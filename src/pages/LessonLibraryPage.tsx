import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import LessonCard from '../components/LessonCard'

const lessons = [
  { unit: 'UNIT 01', title: 'Advanced Syntax in Academic Prose', href: '#' },
  { unit: 'UNIT 01', title: 'Etymology and the Evolution of Modern Lexicon', href: '#' },
  { unit: 'UNIT 02', title: 'Nuanced Argumentation: The Art of the Thesis', href: '#' },
  { unit: 'UNIT 02', title: 'Comparative Literature: Analyzing Cross-Cultural Themes', href: '#' },
  { unit: 'UNIT 03', title: 'Scientific Methodology and Report Composition', href: '#' },
]

const LessonLibraryPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto flex-1">
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">
            CURRICULUM
          </p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>
        <div className="flex flex-col space-y-0">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={index}
              unit={lesson.unit}
              title={lesson.title}
              href={lesson.href}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LessonLibraryPage
