import ArrowForwardIcon from './ArrowForwardIcon'

interface Lesson {
  id: string
  unit: string
  title: string
}

interface LessonCardProps {
  lesson: Lesson
}

function LessonCard({ lesson }: LessonCardProps) {
  return (
    <a
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
      href={`#lesson-${lesson.id}`}
      aria-label={`${lesson.unit}: ${lesson.title}`}
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-label-caps text-outline mb-1">{lesson.unit}</span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {lesson.title}
        </h2>
      </div>
      <ArrowForwardIcon />
    </a>
  )
}

export default LessonCard