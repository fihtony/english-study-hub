import { useState } from 'react'
import ArrowForwardIcon from '../components/ArrowForwardIcon'

interface QuizOption {
  id: string
  text: string
}

interface QuizQuestion {
  questionNumber: number
  totalQuestions: number
  questionText: string
  quote: string
  options: QuizOption[]
  correctAnswerId: string
}

const quizData: QuizQuestion = {
  questionNumber: 4,
  totalQuestions: 12,
  questionText: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  quote: '"The researchers _____ data for over three decades to ensure statistical significance."',
  options: [
    { id: 'a', text: 'have been gathering' },
    { id: 'b', text: 'had gathered' },
    { id: 'c', text: 'are gathering' },
    { id: 'd', text: 'will have gathered' }
  ],
  correctAnswerId: 'a'
}

const PracticeQuizPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const { questionNumber, totalQuestions, questionText, quote, options } = quizData
  const progressPercentage = Math.round((questionNumber / totalQuestions) * 100)

  const handleAnswerChange = (optionId: string) => {
    setSelectedAnswer(optionId)
  }

  const handleNext = () => {
    // Navigate to next question - for now just log
    console.log('Moving to next question')
  }

  return (
    <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex items-center justify-center">
      <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
        {/* Progress Indicator */}
        <div className="mb-stack-lg">
          <div className="flex justify-between items-center mb-stack-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              QUESTION {questionNumber} OF {totalQuestions}
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
              {questionText}
            </h2>
            <div className="border-l-4 border-primary-container pl-stack-md">
              <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                {quote}
              </p>
            </div>
          </header>

          {/* Options */}
          <fieldset>
            <legend className="sr-only">Quiz options</legend>
            <div className="space-y-stack-md">
              {options.map((option) => (
                <label
                  key={option.id}
                  className={`group flex items-center p-stack-md border cursor-pointer transition-colors ${
                    selectedAnswer === option.id
                      ? 'border-secondary bg-secondary-container/10'
                      : 'border-outline-variant hover:border-secondary bg-white'
                  }`}
                >
                  <input
                    id={`quiz-option-${option.id}`}
                    type="radio"
                    name="quiz_option"
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={() => handleAnswerChange(option.id)}
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
              type="button"
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
  )
}

export default PracticeQuizPage