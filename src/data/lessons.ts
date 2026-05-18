import { Lesson, Difficulty } from '../types/lesson'

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Advanced Syntax in Academic Prose',
    description: 'Master complex sentence structures and grammatical patterns used in scholarly writing.',
    difficulty: 'Advanced',
    duration: '45 min',
    unit: 'Unit 01',
  },
  {
    id: '2',
    title: 'Etymology and the Evolution of Modern Lexicon',
    description: 'Explore the historical roots of English vocabulary and how words have transformed over centuries.',
    difficulty: 'Intermediate',
    duration: '30 min',
    unit: 'Unit 01',
  },
  {
    id: '3',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    description: 'Develop compelling arguments and thesis statements for academic discourse.',
    difficulty: 'Advanced',
    duration: '60 min',
    unit: 'Unit 02',
  },
  {
    id: '4',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    description: 'Examine literary works from different cultures and identify universal themes and patterns.',
    difficulty: 'Intermediate',
    duration: '40 min',
    unit: 'Unit 02',
  },
  {
    id: '5',
    title: 'Scientific Methodology and Report Composition',
    description: 'Learn to write precise scientific reports following standard academic conventions.',
    difficulty: 'Advanced',
    duration: '50 min',
    unit: 'Unit 03',
  },
  {
    id: '6',
    title: 'Persuasive Writing Techniques',
    description: 'Discover effective strategies for convincing readers through well-structured arguments.',
    difficulty: 'Beginner',
    duration: '25 min',
    unit: 'Unit 03',
  },
  {
    id: '7',
    title: 'Critical Reading and Analysis',
    description: 'Develop skills to evaluate and interpret complex texts with depth and clarity.',
    difficulty: 'Intermediate',
    duration: '35 min',
    unit: 'Unit 04',
  },
  {
    id: '8',
    title: 'Professional Communication Skills',
    description: 'Master the art of clear and effective professional correspondence.',
    difficulty: 'Beginner',
    duration: '20 min',
    unit: 'Unit 04',
  },
]

export function filterLessons(lessons: Lesson[], search: string, difficulty: Difficulty | 'All'): Lesson[] {
  return lessons.filter((lesson) => {
    const matchesSearch = search === '' ||
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.description.toLowerCase().includes(search.toLowerCase())
    const matchesDifficulty = difficulty === 'All' || lesson.difficulty === difficulty
    return matchesSearch && matchesDifficulty
  })
}