const navLinks = [
  { label: "Lessons", href: "#", isActive: true },
  { label: "Flashcards", href: "#", isActive: false },
  { label: "Progress", href: "#", isActive: false },
  { label: "Library", href: "#", isActive: false }
]

export default function TopNavBar() {
  return (
    <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4 max-w-container-max mx-auto w-full">
        <span className="text-xl font-bold tracking-tighter text-blue-900 font-h1">Linguist Library</span>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-body-ui text-sm font-medium tracking-tight transition-colors duration-200 cursor-pointer active:opacity-80 ${
                link.isActive
                  ? "text-secondary border-b-2 border-secondary pb-1"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="font-body-ui text-sm font-medium tracking-tight text-on-surface-variant hover:text-secondary transition-colors duration-200 cursor-pointer active:opacity-80">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}