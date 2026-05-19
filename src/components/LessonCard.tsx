import { Lesson } from '../types/Lesson'

interface LessonCardProps {
  lesson: Lesson
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <a
      className="group flex items-start justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
      href="#"
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">
          {lesson.unit}
        </span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors mb-1">
          {lesson.title}
        </h2>
        <p className="font-body-ui text-body-ui text-on-surface-variant mb-2">
          {lesson.description}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-label-caps text-[10px] text-outline px-2 py-1 bg-surface-container rounded">
            {lesson.difficulty}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-label-caps text-[10px] text-outline mb-1">Time to Read</span>
        <span className="font-label-caps text-[10px] text-secondary">{lesson.duration}</span>
      </div>
      <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">
        arrow_forward
      </span>
    </a>
  )
}