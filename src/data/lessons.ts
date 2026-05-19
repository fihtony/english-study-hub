export interface Lesson {
  id: string
  unit: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
}

export function filterLessons(lessonList: Lesson[], searchTerm: string, difficultyFilter: string): Lesson[] {
  return lessonList.filter(lesson => {
    const matchesSearch = searchTerm === '' ||
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === '' || lesson.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })
}

export const lessons: Lesson[] = [
  {
    id: '1',
    unit: 'UNIT 01',
    title: 'Advanced Syntax in Academic Prose',
    description: 'Master the complexities of academic sentence structure.',
    difficulty: 'Advanced',
    duration: '45 min',
  },
  {
    id: '2',
    unit: 'UNIT 01',
    title: 'Etymology and the Evolution of Modern Lexicon',
    description: 'Explore the roots of English vocabulary.',
    difficulty: 'Intermediate',
    duration: '30 min',
  },
  {
    id: '3',
    unit: 'UNIT 02',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    description: 'Craft compelling academic arguments.',
    difficulty: 'Advanced',
    duration: '60 min',
  },
  {
    id: '4',
    unit: 'UNIT 02',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    description: 'Analyze literature across different cultures.',
    difficulty: 'Intermediate',
    duration: '50 min',
  },
  {
    id: '5',
    unit: 'UNIT 03',
    title: 'Scientific Methodology and Report Composition',
    description: 'Write clear scientific reports.',
    difficulty: 'Beginner',
    duration: '40 min',
  },
]