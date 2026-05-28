const ArrowForwardIcon = () => (
  <svg class="icon-arrow-forward text-[18px]" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
)

function TopNavBar() {
  return (
    <nav class="bg-white border-b border-gray-100 full-width top-0 z-50">
      <div class="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto w-full">
        <span class="text-xl font-bold tracking-tighter text-blue-900 font-h1">Linguist Library</span>
        <div class="hidden md:flex items-center gap-8">
          <a class="font-['Work_Sans'] text-sm font-medium tracking-tight text-teal-600 border-b-2 border-teal-600 pb-1 cursor-pointer active:opacity-80" href="#">Lessons</a>
          <a class="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors cursor-pointer active:opacity-80" href="#">Flashcards</a>
          <a class="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors cursor-pointer active:opacity-80" href="#">Progress</a>
          <a class="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors cursor-pointer active:opacity-80" href="#">Library</a>
        </div>
        <div class="flex items-center gap-4">
          <button class="font-['Work_Sans'] text-sm font-medium tracking-tight text-slate-600 hover:text-teal-600 transition-colors cursor-pointer active:opacity-80">Sign In</button>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer class="bg-slate-50 border-t border-gray-200 full-width bottom-0">
      <div class="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p class="font-['Work_Sans'] text-xs text-slate-500">© 2024 Linguist Library. Premium Academic English Study.</p>
        <div class="flex gap-6">
          <a class="font-['Work_Sans'] text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
          <a class="font-['Work_Sans'] text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
          <a class="font-['Work_Sans'] text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}

function QuizOption({ text, checked = false }) {
  return (
    <label class="group flex items-center p-stack-md border border-outline-variant hover:border-secondary transition-colors cursor-pointer bg-white">
      <input checked={checked} class="w-4 h-4 text-secondary focus:ring-secondary border-outline transition-colors" name="quiz_option" type="radio"/>
      <span class="ml-stack-md font-body-ui text-body-ui text-on-surface">{text}</span>
    </label>
  )
}

function PracticeQuizPage() {
  return (
    <div class="flex flex-col min-h-screen">
      <TopNavBar />
      <main class="max-w-[1120px] mx-auto px-margin-mobile md:px-gutter py-section-padding min-h-[calc(100vh-160px)] flex items-center justify-center flex-1">
        <div class="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-stack-lg shadow-sm">
          <div class="mb-stack-lg">
            <div class="flex justify-between items-center mb-stack-sm">
              <span class="font-label-caps text-label-caps text-on-surface-variant">QUESTION 4 OF 12</span>
              <span class="font-label-caps text-label-caps text-on-secondary-container">33% COMPLETE</span>
            </div>
            <div class="h-1 w-full bg-secondary-container/10">
              <div class="h-full bg-secondary w-1/3"></div>
            </div>
          </div>
          <div class="space-y-stack-lg">
            <header>
              <h2 class="font-h2 text-h2 text-primary mb-stack-md">Which of the following sentences correctly utilizes the present perfect continuous tense?</h2>
              <div class="border-l-4 border-primary-container pl-stack-md">
                <p class="font-body-reading text-body-reading italic text-on-surface-variant">
                  "The researchers _____ data for over three decades to ensure statistical significance."
                </p>
              </div>
            </header>
            <form class="space-y-stack-md">
              <QuizOption text="have been gathering" checked={true} />
              <QuizOption text="had gathered" />
              <QuizOption text="are gathering" />
              <QuizOption text="will have gathered" />
            </form>
            <div class="flex justify-end pt-stack-md">
              <button class="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-stack-md hover:opacity-90 transition-opacity flex items-center gap-unit cursor-pointer">
                Next
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PracticeQuizPage