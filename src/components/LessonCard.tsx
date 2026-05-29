import ArrowForwardIcon from './ArrowForwardIcon'

interface LessonCardProps {
  unit: string
  title: string
  lessonId?: string
}

function LessonCard({ unit, title, lessonId }: LessonCardProps) {
  const href = lessonId ? `/lessons/${lessonId}` : '#'

  return (
    <a
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all rounded-lg"
      href={href}
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-label-caps text-outline mb-1">{unit}</span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {title}
        </h2>
      </div>
      <span className="text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">
        <ArrowForwardIcon />
      </span>
    </a>
  )
}

export default LessonCard