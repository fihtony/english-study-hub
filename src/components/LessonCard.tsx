interface LessonCardProps {
  unitLabel: string
  title: string
}

function LessonCard({ unitLabel, title }: LessonCardProps) {
  return (
    <a
      href="#"
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-label-caps text-outline mb-1">
          {unitLabel}
        </span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {title}
        </h2>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  )
}

export default LessonCard