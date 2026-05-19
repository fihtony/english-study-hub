
interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  difficultyFilter: string
  onDifficultyChange: (value: string) => void
}

export default function SearchBar({
  value,
  onChange,
  difficultyFilter,
  onDifficultyChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search lessons..."
          className="w-full px-4 py-3 border border-outline rounded-lg bg-surface-container-lowest text-on-background placeholder:text-on-surface-variant focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 font-body-ui"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
          search
        </span>
      </div>
      <select
        value={difficultyFilter}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="px-4 py-3 border border-outline rounded-lg bg-surface-container-lowest text-on-background focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 font-body-ui cursor-pointer"
      >
        <option value="All">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  )
}