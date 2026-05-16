import './LessonCard.css';
import { Difficulty } from '../../types/lesson';

interface LessonCardProps {
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
}

const difficultyClassMap: Record<Difficulty, string> = {
  Easy: 'difficulty-easy',
  Medium: 'difficulty-medium',
  Hard: 'difficulty-hard',
};

export function LessonCard({ title, description, difficulty, duration }: LessonCardProps) {
  return (
    <div className="lesson-card" data-testid="lesson-card">
      <h3 className="lesson-card-title">{title}</h3>
      <p className="lesson-card-description">{description}</p>
      <div className="lesson-card-meta">
        <span className={`lesson-card-difficulty ${difficultyClassMap[difficulty]}`}>
          {difficulty}
        </span>
        <span className="lesson-card-duration">{duration}</span>
      </div>
    </div>
  );
}