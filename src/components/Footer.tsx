const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 bottom-0 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div className="text-xs text-slate-500">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-blue-900 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-blue-900 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-slate-900 font-semibold hover:text-blue-900 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
