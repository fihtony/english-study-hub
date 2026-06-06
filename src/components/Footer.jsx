export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-surface border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-sm text-on-surface-variant">
          © {currentYear} Linguist Library | Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          <a className="font-body-ui text-sm text-on-surface-variant hover:text-primary transition-colors" href="/terms">Terms of Service</a>
          <a className="font-body-ui text-sm text-on-surface-variant hover:text-primary transition-colors" href="/privacy">Privacy Policy</a>
          <a className="font-body-ui text-sm font-semibold text-on-surface hover:text-primary transition-colors" href="/support">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}