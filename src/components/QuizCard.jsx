import { useState } from 'react'
import ArrowForwardIcon from '../components/icons/ArrowForwardIcon'

const quizData = {
  questionNumber: 4,
  totalQuestions: 12,
  questionText: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
  quotedSentence: "The researchers _____ data for over three decades to ensure statistical significance.",
  options: [
    { id: 1, text: "have been gathering", selected: true },
    { id: 2, text: "had gathered", selected: false },
    { id: 3, text: "are gathering", selected: false },
    { id: 4, text: "will have gathered", selected: false }
  ]
}

export default function QuizCard() {
  const [selectedOption, setSelectedOption] = useState(quizData.options.find(o => o.selected)?.id || null)
  const progress = (quizData.questionNumber / quizData.totalQuestions) * 100
  const progressText = `${Math.round(progress)}% COMPLETE`

  const handleNext = () => {
    console.log('Next clicked, selected:', selectedOption)
  }

  return (
    <div class="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
      {/* Progress Indicator */}
      <div class="mb-stack-lg">
        <div class="flex justify-between items-center mb-stack-sm">
          <span class="font-label-caps text-label-caps text-on-surface-variant">QUESTION {quizData.questionNumber} OF {quizData.totalQuestions}</span>
          <span class="font-label-caps text-label-caps text-on-secondary-container">{progressText}</span>
        </div>
        <div class="h-1 w-full bg-secondary-container/10">
          <div class="h-full bg-secondary" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Quiz Question */}
      <div class="space-y-stack-lg">
        <header>
          <h2 class="font-h2 text-h2 text-primary mb-stack-md">{quizData.questionText}</h2>
          <div class="border-l-4 border-primary-container pl-stack-md">
            <p class="font-body-reading text-body-reading italic text-on-surface-variant">
              "{quizData.quotedSentence}"
            </p>
          </div>
        </header>

        {/* Options */}
        <form class="space-y-stack-md">
          {quizData.options.map(option => (
            <label key={option.id} class="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
              <input
                type="radio"
                name="quiz_option"
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                class="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
              />
              <span class="ml-stack-md font-body-ui text-body-ui text-on-surface">{option.text}</span>
            </label>
          ))}
        </form>

        {/* Action */}
        <div class="flex justify-end pt-stack-md">
          <button
            onClick={handleNext}
            class="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit"
          >
            Next
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  )
}