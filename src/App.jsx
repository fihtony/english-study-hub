import TopNavBar from './components/TopNavBar'
import Footer from './components/Footer'
import PracticeQuizPage from './pages/PracticeQuizPage'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1">
        <PracticeQuizPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
