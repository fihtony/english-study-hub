import ArrowForwardIcon from './ArrowForwardIcon'

interface LessonCardProps {
  unit: string
  title: string
  timeToRead?: string
  onClick?: () => void
}

const LessonCard = ({ unit, title, timeToRead, onClick }: LessonCardProps) => {
  return (
    <a
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg cursor-pointer"
      onClick={onClick}
      href="#"
      role="button"
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-label-caps text-outline mb-1">
          {unit}
        </span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {title}
        </h2>
      </div>
      {timeToRead && (
        <span className="font-label-caps text-label-caps text-outline self-start mt-1">
          {timeToRead}
        </span>
      )}
      <ArrowForwardIcon />
    </a>
  )
}

export default LessonCard