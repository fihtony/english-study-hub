import { Routes, Route, Navigate } from 'react-router-dom'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/practice-quiz" replace />} />
        <Route path="/practice-quiz" element={<PracticeQuizPage />} />
      </Routes>
    </div>
  )
}

export default App