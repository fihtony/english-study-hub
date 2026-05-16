export interface Lesson {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  unit: string
}

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Basic Greetings',
    description: 'Learn common English greetings and introductions for everyday situations.',
    difficulty: 'Beginner',
    duration: '30 min',
    unit: 'UNIT 01'
  },
  {
    id: '2',
    title: 'Numbers and Counting',
    description: 'Master numbers from 1 to 1000 and basic counting patterns.',
    difficulty: 'Beginner',
    duration: '25 min',
    unit: 'UNIT 01'
  },
  {
    id: '3',
    title: 'At the Restaurant',
    description: 'Practice ordering food, making reservations, and restaurant vocabulary.',
    difficulty: 'Intermediate',
    duration: '45 min',
    unit: 'UNIT 02'
  },
  {
    id: '4',
    title: 'Travel and Directions',
    description: 'Navigate cities, ask for directions, and plan your journey.',
    difficulty: 'Intermediate',
    duration: '40 min',
    unit: 'UNIT 02'
  },
  {
    id: '5',
    title: 'Business English',
    description: 'Professional vocabulary for meetings, emails, and presentations.',
    difficulty: 'Advanced',
    duration: '60 min',
    unit: 'UNIT 03'
  }
]

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All'
export type DurationFilter = 'short' | 'medium' | 'long' | 'all'

export function filterLessons(
  searchTerm: string,
  difficulty: DifficultyLevel,
  duration: DurationFilter
): Lesson[] {
  return lessons.filter(lesson => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDifficulty =
      difficulty === 'All' || lesson.difficulty === difficulty

    let matchesDuration = true
    if (duration === 'short') matchesDuration = lesson.duration.includes('25') || lesson.duration.includes('30')
    else if (duration === 'medium') matchesDuration = lesson.duration.includes('40') || lesson.duration.includes('45')
    else if (duration === 'long') matchesDuration = lesson.duration.includes('60')

    return matchesSearch && matchesDifficulty && matchesDuration
  })
}