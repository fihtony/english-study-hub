import { useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import LessonCard from '../components/LessonCard'
import SearchBar from '../components/SearchBar'
import { Lesson } from '../types/Lesson'

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Advanced Syntax in Academic Prose',
    description: 'Master complex sentence structures for academic writing excellence.',
    unit: 'UNIT 01',
    difficulty: 'Advanced',
    duration: '45 min',
  },
  {
    id: '2',
    title: 'Etymology and the Evolution of Modern Lexicon',
    description: 'Explore word origins and their impact on contemporary language.',
    unit: 'UNIT 01',
    difficulty: 'Intermediate',
    duration: '40 min',
  },
  {
    id: '3',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    description: 'Develop compelling thesis statements and logical arguments.',
    unit: 'UNIT 02',
    difficulty: 'Advanced',
    duration: '50 min',
  },
  {
    id: '4',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    description: 'Examine literary themes across different cultural contexts.',
    unit: 'UNIT 02',
    difficulty: 'Intermediate',
    duration: '55 min',
  },
  {
    id: '5',
    title: 'Scientific Methodology and Report Composition',
    description: 'Learn to write clear scientific reports and research papers.',
    unit: 'UNIT 03',
    difficulty: 'Advanced',
    duration: '60 min',
  },
]

export default function LessonLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All')

  const filteredLessons = mockLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty =
      difficultyFilter === 'All' || lesson.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1 pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto w-full">
        {/* Header Section */}
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">
            CURRICULUM
          </p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>

        {/* Search and Filter */}
        <div className="mb-stack-md">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            difficultyFilter={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
          />
        </div>

        {/* Lesson List */}
        <div className="flex flex-col space-y-0">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
          {filteredLessons.length === 0 && (
            <p className="text-on-surface-variant py-8 text-center">
              No lessons found matching your criteria.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}