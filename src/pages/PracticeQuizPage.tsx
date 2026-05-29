import { useState } from 'react'
import ArrowForwardIcon from '../components/ArrowForwardIcon'

interface QuizOption {
  id: string
  text: string
}

const quizData = {
  questionNumber: 4,
  totalQuestions: 12,
  question: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
  blankSentence: "The researchers _____ data for over three decades to ensure statistical significance.",
  options: [
    { id: 'a', text: 'have been gathering' },
    { id: 'b', text: 'had gathered' },
    { id: 'c', text: 'are gathering' },
    { id: 'd', text: 'will have gathered' }
  ] as QuizOption[]
}

function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState<string>('')

  const percentage = Math.round((quizData.questionNumber / quizData.totalQuestions) * 100)

  const handleNext = () => {
    console.log('Selected:', selectedOption)
  }

  return (
    <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
      {/* Progress Indicator */}
      <div className="mb-stack-lg">
        <div className="flex justify-between items-center mb-stack-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant">
            QUESTION {quizData.questionNumber} OF {quizData.totalQuestions}
          </span>
          <span className="font-label-caps text-label-caps text-on-secondary-container">
            {percentage}% COMPLETE
          </span>
        </div>
        <div className="h-1 w-full bg-secondary-container/10">
          <div
            className="h-full bg-secondary"
            style={{ width: `${(quizData.questionNumber / quizData.totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Quiz Question */}
      <div className="space-y-stack-lg">
        <header>
          <h2 className="font-h2 text-h2 text-primary mb-stack-md">{quizData.question}</h2>
          <div className="border-l-4 border-primary-container pl-stack-md">
            <p className="font-body-reading text-body-reading italic text-on-surface-variant">
              "{quizData.blankSentence}"
            </p>
          </div>
        </header>

        {/* Options */}
        <form className="space-y-stack-md">
          {quizData.options.map((option) => (
            <label
              key={option.id}
              className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white"
            >
              <input
                type="radio"
                name="quiz_option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
              />
              <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">{option.text}</span>
            </label>
          ))}
        </form>

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
  )
}

export default PracticeQuizPage