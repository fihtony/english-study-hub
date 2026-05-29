import { useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'
import ArrowForwardIcon from '../components/ArrowForwardIcon'

const quizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  question: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  quote: 'The researchers _____ data for over three decades to ensure statistical significance.',
  options: [
    'have been gathering',
    'had gathered',
    'are gathering',
    'will have gathered'
  ],
  correctAnswerIndex: 0
}

function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswerChange = (index) => {
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    // Navigate to next question - for bare-bones, just console log
    console.log('Next clicked, selected answer:', selectedAnswer)
  }

  const progressPercent = Math.round((quizData.currentQuestion / quizData.totalQuestions) * 100)
  const progressBarWidth = (quizData.currentQuestion / quizData.totalQuestions) * 100

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />

      <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {quizData.currentQuestion} OF {quizData.totalQuestions}
              </span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                {progressPercent}% COMPLETE
              </span>
            </div>
            <div className="h-1 w-full bg-secondary/10">
              <div
                className="h-full bg-secondary"
                style={{ width: `${progressBarWidth}%` }}
              />
            </div>
          </div>

          {/* Quiz Question */}
          <div className="space-y-stack-lg">
            <header>
              <h2 className="font-h2 text-h2 text-primary mb-stack-md">
                {quizData.question}
              </h2>
              <div className="border-l-4 border-primary-container pl-stack-md">
                <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                  "{quizData.quote}"
                </p>
              </div>
            </header>

            {/* Options */}
            <fieldset>
              <legend className="sr-only">Select your answer</legend>
              <div className="space-y-stack-md">
                {quizData.options.map((option, index) => (
                  <label
                    key={index}
                    className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white"
                  >
                    <input
                      type="radio"
                      name="quiz_option"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => handleAnswerChange(index)}
                      className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                    />
                    <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button
                onClick={handleNext}
                className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit"
              >
                Next
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default QuizPage