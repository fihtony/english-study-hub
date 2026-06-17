import { useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'

interface QuizOption {
  id: string
  text: string
}

interface QuizQuestion {
  questionNumber: number
  totalQuestions: number
  question: string
  quote: string
  options: QuizOption[]
  correctOptionId: string
}

const quizData: QuizQuestion = {
  questionNumber: 4,
  totalQuestions: 12,
  question: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  quote: '"The researchers _____ data for over three decades to ensure statistical significance."',
  options: [
    { id: 'A', text: 'have been gathering' },
    { id: 'B', text: 'had gathered' },
    { id: 'C', text: 'are gathering' },
    { id: 'D', text: 'will have gathered' },
  ],
  correctOptionId: 'A',
}

function ArrowForwardIcon() {
  return (
    <svg
      className="material-symbols-outlined text-[18px]"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
    >
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  )
}

export default function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const progressPercentage = Math.round(
    (quizData.questionNumber / quizData.totalQuestions) * 100
  )

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNextClick = () => {
    // Navigation to next question would be handled here
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />

      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-gutter py-section-padding">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {quizData.questionNumber} OF {quizData.totalQuestions}
              </span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                {progressPercentage}% COMPLETE
              </span>
            </div>
            <div className="h-1 w-full bg-secondary-container/10">
              <div
                className="h-full bg-secondary"
                style={{ width: `${progressPercentage}%` }}
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
                  {quizData.quote}
                </p>
              </div>
            </header>

            {/* Options */}
            <fieldset>
              <legend className="sr-only">Quiz options</legend>
              <div className="space-y-stack-md">
                {quizData.options.map((option) => (
                  <label
                    key={option.id}
                    className={`group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white ${
                      selectedOption === option.id ? 'border-secondary bg-secondary-fixed' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz_option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => handleOptionChange(option.id)}
                      className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                    />
                    <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">
                      {option.text}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button
                onClick={handleNextClick}
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
