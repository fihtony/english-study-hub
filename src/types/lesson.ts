export interface Lesson {
  id: string;
  title: string;
  description: string;
  unit: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
}

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Advanced Syntax in Academic Prose',
    description: 'Master complex sentence structures used in academic writing.',
    unit: 'UNIT 01',
    difficulty: 'advanced',
    duration: '45 min'
  },
  {
    id: '2',
    title: 'Etymology and the Evolution of Modern Lexicon',
    description: 'Explore the historical roots of English vocabulary.',
    unit: 'UNIT 01',
    difficulty: 'intermediate',
    duration: '30 min'
  },
  {
    id: '3',
    title: 'Nuanced Argumentation: The Art of the Thesis',
    description: 'Learn to construct compelling academic arguments.',
    unit: 'UNIT 02',
    difficulty: 'advanced',
    duration: '50 min'
  },
  {
    id: '4',
    title: 'Comparative Literature: Analyzing Cross-Cultural Themes',
    description: 'Analyze literature across different cultures and traditions.',
    unit: 'UNIT 02',
    difficulty: 'intermediate',
    duration: '40 min'
  },
  {
    id: '5',
    title: 'Scientific Methodology and Report Composition',
    description: 'Write clear and rigorous scientific reports.',
    unit: 'UNIT 03',
    difficulty: 'beginner',
    duration: '35 min'
  }
];