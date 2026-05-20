import { Lesson } from '../types/lesson';

interface LessonItemProps {
  lesson: Lesson;
}

export default function LessonItem({ lesson }: LessonItemProps) {
  return (
    <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-label-caps text-[10px] text-outline">{lesson.unit}</span>
          {lesson.difficultyLevel && (
            <span className="px-2 py-0.5 text-[10px] font-label-caps bg-surface-container rounded-full text-outline">{lesson.difficultyLevel}</span>
          )}
          {lesson.duration && (
            <span className="text-[10px] text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">schedule</span>
              {lesson.duration}
            </span>
          )}
        </div>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors truncate">{lesson.title}</h2>
        {lesson.description && (
          <p className="text-sm text-outline mt-1 truncate">{lesson.description}</p>
        )}
      </div>
      <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4">arrow_forward</span>
    </a>
  );
}