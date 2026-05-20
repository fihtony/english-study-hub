import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LessonItem from '../components/LessonItem';
import { lessons } from '../data/lessons';
import { filterLessons } from '../data/filterLessons';

const UNITS = ['All', 'UNIT 01', 'UNIT 02', 'UNIT 03'];

export default function LessonLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('All');

  const filtered = filterLessons(lessons, searchQuery).filter(
    (lesson) => selectedUnit === 'All' || lesson.unit === selectedUnit
  );

  return (
    <>
      <Header />
      <main className="pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto min-h-screen">
        <div className="mb-stack-lg border-b border-outline-variant pb-stack-md">
          <p className="font-label-caps text-label-caps text-on-secondary-container mb-stack-sm tracking-widest">CURRICULUM</p>
          <h1 className="font-h1 text-h1 text-primary">Lesson Library</h1>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface-container text-on-background text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="px-4 py-2 rounded-lg border border-outline-variant bg-surface-container text-on-background text-sm focus:outline-none focus:border-primary cursor-pointer"
          >
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-0">
          {filtered.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
          {filtered.length === 0 && (
            <p className="text-on-background-variant py-8 text-center">No lessons found.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}