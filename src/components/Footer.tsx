import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface border-t border-outline-variant bottom-0 w-full" data-testid="footer">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <p className="font-['Work_Sans'] text-xs text-on-surface-variant">© {currentYear} Linguist Library. Premium Academic English Study.</p>
        <div className="flex gap-6">
          <a className="font-['Work_Sans'] text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-['Work_Sans'] text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-['Work_Sans'] text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
