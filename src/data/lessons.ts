export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to English Vocabulary',
    description: 'Build your foundational vocabulary with essential everyday words and phrases for beginners.',
    difficulty: 'Beginner',
    duration: '30 min',
  },
  {
    id: '2',
    title: 'Reading Comprehension Strategies',
    description: 'Master techniques for understanding and analyzing written texts across various genres.',
    difficulty: 'Intermediate',
    duration: '45 min',
  },
  {
    id: '3',
    title: 'Advanced Grammar Structures',
    description: 'Deep dive into complex grammar patterns including conditional sentences and subjunctive mood.',
    difficulty: 'Advanced',
    duration: '60 min',
  },
  {
    id: '4',
    title: 'Business English Essentials',
    description: 'Learn professional vocabulary and communication skills for the workplace.',
    difficulty: 'Intermediate',
    duration: '40 min',
  },
  {
    id: '5',
    title: 'English Pronunciation Mastery',
    description: 'Improve your accent and pronunciation with focused exercises on vowel and consonant sounds.',
    difficulty: 'Beginner',
    duration: '35 min',
  },
  {
    id: '6',
    title: 'Academic Writing Skills',
    description: 'Develop skills for writing essays, research papers, and academic reports with proper citations.',
    difficulty: 'Advanced',
    duration: '55 min',
  },
];