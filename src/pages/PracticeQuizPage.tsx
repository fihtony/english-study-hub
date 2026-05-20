export default function PracticeQuizPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body-ui">
      {/* TopNavBar */}
      <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
          <span className="text-xl font-bold tracking-tighter text-blue-900 font-h1">Linguist Library</span>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-body-ui text-sm font-medium tracking-tight text-secondary border-b-2 border-secondary pb-1 cursor-pointer active:opacity-80" href="#">Lessons</a>
            <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Flashcards</a>
            <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Progress</a>
            <a className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80" href="#">Library</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-body-ui text-sm font-medium tracking-tight text-slate-600 hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="max-w-[1120px] mx-auto px-4 md:px-6 py-[80px] min-h-[calc(100vh-160px)] flex items-center justify-center mt-16">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-6 md:p-8 shadow-sm">

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold text-on-surface-variant">QUESTION 4 OF 12</span>
              <span className="text-[12px] leading-[1] tracking-[0.05em] font-semibold text-on-secondary-container">33% COMPLETE</span>
            </div>
            <div className="h-1 w-full bg-secondary/10">
              <div className="h-full bg-secondary w-1/3"></div>
            </div>
          </div>

          {/* Quiz Question */}
          <div className="space-y-6">
            <header>
              <h2 className="text-[32px] leading-[1.3] font-semibold text-primary mb-6 font-h2">
                Which of the following sentences correctly utilizes the present perfect continuous tense?
              </h2>
              <div className="border-l-4 border-primary-container pl-6">
                <p className="text-[20px] leading-[1.7] font-normal text-on-surface-variant italic font-body-reading">
                  "The researchers _____ data for over three decades to ensure statistical significance."
                </p>
              </div>
            </header>

            {/* Options */}
            <form className="space-y-6">
              <label className="group flex items-center p-6 border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
                <input checked className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
                <span className="ml-6 text-[16px] leading-[1.5] font-normal text-on-surface font-body-ui">have been gathering</span>
              </label>
              <label className="group flex items-center p-6 border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
                <input className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
                <span className="ml-6 text-[16px] leading-[1.5] font-normal text-on-surface font-body-ui">had gathered</span>
              </label>
              <label className="group flex items-center p-6 border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
                <input className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
                <span className="ml-6 text-[16px] leading-[1.5] font-normal text-on-surface font-body-ui">are gathering</span>
              </label>
              <label className="group flex items-center p-6 border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
                <input className="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
                <span className="ml-6 text-[16px] leading-[1.5] font-normal text-on-surface font-body-ui">will have gathered</span>
              </label>
            </form>

            {/* Action */}
            <div className="flex justify-end pt-6">
              <button className="bg-on-tertiary-container text-on-tertiary text-[16px] leading-[1] font-medium px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2 font-button">
                Next
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
          <p className="text-[12px] text-slate-500">© 2024 Linguist Library. Premium Academic English Study.</p>
          <div className="flex gap-6">
            <a className="text-[12px] text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
            <a className="text-[12px] text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
            <a className="text-[12px] text-slate-500 hover:text-blue-900 transition-colors" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
