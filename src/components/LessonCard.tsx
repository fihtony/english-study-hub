import { Link } from 'react-router-dom'
import ArrowForwardIcon from './ArrowForwardIcon'

export interface LessonCardProps {
  unit: string
  title: string
  href?: string
}

const LessonCard = ({ unit, title, href = '#' }: LessonCardProps) => {
  return (
    <Link
      to={href}
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">{unit}</span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {title}
        </h2>
      </div>
      <ArrowForwardIcon />
    </Link>
  )
}

export default LessonCard