import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LessonLibraryPage from './pages/LessonLibraryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lessons" element={<LessonLibraryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App