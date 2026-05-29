import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="/quiz" element={<PracticeQuizPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App