import { Lesson } from '../../types/lesson';

interface LessonCardProps {
  lesson: Lesson;
}

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800',
};

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{lesson.title}</h3>
      <p className="text-slate-600 text-sm mb-4">{lesson.description}</p>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[lesson.difficulty]}`}>
          {lesson.difficulty}
        </span>
        <span className="text-slate-500 text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {lesson.duration}
        </span>
      </div>
    </div>
  );
}

export default LessonCard;