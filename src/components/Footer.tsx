const footerLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact Support", href: "#" }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 border-t border-gray-200 bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-body-ui text-xs text-slate-500">© {year} Linguist Library. Premium Academic English Study.</p>
        <div className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}