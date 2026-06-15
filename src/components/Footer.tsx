const currentYear = new Date().getFullYear()

const policyLinks = [
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Contact Support', href: '#support' },
]

function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[container-max] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>
        <nav className="flex items-center space-x-6" aria-label="Footer policy links">
          {policyLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors"
              aria-label={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer