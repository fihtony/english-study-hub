import { Routes, Route } from 'react-router-dom'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <Routes>
      <Route path="/quiz" element={<PracticeQuizPage />} />
    </Routes>
  )
}

export default App