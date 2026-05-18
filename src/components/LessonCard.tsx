import { useMemo } from 'react';
import type { Lesson } from '../data/lessons';

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg border border-[#DADCE0] p-6 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-[#202124] mb-2 font-['Work_Sans']">
        {lesson.title}
      </h3>
      <p className="text-[#5F6368] text-sm mb-4 font-['Newsreader']">
        {lesson.description}
      </p>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
          {lesson.difficulty}
        </span>
        <span className="text-[#5F6368] text-sm">
          {lesson.duration}
        </span>
      </div>
    </div>
  );
}

export function filterLessons(
  lessons: Lesson[],
  searchQuery: string,
  difficultyFilter: string
): Lesson[] {
  return lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === '' || lesson.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (difficulty: string) => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border border-[#DADCE0] rounded-lg text-[#202124] placeholder-[#5F6368] focus:outline-none focus:border-[#1A73E8] font-['Work_Sans']"
        />
      </div>
      <div className="sm:w-48">
        <select
          value={difficultyFilter}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="w-full px-4 py-3 border border-[#DADCE0] rounded-lg text-[#202124] bg-white focus:outline-none focus:border-[#1A73E8] font-['Work_Sans']"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}

interface LessonListProps {
  lessons: Lesson[];
  searchQuery: string;
  difficultyFilter: string;
}

export function LessonList({ lessons, searchQuery, difficultyFilter }: LessonListProps) {
  const filteredLessons = useMemo(
    () => filterLessons(lessons, searchQuery, difficultyFilter),
    [lessons, searchQuery, difficultyFilter]
  );

  if (filteredLessons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#5F6368] text-lg">No lessons found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}