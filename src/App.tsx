import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LessonLibraryPage from './pages/LessonLibraryPage'

export default function App() {
  return (
    <div data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/lessons" replace />} />
          <Route path="/lessons" element={<LessonLibraryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
