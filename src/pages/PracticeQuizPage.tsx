import ArrowForwardIcon from '../components/icons/ArrowForwardIcon';

const PracticeQuizPage = () => {
  const currentQuestion = 4;
  const totalQuestions = 12;
  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);

  const options = [
    { id: 'opt1', value: 'have been gathering', selected: true },
    { id: 'opt2', value: 'had gathered', selected: false },
    { id: 'opt3', value: 'are gathering', selected: false },
    { id: 'opt4', value: 'will have gathered', selected: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* TopNavBar */}
      <nav className="bg-surface-container-lowest border-b border-outline-variant docked full-width top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <span className="text-xl font-bold tracking-tighter text-primary font-h1">Linguist Library</span>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-body-ui text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer active:opacity-80" href="#">Lessons</a>
            <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Flashcards</a>
            <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Progress</a>
            <a className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Library</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant transition-colors duration-200 hover:text-secondary cursor-pointer active:opacity-80">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface-variant">QUESTION {currentQuestion} OF {totalQuestions}</span>
              <span className="font-label-caps text-label-caps text-on-secondary-container">{progressPercent}% COMPLETE</span>
            </div>
            <div className="h-1 w-full bg-secondary-container">
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
            <fieldset>
              <legend className="sr-only">Quiz options</legend>
              <div className="space-y-stack-md">
                {options.map((option) => (
                  <label key={option.id} className="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-surface-container-lowest">
                    <input
                      checked={option.selected}
                      className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors"
                      name="quiz_option"
                      type="radio"
                    />
                    <span className="ml-stack-md font-body-ui text-body-ui text-on-surface">{option.value}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Action */}
            <div className="flex justify-end pt-stack-md">
              <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit">
                Next
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant full-width bottom-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <p className="font-body-ui text-xs text-on-surface-variant">© {new Date().getFullYear()} Linguist Library. Premium Academic English Study.</p>
          <div className="flex gap-6">
            <a className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a>
            <a className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
            <a className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PracticeQuizPage;