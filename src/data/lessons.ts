export interface Lesson {
  id: string
  title: string
  description: string
  unit: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
}

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Advanced Syntax in Academic Prose',
    description: 'Master complex sentence structures for academic writing.',
    unit: '01',
    difficulty: 'Advanced',
    duration: '45 min'
  },
  {
    id: '2',
    title: 'Etymology and the Evolution of Modern Lexicon',
    description: 'Explore the roots of English words and their historical development.',
    unit: '01',
    difficulty: 'Intermediate',
    duration: '30 min'
  },
  {
    id: '3',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    description: 'Develop compelling arguments and thesis statements.',
    unit: '02',
    difficulty: 'Advanced',
    duration: '60 min'
  },
  {
    id: '4',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    description: 'Analyze themes across different literary traditions.',
    unit: '02',
    difficulty: 'Intermediate',
    duration: '50 min'
  },
  {
    id: '5',
    title: 'Scientific Methodology and Report Composition',
    description: 'Learn to write clear scientific reports and methodology sections.',
    unit: '03',
    difficulty: 'Advanced',
    duration: '55 min'
  }
]