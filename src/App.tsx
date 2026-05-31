import { Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { TopNavBar } from './components/TopNavBar'
import { Footer } from './components/Footer'
import LessonLibraryPage from './pages/LessonLibraryPage'

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-1 pt-[120px] pb-section-padding px-margin-mobile md:px-gutter max-w-[1120px] mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/lessons" replace />} />
            <Route path="/lessons" element={<LessonLibraryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
