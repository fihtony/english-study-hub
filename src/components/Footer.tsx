export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-slate-500 dark:text-slate-400">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex items-center space-x-6">
          <a
            className="font-body-ui text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body-ui text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-ui text-xs text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}