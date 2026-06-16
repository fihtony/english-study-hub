const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-slate-500">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex items-center space-x-6">
          <a
            className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
