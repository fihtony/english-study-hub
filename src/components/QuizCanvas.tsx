import { useState } from 'react'
import ArrowForwardIcon from './ArrowForwardIcon'

const quizData = {
  questionNumber: 4,
  totalQuestions: 12,
  questionText: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  sampleSentence: 'The researchers _____ data for over three decades to ensure statistical significance.',
  options: [
    'have been gathering',
    'had gathered',
    'are gathering',
    'will have gathered'
  ],
  correctAnswerIndex: 0
}

export default function QuizCanvas() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const progressPercent = Math.round((quizData.questionNumber / quizData.totalQuestions) * 100)

  return (
    <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm mx-auto my-0">
      {/* Progress Indicator */}
      <div className="mb-stack-lg">
        <div className="flex justify-between items-center mb-stack-sm">
          <span className="font-label-caps text-label-caps text-on-surface-variant">QUESTION {quizData.questionNumber} OF {quizData.totalQuestions}</span>
          <span className="font-label-caps text-label-caps text-on-secondary-container">{progressPercent}% COMPLETE</span>
        </div>
        <div className="h-1 w-full bg-secondary-container/10">
          <div className="h-full bg-secondary w-1/3"></div>
        </div>
      </div>

      {/* Quiz Question */}
      <div className="space-y-stack-lg">
        <header>
          <h2 className="font-h2 text-h2 text-primary mb-stack-md">{quizData.questionText}</h2>
          <div className="border-l-4 border-primary-container pl-stack-md">
            <p className="font-body-reading text-body-reading italic text-on-surface-variant">
              "{quizData.sampleSentence}"
            </p>
          </div>
        </header>

        {/* Options */}
        <fieldset className="space-y-stack-md">
          <legend className="sr-only">Select the correct answer</legend>
          {quizData.options.map((option, index) => (
            <label key={index} className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
              <input
                type="radio"
                name="quiz_option"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
                className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
              />
              <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Action */}
        <div className="flex justify-end pt-stack-md">
          <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit">
            Next
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  )
}