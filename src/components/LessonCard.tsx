import { Difficulty } from '../types/lesson'

interface LessonCardProps {
  title: string
  description: string
  difficulty: Difficulty
  duration: string
  unit: string
}

const difficultyColors: Record<Difficulty, string> = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800',
}

export function LessonCard({ title, description, difficulty, duration, unit }: LessonCardProps) {
  return (
    <div className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg cursor-pointer">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-label-caps text-[10px] text-outline tracking-widest">{unit}</span>
          <span className={`text-[10px] font-label-caps px-2 py-0.5 rounded ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <h3 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors mb-1">
          {title}
        </h3>
        <p className="font-body-ui text-sm text-on-surface-variant">{description}</p>
        <span className="font-label-caps text-[10px] text-outline mt-2">{duration}</span>
      </div>
      <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">
        arrow_forward
      </span>
    </div>
  )
}

export default LessonCard