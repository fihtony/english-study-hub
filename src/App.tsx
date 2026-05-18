import { Routes, Route } from 'react-router-dom'
import LessonLibraryPage from './pages/LessonLibraryPage'

function App() {
  return (
    <Routes>
      <Route path="/lessons" element={<LessonLibraryPage />} />
      <Route path="/" element={<LessonLibraryPage />} />
    </Routes>
  )
}

export default App