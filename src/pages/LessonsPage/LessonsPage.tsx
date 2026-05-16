import { useState } from 'react';
import { LessonCard } from '../../components/LessonCard';
import { filterLessons } from '../../utils/filterLessons';
import { Difficulty } from '../../types/lesson';
import './LessonsPage.css';

export function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');

  const filteredLessons = filterLessons(searchQuery, difficultyFilter);

  return (
    <div className="lessons-page">
      <header className="lessons-header">
        <h1 className="lessons-title">Lesson Library</h1>
        <p className="lessons-subtitle">Browse our collection of English lessons</p>
      </header>

      <div className="lessons-controls">
        <input
          type="text"
          className="lessons-search"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="search-input"
        />

        <select
          className="lessons-filter"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | 'All')}
          data-testid="difficulty-filter"
        >
          <option value="All">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="lessons-grid" data-testid="lessons-grid">
        {filteredLessons.length === 0 ? (
          <p className="lessons-empty" data-testid="no-results">No lessons found</p>
        ) : (
          filteredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              description={lesson.description}
              difficulty={lesson.difficulty}
              duration={lesson.duration}
            />
          ))
        )}
      </div>
    </div>
  );
}