import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../../components/SearchBar'

describe('SearchBar', () => {
  it('renders search input', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        difficultyFilter="All"
        onDifficultyChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText('Search lessons...')).toBeInTheDocument()
  })

  it('renders difficulty select', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        difficultyFilter="All"
        onDifficultyChange={() => {}}
      />
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('calls onChange when search input changes', () => {
    const handleChange = vi.fn()
    render(
      <SearchBar
        value=""
        onChange={handleChange}
        difficultyFilter="All"
        onDifficultyChange={() => {}}
      />
    )
    const input = screen.getByPlaceholderText('Search lessons...')
    fireEvent.change(input, { target: { value: 'syntax' } })
    expect(handleChange).toHaveBeenCalledWith('syntax')
  })

  it('calls onDifficultyChange when select changes', () => {
    const handleChange = vi.fn()
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        difficultyFilter="All"
        onDifficultyChange={handleChange}
      />
    )
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Advanced' } })
    expect(handleChange).toHaveBeenCalledWith('Advanced')
  })

  it('displays current search value', () => {
    render(
      <SearchBar
        value="academic"
        onChange={() => {}}
        difficultyFilter="All"
        onDifficultyChange={() => {}}
      />
    )
    expect(screen.getByDisplayValue('academic')).toBeInTheDocument()
  })

  it('displays current difficulty filter', () => {
    render(
      <SearchBar
        value=""
        onChange={() => {}}
        difficultyFilter="Intermediate"
        onDifficultyChange={() => {}}
      />
    )
    expect(screen.getByRole('combobox')).toHaveValue('Intermediate')
  })
})

describe('Lesson filtering logic', () => {
  it('filters lessons by search query', () => {
    const lessons = [
      { id: '1', title: 'Advanced Syntax', description: 'Complex sentences', unit: 'UNIT 01', difficulty: 'Advanced', duration: '45 min' },
      { id: '2', title: 'Basic Grammar', description: 'Simple sentences', unit: 'UNIT 01', difficulty: 'Beginner', duration: '30 min' },
    ]
    const query = 'syntax'
    const filtered = lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.description.toLowerCase().includes(query.toLowerCase())
    )
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Advanced Syntax')
  })

  it('filters lessons by difficulty', () => {
    const lessons = [
      { id: '1', title: 'Advanced Syntax', description: 'Complex', unit: 'UNIT 01', difficulty: 'Advanced', duration: '45 min' },
      { id: '2', title: 'Basic Grammar', description: 'Simple', unit: 'UNIT 01', difficulty: 'Beginner', duration: '30 min' },
    ]
    const difficulty = 'Beginner'
    const filtered = lessons.filter((l) => l.difficulty === difficulty)
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Basic Grammar')
  })

  it('combines search and difficulty filters', () => {
    const lessons = [
      { id: '1', title: 'Advanced Syntax', description: 'Complex', unit: 'UNIT 01', difficulty: 'Advanced', duration: '45 min' },
      { id: '2', title: 'Basic Syntax', description: 'Simple', unit: 'UNIT 01', difficulty: 'Beginner', duration: '30 min' },
    ]
    const query = 'syntax'
    const difficulty = 'Advanced'
    const filtered = lessons.filter(
      (l) =>
        (l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.description.toLowerCase().includes(query.toLowerCase())) &&
        l.difficulty === difficulty
    )
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe('Advanced Syntax')
  })
})