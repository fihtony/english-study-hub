import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LessonLibraryPage from './pages/LessonLibraryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lessons" replace />} />
        <Route path="/lessons" element={<LessonLibraryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
