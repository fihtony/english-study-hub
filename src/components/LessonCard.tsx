interface LessonCardProps {
  unit: string
  title: string
}

export default function LessonCard({ unit, title }: LessonCardProps) {
  return (
    <a
      className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
      href="#"
    >
      <div className="flex flex-col">
        <span className="font-label-caps text-[10px] text-outline mb-1">{unit}</span>
        <h2 className="font-h3 text-h3 text-on-background group-hover:text-secondary transition-colors">
          {title}
        </h2>
      </div>
      <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">
        arrow_forward
      </span>
    </a>
  )
}
