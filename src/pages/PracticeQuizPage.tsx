import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import QuizQuestion from '../components/QuizQuestion'

const quizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  question: {
    text: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
    quote: "The researchers _____ data for over three decades to ensure statistical significance.",
    options: [
      { id: 0, text: "have been gathering" },
      { id: 1, text: "had gathered" },
      { id: 2, text: "are gathering" },
      { id: 3, text: "will have gathered" }
    ],
    correctIndex: 0
  }
}

export default function PracticeQuizPage() {
  const progressPercent = Math.round((quizData.currentQuestion / quizData.totalQuestions) * 100)

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1 flex items-center justify-center py-section-padding px-margin-mobile md:px-gutter">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {quizData.currentQuestion} OF {quizData.totalQuestions}
              </span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                {progressPercent}% COMPLETE
              </span>
            </div>
            <div className="h-1 w-full bg-secondary-container/10">
              <div className="h-full bg-secondary w-1/3" />
            </div>
          </div>

          <QuizQuestion
            question={quizData.question}
            onAnswerSelected={() => {}}
            onNext={() => {}}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}