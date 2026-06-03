const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 bottom-0 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-['Work_Sans'] text-xs text-slate-500">© {currentYear} Linguist Library. Premium Academic English Study.</p>
        <div className="flex gap-6">
          <a className="font-['Work_Sans'] text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
          <a className="font-['Work_Sans'] text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
          <a className="font-['Work_Sans'] text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}