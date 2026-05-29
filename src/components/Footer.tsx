const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant full-width bottom-0 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </p>
        <div className="flex gap-6">
          <button
            type="button"
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            type="button"
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Contact Support
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer