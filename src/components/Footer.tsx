export default function Footer() {
  return (
    <footer className="bg-surface-container-low">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-['Work_Sans'] text-xs text-slate-500">
          © {new Date().getFullYear()} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex items-center space-x-6">
          <a className="font-['Work_Sans'] text-xs text-slate-500 hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="font-['Work_Sans'] text-xs text-slate-500 hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="font-['Work_Sans'] text-xs text-slate-500 hover:text-primary transition-colors" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}