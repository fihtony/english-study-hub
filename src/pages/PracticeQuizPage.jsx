import { useState } from 'react'

const ArrowForwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const quizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  question: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
  quote: "The researchers _____ data for over three decades to ensure statistical significance.",
  options: [
    { id: 'a', text: 'have been gathering', selected: true },
    { id: 'b', text: 'had gathered', selected: false },
    { id: 'c', text: 'are gathering', selected: false },
    { id: 'd', text: 'will have gathered', selected: false },
  ]
}

function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState('a')
  const currentYear = new Date().getFullYear()
  const progressPercentage = Math.round((quizData.currentQuestion / quizData.totalQuestions) * 100)

  return (
    <div className="flex flex-col min-h-screen">
      {/* TopNavBar */}
      <nav className="bg-white border-b border-outline-variant top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <span className="text-xl font-bold tracking-tighter text-primary font-h1">Linguist Library</span>
          <div className="hidden md:flex items-center gap-8">
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer"
              href="/lessons"
              aria-label="Navigate to Lessons"
            >
              Lessons
            </a>
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="/flashcards"
              aria-disabled="true"
              role="link"
              aria-label="Flashcards (coming soon)"
            >
              Flashcards
            </a>
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="/progress"
              aria-disabled="true"
              role="link"
              aria-label="Progress (coming soon)"
            >
              Progress
            </a>
            <a
              className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer"
              href="/library"
              aria-disabled="true"
              role="link"
              aria-label="Library (coming soon)"
            >
              Library
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex items-center justify-center">
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
                  "{quizData.quote}"
                </p>
              </div>
            </header>

            {/* Options */}
            <form className="space-y-stack-md">
              <fieldset>
                <legend className="sr-only">Select the correct answer</legend>
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
                    <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">
                      {option.text}
                    </span>
                  </label>
                ))}
              </fieldset>
            </form>

            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit">
                Next
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <p className="font-body-ui text-xs text-on-surface-variant">
            © {currentYear} Linguist Library. Premium Academic English Study.
          </p>
          <div className="flex gap-6">
            <a
              className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors"
              href="/terms"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>
            <a
              className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors"
              href="/privacy"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors"
              href="/contact"
              aria-label="Contact Support"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PracticeQuizPage