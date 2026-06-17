import { useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { Footer } from '../components/Footer';
import { ArrowForwardIcon } from '../components/ArrowForwardIcon';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  quoteText: string;
  options: QuizOption[];
  correctAnswerIndex: number;
}

const quizData: QuizQuestion = {
  questionNumber: 4,
  totalQuestions: 12,
  questionText: 'Which of the following sentences correctly utilizes the present perfect continuous tense?',
  quoteText: 'The researchers _____ data for over three decades to ensure statistical significance.',
  options: [
    { id: 'a', text: 'have been gathering' },
    { id: 'b', text: 'had gathered' },
    { id: 'c', text: 'are gathering' },
    { id: 'd', text: 'will have gathered' }
  ],
  correctAnswerIndex: 0
};

export function PracticeQuizPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const progressPercentage = Math.round((quizData.questionNumber / quizData.totalQuestions) * 100);
  const progressBarWidth = `${(quizData.questionNumber / quizData.totalQuestions) * 100}%`;

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    // Navigation handled in later implementation
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />
      
      <main className="flex-1 flex items-center justify-center px-margin-mobile md:px-gutter py-section-padding">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {quizData.questionNumber} OF {quizData.totalQuestions}
              </span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">
                {progressPercentage}% COMPLETE
              </span>
            </div>
            <div className="h-1 w-full bg-secondary-container/10">
              <div className="h-full bg-secondary" style={{ width: progressBarWidth }}></div>
            </div>
          </div>

          {/* Quiz Question */}
          <div className="space-y-stack-lg">
            <header>
              <h2 className="font-h2 text-h2 text-primary mb-stack-md">
                {quizData.questionText}
              </h2>
              <div className="border-l-4 border-primary-container pl-stack-md">
                <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                  "{quizData.quoteText}"
                </p>
              </div>
            </header>

            {/* Options */}
            <fieldset>
              <legend className="sr-only">Select the correct answer</legend>
              <div className="space-y-stack-md">
                {quizData.options.map((option, index) => (
                  <label
                    key={option.id}
                    className={`group flex items-center p-stack-md border transition-colors cursor-pointer ${
                      selectedOption === option.id
                        ? 'border-secondary bg-white'
                        : 'border-outline-variant hover:border-secondary bg-white'
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
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
