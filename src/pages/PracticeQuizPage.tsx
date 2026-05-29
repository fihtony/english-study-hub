import { TopNavBar } from '../components/TopNavBar';
import { Footer } from '../components/Footer';
import { ArrowForwardIcon } from '../components/icons';

export interface QuizQuestion {
  id: number;
  question: string;
  quote: string;
  options: string[];
  correctIndex: number;
}

export interface QuizProgress {
  currentQuestion: number;
  totalQuestions: number;
}

interface PracticeQuizPageProps {
  quizData?: QuizQuestion;
  progress?: QuizProgress;
  onNext?: () => void;
}

const defaultQuizData: QuizQuestion = {
  id: 4,
  question: "Which of the following sentences correctly utilizes the present perfect continuous tense?",
  quote: "The researchers _____ data for over three decades to ensure statistical significance.",
  options: ["have been gathering", "had gathered", "are gathering", "will have gathered"],
  correctIndex: 0
};

const defaultProgress: QuizProgress = {
  currentQuestion: 4,
  totalQuestions: 12
};

export function PracticeQuizPage({
  quizData = defaultQuizData,
  progress = defaultProgress,
  onNext
}: PracticeQuizPageProps) {
  const progressPercentage = Math.round((progress.currentQuestion / progress.totalQuestions) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavBar />

      <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                QUESTION {progress.currentQuestion} OF {progress.totalQuestions}
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
              <h2 className="font-h2 text-h2 text-on-surface mb-stack-md">
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
                {quizData.options.map((option, index) => (
                  <label
                    key={index}
                    htmlFor={`quiz-option-${index}`}
                    className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white mb-stack-sm last:mb-0"
                  >
                    <input
                      id={`quiz-option-${index}`}
                      className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                      name="quiz_option"
                      type="radio"
                      defaultChecked={index === quizData.correctIndex}
                    />
                    <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">
                      {option}
                    </span>
                  </label>
                ))}
              </fieldset>
            </form>

            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button
                onClick={onNext}
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

export default PracticeQuizPage;