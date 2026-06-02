export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-outline-variant mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex gap-6">
          <a className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs font-semibold text-on-surface hover:text-primary transition-colors" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}
