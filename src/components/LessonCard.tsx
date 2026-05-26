interface LessonCardProps {
  unit: string
  title: string
}

export default function LessonCard({ unit, title }: LessonCardProps) {
  return (
    <a className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg" href="#">
      <div className="flex flex-col">
        <span className="font-[Work Sans] text-[10px] text-[#74777f] mb-1 tracking-[0.05em] font-semibold uppercase">
          {unit}
        </span>
        <h2 className="font-[Work Sans] text-[24px] text-[#111c2c] group-hover:text-[#13696a] transition-colors font-semibold" style={{ lineHeight: 1.4 }}>
          {title}
        </h2>
      </div>
      <span className="material-symbols-outlined text-[#74777f] group-hover:text-[#13696a] group-hover:translate-x-1 transition-all">arrow_forward</span>
    </a>
  )
}