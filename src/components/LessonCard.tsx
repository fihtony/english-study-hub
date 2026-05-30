import { ArrowForwardIcon } from './ArrowForwardIcon'

export interface LessonItem {
  unit: string
  title: string
}

interface LessonCardProps {
  lesson: LessonItem
  onClick?: (lesson: LessonItem) => void
}

export function LessonCard({ lesson, onClick }: LessonCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(lesson)}
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all w-full text-left px-4 -mx-4 rounded-lg"
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-label-caps text-outline mb-1">
          {lesson.unit}
        </span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {lesson.title}
        </h2>
      </div>
      <ArrowForwardIcon className="text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all" />
    </button>
  )
}