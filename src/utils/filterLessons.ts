import { LESSONS_DATA } from '../data/lessons';
import { Difficulty, Lesson } from '../types/lesson';

export function filterLessons(
  searchQuery: string,
  difficultyFilter: Difficulty | 'All'
): Lesson[] {
  return LESSONS_DATA.filter((lesson) => {
    const matchesSearch =
      searchQuery === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty =
      difficultyFilter === 'All' || lesson.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });
}