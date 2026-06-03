import { useState } from 'react'

interface LessonCardProps {
  lesson: {
    id: string
    unit: string
    title: string
  }
}

function ArrowForwardIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function LessonCard({ lesson }: LessonCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg cursor-pointer"
      href="#"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">{lesson.unit}</span>
        <h2 className={`font-h3 text-h3 ${isHovered ? 'text-secondary' : 'text-on-background'} transition-colors`}>
          {lesson.title}
        </h2>
      </div>
      <span className={`${isHovered ? 'text-secondary' : 'text-outline'} group-hover:translate-x-1 transition-all`}>
        <ArrowForwardIcon />
      </span>
    </a>
  )
}

export default LessonCard