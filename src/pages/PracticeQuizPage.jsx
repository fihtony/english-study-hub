import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ArrowForwardIcon } from '../components/ArrowForwardIcon'

const quizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  question: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
  quote: "The researchers _____ data for over three decades to ensure statistical significance.",
  options: [
    "have been gathering",
    "had gathered",
    "are gathering",
    "will have gathered"
  ],
  correctAnswerIndex: 0
}

export default function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState(null)

  const progressPercentage = Math.round((quizData.currentQuestion / quizData.totalQuestions) * 100)
  const progressBarWidth = `${(quizData.currentQuestion / quizData.totalQuestions) * 100}%`

  const handleOptionChange = (index) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    // Navigation logic would go here
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex-1 flex items-center justify-center pt-[80px] pb-[120px]">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {quizData.currentQuestion} OF {quizData.totalQuestions}
              </span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                {progressPercentage}% COMPLETE
              </span>
            </div>
            <div className="h-1 w-full bg-secondary-container/10" role="progressbar" aria-valuenow={quizData.currentQuestion} aria-valuemin={0} aria-valuemax={quizData.totalQuestions}>
              <div className="h-full bg-secondary" style={{ width: progressBarWidth }}></div>
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
              <legend className="sr-only">Quiz options</legend>
              <form className="space-y-stack-md">
                {quizData.options.map((option, index) => (
                  <label 
                    key={index} 
                    className={`group flex items-center p-stack-md border cursor-pointer bg-white transition-colors ${
                      selectedOption === index 
                        ? 'border-secondary' 
                        : 'border-outline-variant hover:border-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz_option"
                      checked={selectedOption === index}
                      onChange={() => handleOptionChange(index)}
                      className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                    />
                    <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">
                      {option}
                    </span>
                  </label>
                ))}
              </form>
            </fieldset>
            
            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button 
                className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit"
                onClick={handleNext}
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