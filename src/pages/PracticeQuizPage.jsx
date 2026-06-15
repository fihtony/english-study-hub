import { useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import Footer from '../components/Footer'

const quizData = [
  {
    id: 1,
    question: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
    quote: "The researchers _____ data for over three decades to ensure statistical significance.",
    options: ["have been gathering", "had gathered", "are gathering", "will have gathered"]
  },
  {
    id: 2,
    question: "Identify the correct sentence using the subjunctive mood:",
    quote: "It is essential that she _____ the report by Friday.",
    options: ["submit", "submits", "submitted", "submitting"]
  },
  {
    id: 3,
    question: "Which sentence demonstrates proper use of the semicolon?",
    quote: "",
    options: ["The experiment failed; however, we learned valuable data.", "The experiment failed, however, we learned valuable data.", "The experiment failed however, we learned valuable data.", "The experiment failed: however we learned valuable data."]
  },
  {
    id: 4,
    question: "Select the sentence with the correct apostrophe usage:",
    quote: "",
    options: ["The team's results exceeded expectations; it's remarkable.", "The teams' results exceeded expectations; its' remarkable.", "The team's results exceeded expectations; its remarkable.", "The teams results exceeded expectations; it's remarkable."]
  },
  {
    id: 5,
    question: "Which option uses parallel structure correctly?",
    quote: "",
    options: ["The program teaches students to read, to write, and to think critically.", "The program teaches students reading, writing, and critical thinking.", "The program teaches students how to read, write, and think.", "The program teaches students reading, to write, and thinking."]
  },
  {
    id: 6,
    question: "Choose the sentence with the correct verb tense consistency:",
    quote: "",
    options: ["When she arrives tomorrow, she will begin the analysis.", "When she arrived tomorrow, she will begin the analysis.", "When she arrives tomorrow, she begins the analysis.", "When she will arrive tomorrow, she begins the analysis."]
  },
  {
    id: 7,
    question: "Which sentence correctly uses 'whom'?",
    quote: "The professor, _____ we credited earlier, published the findings.",
    options: ["who", "whom", "whose", "whoever"]
  },
  {
    id: 8,
    question: "Select the sentence with the correct collective noun usage:",
    quote: "",
    options: ["The jury has reached their verdict.", "The jury have reached their verdict.", "The jury has reached its verdict.", "The jury have reached its verdict."]
  },
  {
    id: 9,
    question: "Which sentence demonstrates correct use of the Oxford comma?",
    quote: "",
    options: ["We studied linguistics, psychology, and sociology.", "We studied linguistics, psychology and sociology.", "We studied linguistics psychology and sociology.", "We studied linguistics; psychology; and sociology."]
  },
  {
    id: 10,
    question: "Choose the sentence with the correct pronoun reference:",
    quote: "",
    options: ["The student submitted their assignment on time.", "The student submitted his or her assignment on time.", "The student submitted it's assignment on time.", "The student submitted them assignment on time."]
  },
  {
    id: 11,
    question: "Which option contains a correctly punctuated compound sentence?",
    quote: "",
    options: ["I studied hard; I passed the exam.", "I studied hard, I passed the exam.", "I studied hard however I passed the exam.", "I studied hard; however, I passed the exam."]
  },
  {
    id: 12,
    question: "Select the sentence with the correct use of 'fewer' vs. 'less':",
    quote: "",
    options: ["There are fewer students in the advanced class.", "There are less students in the advanced class.", "There is fewer students in the advanced class.", "There are fewer student in the advanced class."]
  }
]

function ArrowForwardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  )
}

export default function PracticeQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isQuizComplete, setIsQuizComplete] = useState(false)

  const totalQuestions = quizData.length
  const currentQuestion = quizData[currentQuestionIndex]
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)

  const handleOptionChange = (index) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      setIsQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsQuizComplete(false)
  }

  if (isQuizComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopNavBar />
        <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
          <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm text-center">
            <div className="flex justify-center mb-stack-md">
              <div className="text-secondary">
                <CheckCircleIcon />
              </div>
            </div>
            <h2 className="font-h2 text-h2 text-primary mb-stack-md">Quiz Complete!</h2>
            <p className="font-body-ui text-body-ui text-on-surface-variant mb-stack-lg">
              You have completed all {totalQuestions} questions.
            </p>
            <button
              onClick={handleRestart}
              className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity"
            >
              Take Quiz Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
              </span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                {progressPercentage}% COMPLETE
              </span>
            </div>
            <div className="h-1 w-full bg-secondary-container/10">
              <div 
                className="h-full bg-secondary transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          {/* Quiz Question */}
          <div className="space-y-stack-lg">
            <header>
              <h2 className="font-h2 text-h2 text-primary mb-stack-md">
                {currentQuestion.question}
              </h2>
              {currentQuestion.quote && (
                <div className="border-l-4 border-primary-container pl-stack-md">
                  <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                    {currentQuestion.quote}
                  </p>
                </div>
              )}
            </header>
            {/* Options */}
            <form className="space-y-stack-md">
              {currentQuestion.options.map((option, index) => (
                <label 
                  key={index}
                  className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white"
                >
                  <input
                    checked={selectedOption === index}
                    onChange={() => handleOptionChange(index)}
                    className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                    name="quiz_option"
                    type="radio"
                  />
                  <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">
                    {option}
                  </span>
                </label>
              ))}
            </form>
            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish'}
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
