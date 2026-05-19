export interface Lesson {
  id: string
  unit: string
  title: string
}

export const lessons: Lesson[] = [
  { id: '1', unit: 'UNIT 01', title: 'Advanced Syntax in Academic Prose' },
  { id: '2', unit: 'UNIT 01', title: 'Etymology and the Evolution of Modern Lexicon' },
  { id: '3', unit: 'UNIT 02', title: 'Nuanced Argumentation: The Art of the Thesis' },
  { id: '4', unit: 'UNIT 02', title: 'Comparative Literature: Analyzing Cross-Cultural Themes' },
  { id: '5', unit: 'UNIT 03', title: 'Scientific Methodology and Report Composition' },
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