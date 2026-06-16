export default function ProgressIndicator({ currentQuestion, totalQuestions }) {
  const percentage = Math.round((currentQuestion / totalQuestions) * 100)
  const progressWidth = `${(currentQuestion / totalQuestions) * 100}%`

  return (
    <div className="mb-stack-lg">
      <div className="flex justify-between items-center mb-stack-sm">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          QUESTION {currentQuestion} OF {totalQuestions}
        </span>
        <span className="font-label-caps text-label-caps text-on-secondary-container">
          {percentage}% COMPLETE
        </span>
      </div>
      <div className="h-1 w-full bg-secondary/10">
        <div className="h-full bg-secondary" style={{ width: progressWidth }}></div>
      </div>
    </div>
  )
}
