import React, { useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { Footer } from '../components/Footer';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  quote: string;
  options: QuizOption[];
  correctAnswer: string;
}

const quizData: QuizQuestion = {
  id: 4,
  question: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  quote: 'The researchers _____ data for over three decades to ensure statistical significance.',
  options: [
    { id: 'A', text: 'have been gathering' },
    { id: 'B', text: 'had gathered' },
    { id: 'C', text: 'are gathering' },
    { id: 'D', text: 'will have gathered' },
  ],
  correctAnswer: 'A',
};

const totalQuestions = 12;

export function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const currentQuestion = quizData;
  const currentNumber = currentQuestion.id;
  const progressPercentage = Math.round((currentNumber / totalQuestions) * 100);

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption) {
      console.log('Selected option:', selectedOption);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />
      
      <main className="flex-1 max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex items-center justify-center">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {currentNumber} OF {totalQuestions}
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
                {currentQuestion.question}
              </h2>
              <div className="border-l-4 border-primary-container pl-stack-md">
                <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                  "{currentQuestion.quote}"
                </p>
              </div>
            </header>

            {/* Options */}
            <fieldset>
              <legend className="sr-only">Select an answer</legend>
              <div className="space-y-stack-md">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.id}
                    className={`group flex items-center p-stack-md border transition-colors cursor-pointer bg-white ${
                      selectedOption === option.id
                        ? 'border-secondary bg-surface-container'
                        : 'border-outline-variant hover:border-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz_option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={() => handleOptionChange(option.id)}
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
                onClick={handleNext}
                className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit"
              >
                Next
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
