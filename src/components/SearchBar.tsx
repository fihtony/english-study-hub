import { useState } from 'react'

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
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search lessons..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
      />
      <select
        value={difficultyFilter}
        onChange={(e) => onDifficultyChange(e.target.value)}
        className="px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:border-primary min-w-[180px]"
      >
        <option value="All">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  )
}