export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-gray-200 full-width bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="font-body-ui text-body-ui text-on-surface-variant">
          © {year} Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          <a className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-ui text-body-ui text-on-surface-variant hover:text-primary transition-colors font-semibold" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}