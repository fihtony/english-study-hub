interface Option {
  id: number
  text: string
}

interface Question {
  text: string
  quote: string
  options: Option[]
  correctIndex: number
}

interface QuizQuestionProps {
  question: Question
  onAnswerSelected: (optionId: number) => void
  onNext: () => void
}

function ArrowForwardIcon() {
  return (
    <svg className="text-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

export default function QuizQuestion({ question, onAnswerSelected, onNext }: QuizQuestionProps) {
  return (
    <div className="space-y-stack-lg">
      <header>
        <h2 className="font-h2 text-h2 text-primary mb-stack-md">{question.text}</h2>
        <div className="border-l-4 border-primary-container pl-stack-md">
          <p className="font-body-reading text-body-reading italic text-on-surface-variant">
            "{question.quote}"
          </p>
        </div>
      </header>

      <fieldset className="space-y-stack-md">
        <legend className="sr-only">Quiz options</legend>
        {question.options.map((option) => (
          <label
            key={option.id}
            className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white"
          >
            <input
              type="radio"
              name="quiz_option"
              value={option.id}
              className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
              onChange={() => onAnswerSelected(option.id)}
            />
            <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">{option.text}</span>
          </label>
        ))}
      </fieldset>

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
  )
}