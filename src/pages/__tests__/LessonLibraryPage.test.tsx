import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LessonLibraryPage from '../../pages/LessonLibraryPage';

vi.mock('../../types/lesson', () => ({
  MOCK_LESSONS: [
    { id: '1', title: 'Test Lesson 1', description: 'Description 1', unit: 'UNIT 01', difficulty: 'beginner', duration: '30 min' },
    { id: '2', title: 'Test Lesson 2', description: 'Description 2', unit: 'UNIT 02', difficulty: 'intermediate', duration: '45 min' },
    { id: '3', title: 'Advanced Test', description: 'Description 3', unit: 'UNIT 03', difficulty: 'advanced', duration: '60 min' },
  ],
}));

const renderPage = () => {
  render(
    <MemoryRouter>
      <LessonLibraryPage />
    </MemoryRouter>
  );
};

describe('LessonLibraryPage', () => {
  describe('Search functionality', () => {
    it('renders search input', () => {
      renderPage();
      const searchInput = screen.getByPlaceholderText('Search lessons...');
      expect(searchInput).toBeInTheDocument();
    });

    it('filters lessons by search query in title', () => {
      renderPage();
      const searchInput = screen.getByPlaceholderText('Search lessons...');
      fireEvent.change(searchInput, { target: { value: 'Test Lesson 1' } });
      expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Lesson 2')).not.toBeInTheDocument();
    });

    it('filters lessons by search query in description', () => {
      renderPage();
      const searchInput = screen.getByPlaceholderText('Search lessons...');
      fireEvent.change(searchInput, { target: { value: 'Description 2' } });
      expect(screen.queryByText('Test Lesson 1')).not.toBeInTheDocument();
      expect(screen.getByText('Test Lesson 2')).toBeInTheDocument();
    });
  });

  describe('Difficulty filter', () => {
    it('renders difficulty select', () => {
      renderPage();
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('filters lessons by difficulty level', () => {
      renderPage();
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'beginner' } });
      expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Lesson 2')).not.toBeInTheDocument();
    });
  });

  describe('Combined filters', () => {
    it('applies both search and difficulty filter', () => {
      renderPage();
      const searchInput = screen.getByPlaceholderText('Search lessons...');
      const select = screen.getByRole('combobox');

      fireEvent.change(searchInput, { target: { value: 'Test' } });
      fireEvent.change(select, { target: { value: 'beginner' } });

      expect(screen.getByText('Test Lesson 1')).toBeInTheDocument();
      expect(screen.queryByText('Advanced Test')).not.toBeInTheDocument();
    });

    it('shows no results message when no matches', () => {
      renderPage();
      const searchInput = screen.getByPlaceholderText('Search lessons...');
      fireEvent.change(searchInput, { target: { value: 'Non-existent lesson' } });
      expect(screen.getByText('No lessons found matching your criteria.')).toBeInTheDocument();
    });
  });
});