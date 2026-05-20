function PracticeQuizPage() {
  return (
    <div className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
        {/* Progress Indicator */}
        <div className="mb-stack-lg">
          <div className="flex justify-between items-center mb-stack-sm">
            <span className="font-label-caps text-label-caps text-on-surface-variant">QUESTION 4 OF 12</span>
            <span className="font-label-caps text-label-caps text-on-secondary-container">33% COMPLETE</span>
          </div>
          <div className="h-1 w-full bg-secondary-container/10">
            <div className="h-full bg-secondary w-1/3"></div>
          </div>
        </div>

        {/* Quiz Question */}
        <div className="space-y-stack-lg">
          <header>
            <h2 className="font-h2 text-h2 text-primary mb-stack-md">Which of the following sentences correctly utilizes the present perfect continuous tense?</h2>
            <div className="border-l-4 border-primary-container pl-stack-md">
              <p className="font-body-reading text-body-reading italic text-on-surface-variant">
                "The researchers _____ data for over three decades to ensure statistical significance."
              </p>
            </div>
          </header>

          {/* Options */}
          <form className="space-y-stack-md">
            <label className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
              <input checked="" className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
              <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">have been gathering</span>
            </label>
            <label className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
              <input className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
              <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">had gathered</span>
            </label>
            <label className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
              <input className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
              <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">are gathering</span>
            </label>
            <label className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
              <input className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
              <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">will have gathered</span>
            </label>
          </form>

          {/* Action */}
          <div className="flex justify-end pt-stack-md">
            <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit">
              Next
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PracticeQuizPage
