import { useState, useMemo } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import LessonCard from '../components/LessonCard';
import { MOCK_LESSONS } from '../types/lesson';

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

const LessonLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');

  const filteredLessons = useMemo(() => {
    return MOCK_LESSONS.filter((lesson) => {
      const matchesSearch =
        searchQuery === '' ||
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === 'all' || lesson.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavBar />

      <main className="pt-[120px] pb-[80px] px-4 md:px-6 max-w-[1120px] mx-auto flex-1">
        <div className="mb-12 border-b border-outline-variant pb-6">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-2 tracking-widest">
            CURRICULUM
          </p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-outline-variant rounded-lg font-body-ui text-body-ui bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
            className="px-4 py-2 border border-outline-variant rounded-lg font-body-ui text-body-ui bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex flex-col space-y-0">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <p className="text-on-surface-variant py-8 text-center font-body-ui">
              No lessons found matching your criteria.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LessonLibraryPage;