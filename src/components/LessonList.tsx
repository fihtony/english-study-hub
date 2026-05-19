interface Lesson {
  id: string
  unit: string
  title: string
  difficulty: string
  duration: string
  description: string
}

interface LessonListProps {
  lessons: Lesson[]
}

export default function LessonList({ lessons }: LessonListProps) {
  return (
    <div className="flex flex-col space-y-0">
      {lessons.map((lesson) => (
        <a
          key={lesson.id}
          className="group flex items-center justify-between py-6 border-b border-outline-variant hover:bg-surface-container-low transition-all px-4 -mx-4 rounded-lg"
          href="#"
        >
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-outline mb-1">{lesson.unit}</span>
            <h2
              className="text-[24px] font-semibold text-on-background group-hover:text-secondary transition-colors"
              style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 600, lineHeight: 1.4 }}
            >
              {lesson.title}
            </h2>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">arrow_forward</span>
        </a>
      ))}
    </div>
  )
}