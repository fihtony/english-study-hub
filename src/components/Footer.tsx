import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-on-surface-variant">
          © {currentYear} Linguist Library | Premium Academic English Study.
        </div>
        <div className="flex gap-6">
          <Link
            to="/terms"
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            className="text-xs font-semibold text-on-surface hover:text-primary transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
