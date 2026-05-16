import { useState, useMemo } from 'react'
import { LessonCard } from '../components/LessonCard'
import { filterLessons, type DifficultyLevel, type DurationFilter } from '../data/lessons'
import './LessonLibraryPage.css'

export default function LessonLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('All')
  const [duration, setDuration] = useState<DurationFilter>('all')

  const filteredLessons = useMemo(() => {
    return filterLessons(searchTerm, difficulty, duration)
  }, [searchTerm, difficulty, duration])

  return (
    <div className="lesson-library-page">
      <header className="header">
        <nav className="nav">
          <a href="/lessons" className="nav-link active">Lessons</a>
          <a href="/flashcards" className="nav-link">Flashcards</a>
          <a href="/progress" className="nav-link">Progress</a>
          <a href="/library" className="nav-link">Library</a>
          <button className="sign-in-btn">Sign In</button>
        </nav>
      </header>

      <main className="main-content">
        <section className="curriculum-section">
          <h1 className="curriculum-label">CURRICULUM</h1>
          <h2 className="section-title">Lesson Library</h2>

          <div className="filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="filter-select"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Duration:</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as DurationFilter)}
                className="filter-select"
              >
                <option value="all">Any Duration</option>
                <option value="short">Under 30 min</option>
                <option value="medium">30-50 min</option>
                <option value="long">Over 50 min</option>
              </select>
            </div>
          </div>

          <div className="lesson-count">
            {filteredLessons.length} {filteredLessons.length === 1 ? 'lesson' : 'lessons'} found
          </div>

          <div className="lessons-grid">
            {filteredLessons.map(lesson => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="no-results">
              <p>No lessons found matching your criteria.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearchTerm('')
                  setDifficulty('All')
                  setDuration('all')
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p className="copyright">© 2024 Linguist Library. Premium Academic English Study.</p>
        <nav className="footer-nav">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Support</a>
        </nav>
      </footer>
    </div>
  )
}