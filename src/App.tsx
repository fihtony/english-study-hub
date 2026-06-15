import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/quiz" replace />} />
            <Route path="/quiz" element={<PracticeQuizPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
