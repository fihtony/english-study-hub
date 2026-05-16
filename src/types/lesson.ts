export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
}