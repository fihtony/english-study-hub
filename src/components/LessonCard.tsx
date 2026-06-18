import { Link } from 'react-router-dom'

export interface LessonCardProps {
  unitNumber: string
  unitLabel: string
  title: string
  href?: string
}

export default function LessonCard({ unitNumber, unitLabel, title, href }: LessonCardProps) {
  const shouldUseAnchor = href === undefined || href === '#'

  const linkContent = (
    <>
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">{unitLabel}</span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {title}
        </h2>
      </div>
      <svg
        className="w-6 h-6 text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </>
  )

  if (shouldUseAnchor) {
    return (
      <a
        href={href || '#'}
        className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
      >
        {linkContent}
      </a>
    )
  }

  return (
    <Link
      to={href}
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
    >
      {linkContent}
    </Link>
  )
}
