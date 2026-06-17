export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-low border-t border-outline full-width bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </p>
        <div className="flex gap-6">
          <a
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}
