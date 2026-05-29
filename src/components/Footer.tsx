function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer