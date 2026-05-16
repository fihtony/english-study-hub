import { useState, useMemo } from 'react';
import { LessonCard } from '../../components/LessonCard/LessonCard';
import { mockLessons } from '../../data/lessons';
import { Lesson } from '../../types/lesson';

type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export function LessonLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');

  const filteredLessons = useMemo(() => {
    return mockLessons.filter((lesson: Lesson) => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || lesson.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-800">Lesson Library</h1>
          <p className="text-slate-600 mt-2">Browse and search our collection of English lessons</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex gap-2">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as DifficultyFilter[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  difficultyFilter === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No lessons found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default LessonLibraryPage;