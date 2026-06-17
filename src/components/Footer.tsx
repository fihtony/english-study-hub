export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface border-t border-outline w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full gap-4">
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
  );
}
