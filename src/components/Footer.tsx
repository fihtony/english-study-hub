const currentYear = new Date().getFullYear()

const policyLinks = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Contact Support', href: '#' },
]

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-['Work_Sans'] text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>

        <nav className="flex items-center space-x-6" aria-label="Policy navigation">
          {policyLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="font-['Work_Sans'] text-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
