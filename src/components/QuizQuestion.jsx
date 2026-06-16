export default function QuizQuestion({
  questionText,
  sentencePlaceholder,
  options,
  selectedOption,
  onOptionChange,
}) {
  return (
    <div className="space-y-stack-lg">
      <header>
        <h2 className="font-h2 text-h2 text-primary mb-stack-md">{questionText}</h2>
        <div className="border-l-4 border-primary-container pl-stack-md">
          <p className="font-body-reading text-body-reading italic text-on-surface-variant">
            {sentencePlaceholder}
          </p>
        </div>
      </header>
      <form className="space-y-stack-md">
        {options.map((option) => (
          <label
            key={option}
            className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white"
          >
            <input
              type="radio"
              name="quiz_option"
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
              className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
            />
            <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">{option}</span>
          </label>
        ))}
      </form>
    </div>
  )
}
