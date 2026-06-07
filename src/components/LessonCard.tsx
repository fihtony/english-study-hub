import ArrowForwardIcon from './ArrowForwardIcon'

export interface Lesson {
  id: string
  unit: string
  title: string
}

interface LessonCardProps {
  lesson: Lesson
  onClick?: (lesson: Lesson) => void
}

function LessonCard({ lesson, onClick }: LessonCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(lesson)
    }
  }

  return (
    <a
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg cursor-pointer"
      href={`/lessons/${lesson.id}`}
      onClick={handleClick}
      aria-label={`${lesson.unit}: ${lesson.title}`}
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">
          {lesson.unit}
        </span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {lesson.title}
        </h2>
      </div>
      <ArrowForwardIcon />
    </a>
  )
}

export default LessonCard