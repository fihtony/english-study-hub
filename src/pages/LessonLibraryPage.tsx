import { useState } from 'react';
import { FilterBar, LessonList } from '../components/LessonCard';
import { lessons } from '../data/lessons';

export default function LessonLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="bg-white border-b border-[#DADCE0]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-[#202124] font-['Work_Sans']">
            Lesson Library
          </h1>
          <p className="text-[#5F6368] mt-1 font-['Newsreader']">
            Browse and discover lessons to enhance your English skills
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
        />
        <LessonList
          lessons={lessons}
          searchQuery={searchQuery}
          difficultyFilter={difficultyFilter}
        />
      </main>
    </div>
  );
}