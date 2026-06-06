const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library | Premium Academic English Study.
        </div>
        <nav className="flex space-x-6" aria-label="Footer navigation">
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors" href="/terms">
            Terms of Service
          </a>
          <a className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors" href="/privacy">
            Privacy Policy
          </a>
          <a className="font-body-ui text-xs font-semibold text-on-surface hover:text-primary transition-colors" href="/support">
            Contact Support
          </a>
        </nav>
      </div>
    </footer>
  )
}
