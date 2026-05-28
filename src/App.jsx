import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/practice-quiz" replace />} />
        <Route path="/practice-quiz" element={<PracticeQuizPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App