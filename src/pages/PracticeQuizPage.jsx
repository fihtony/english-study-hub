import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

const quizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  question: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
  blockquote: "\"The researchers _____ data for over three decades to ensure statistical significance.\"",
  options: [
    { id: 'opt1', value: 'have been gathering', label: 'have been gathering' },
    { id: 'opt2', value: 'had gathered', label: 'had gathered' },
    { id: 'opt3', value: 'are gathering', label: 'are gathering' },
    { id: 'opt4', value: 'will have gathered', label: 'will have gathered' }
  ],
  correctAnswer: 'have been gathering'
}

const ArrowForwardIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
  </svg>
)

function TopNavBar() {
  return (
    <nav className="bg-white border-b border-outline-variant">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span className="text-xl font-bold tracking-tighter text-primary font-h1">Linguist Library</span>
        <div className="hidden md:flex items-center gap-8">
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant border-b-2 border-secondary pb-1" href="/lessons">Lessons</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="/flashcards">Flashcards</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="/progress">Progress</a>
          <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200" href="/library">Library</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200">Sign In</button>
        </div>
      </div>
    </nav>
  )
}

function ProgressIndicator({ current, total }) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="mb-stack-lg">
      <div className="flex justify-between items-center mb-stack-sm">
        <span className="font-label-caps text-label-caps text-on-surface-variant">QUESTION {current} OF {total}</span>
        <span className="font-label-caps text-label-caps text-on-secondary-container">{percentage}% COMPLETE</span>
      </div>
      <div className="h-1 w-full bg-secondary-container/10">
        <div className="h-full bg-secondary" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function QuizQuestion({ question, blockquote }) {
  return (
    <header>
      <h2 className="font-h2 text-h2 text-primary mb-stack-md">{question}</h2>
      <div className="border-l-4 border-primary-container pl-stack-md">
        <p className="font-body-reading text-body-reading italic text-on-surface-variant">
          {blockquote}
        </p>
      </div>
    </header>
  )
}

function RadioOption({ id, name, value, label, isSelected, onChange }) {
  return (
    <label className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
      />
      <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">{label}</span>
    </label>
  )
}

function QuizOptions({ options, selectedAnswer, onSelect }) {
  return (
    <fieldset className="space-y-stack-md">
      <legend className="sr-only">Quiz answer options</legend>
      {options.map((option) => (
        <RadioOption
          key={option.id}
          id={option.id}
          name="quiz_option"
          value={option.value}
          label={option.label}
          isSelected={selectedAnswer === option.value}
          onChange={onSelect}
        />
      ))}
    </fieldset>
  )
}

function NextButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit"
    >
      Next
      <ArrowForwardIcon />
    </button>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-body-ui text-xs text-on-surface-variant">© {currentYear} Linguist Library. Premium Academic English Study.</p>
        <div className="flex gap-6">
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

export default function PracticeQuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswerSelect = (value) => {
    setSelectedAnswer(value)
  }

  const handleNextClick = () => {
    // quiz navigation would go here
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          <ProgressIndicator current={quizData.currentQuestion} total={quizData.totalQuestions} />
          <div className="space-y-stack-lg">
            <QuizQuestion question={quizData.question} blockquote={quizData.blockquote} />
            <QuizOptions
              options={quizData.options}
              selectedAnswer={selectedAnswer}
              onSelect={handleAnswerSelect}
            />
            <div className="flex justify-end pt-stack-md">
              <NextButton onClick={handleNextClick} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}