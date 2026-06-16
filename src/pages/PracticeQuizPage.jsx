import { useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import ProgressIndicator from '../components/ProgressIndicator'
import QuizQuestion from '../components/QuizQuestion'
import NextButton from '../components/NextButton'
import Footer from '../components/Footer'

const quizData = {
  currentQuestion: 4,
  totalQuestions: 12,
  questionText: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  sentencePlaceholder: '"The researchers _____ data for over three decades to ensure statistical significance."',
  options: ['have been gathering', 'had gathered', 'are gathering', 'will have gathered'],
}

export default function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState<string>('have been gathering')

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-1 max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex items-center justify-center w-full">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          <ProgressIndicator
            currentQuestion={quizData.currentQuestion}
            totalQuestions={quizData.totalQuestions}
          />
          <QuizQuestion
            questionText={quizData.questionText}
            sentencePlaceholder={quizData.sentencePlaceholder}
            options={quizData.options}
            selectedOption={selectedOption}
            onOptionChange={setSelectedOption}
          />
          <div className="flex justify-end pt-stack-md">
            <NextButton />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
