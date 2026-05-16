import type { Lesson } from '../data/lessons'
import './LessonCard.css'

interface LessonCardProps {
  lesson: Lesson
}

const difficultyColors: Record<string, string> = {
  Beginner: '#22c55e',
  Intermediate: '#f59e0b',
  Advanced: '#ef4444'
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="lesson-card">
      <div className="lesson-card-header">
        <span className="unit-badge">{lesson.unit}</span>
        <span
          className="difficulty-badge"
          style={{ backgroundColor: difficultyColors[lesson.difficulty] }}
        >
          {lesson.difficulty}
        </span>
      </div>

      <h3 className="lesson-title">{lesson.title}</h3>
      <p className="lesson-description">{lesson.description}</p>

      <div className="lesson-card-footer">
        <span className="duration">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {lesson.duration}
        </span>
        <button className="start-btn">Start</button>
      </div>
    </div>
  )
}