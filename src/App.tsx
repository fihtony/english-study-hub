import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TopNavBar from './components/TopNavBar'
import Footer from './components/Footer'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background">
        <TopNavBar />
        <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-gutter py-section-padding">
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