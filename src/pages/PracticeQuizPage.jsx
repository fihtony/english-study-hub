import { useState } from 'react'
import ArrowForwardIcon from '../components/ArrowForwardIcon'

const sampleQuizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  question: {
    heading: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
    quote: "The researchers _____ data for over three decades to ensure statistical significance.",
    options: [
      "have been gathering",
      "had gathered",
      "are gathering",
      "will have gathered"
    ]
  }
}

function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState(null)
  const { currentQuestion, totalQuestions, question } = sampleQuizData
  const percentComplete = Math.round((currentQuestion / totalQuestions) * 100)

  return (
    <main className="max-w-[1120px] mx-auto px-4 md:px-6 py-20 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-outline-variant p-6 md:p-8 shadow-sm">
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-label-caps text-on-surface-variant">QUESTION {currentQuestion} OF {totalQuestions}</span>
            <span className="font-label-caps text-label-caps text-on-secondary-container">{percentComplete}% COMPLETE</span>
          </div>
          <div className="h-1 w-full bg-secondary/10">
            <div className="h-full bg-secondary" style={{ width: `${percentComplete}%` }}></div>
          </div>
        </div>

        {/* Quiz Question */}
        <div className="space-y-6">
          <header>
            <h2 className="font-h2 text-h2 text-primary mb-6">{question.heading}</h2>
            <div className="border-l-4 border-primary-container pl-6">
              <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                "{question.quote}"
              </p>
            </div>
          </header>

          {/* Options */}
          <form className="space-y-4">
            {question.options.map((option, index) => (
              <label
                key={index}
                className="group flex items-center p-4 border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white"
              >
                <input
                  type="radio"
                  name="quiz_option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                />
                <span className="ml-4 font-body-ui text-body-ui text-on-surface">{option}</span>
              </label>
            ))}
          </form>

          {/* Action */}
          <div className="flex justify-end pt-4">
            <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2">
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