import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import QuizCard from '../components/QuizCard'

export default function PracticeQuizPage() {
  return (
    <div class="flex flex-col min-h-screen">
      <TopNavBar />
      <main class="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
        <QuizCard />
      </main>
      <Footer />
    </div>
  )
}