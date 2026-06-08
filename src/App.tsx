import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LessonLibraryPage from './pages/LessonLibraryPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lessons" replace />} />
      <Route path="/lessons" element={<LessonLibraryPage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App