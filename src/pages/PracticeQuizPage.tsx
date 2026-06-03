import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import QuizCanvas from '../components/QuizCanvas'

export default function PracticeQuizPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1 flex items-center justify-center">
        <QuizCanvas />
      </main>
      <Footer />
    </div>
  )
}