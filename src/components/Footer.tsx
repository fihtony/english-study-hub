export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-slate-500">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex gap-6">
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-slate-900 font-semibold hover:text-blue-900 transition-colors" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}
