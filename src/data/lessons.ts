export interface Lesson {
  id: string
  unit: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
}

export const lessons: Lesson[] = [
  { id: '1', unit: 'UNIT 01', title: 'Advanced Syntax in Academic Prose', description: 'Master complex sentence structures in academic writing.', difficulty: 'Advanced', duration: '45 min' },
  { id: '2', unit: 'UNIT 01', title: 'Etymology and the Evolution of Modern Lexicon', description: 'Explore the historical roots of English vocabulary.', difficulty: 'Intermediate', duration: '30 min' },
  { id: '3', unit: 'UNIT 02', title: 'Nuanced Argumentation: The Art of the Thesis', description: 'Craft compelling thesis statements and logical arguments.', difficulty: 'Advanced', duration: '50 min' },
  { id: '4', unit: 'UNIT 02', title: 'Comparative Literature: Analyzing Cross-Cultural Themes', description: 'Analyze themes across different literary traditions.', difficulty: 'Intermediate', duration: '40 min' },
  { id: '5', unit: 'UNIT 03', title: 'Scientific Methodology and Report Composition', description: 'Write clear, structured scientific reports.', difficulty: 'Intermediate', duration: '55 min' },
]

export function filterLessons(lessons: Lesson[], searchTerm: string): Lesson[] {
  if (!searchTerm.trim()) return lessons
  const term = searchTerm.toLowerCase()
  return lessons.filter(
    lesson =>
      lesson.title.toLowerCase().includes(term) ||
      lesson.unit.toLowerCase().includes(term)
  )
}