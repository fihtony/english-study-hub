export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Lesson {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  duration: string
  unit: string
}

export interface LessonFilter {
  search: string
  difficulty: Difficulty | 'All'
}