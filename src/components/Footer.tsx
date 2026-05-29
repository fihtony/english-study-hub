export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-outline-variant bottom-0 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </p>
        <div className="flex gap-6">
          <a role="link" aria-disabled="true" className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            Terms of Service
          </a>
          <a role="link" aria-disabled="true" className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            Privacy Policy
          </a>
          <a role="link" aria-disabled="true" className="font-body-ui text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}