import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="bg-surface-container-low border-t border-outline bottom-0">
      <div class="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-[1120px] mx-auto w-full space-y-4 md:space-y-0">
        <div class="font-body-ui text-xs text-on-surface-variant">
          © {currentYear} Linguist Library. Premium Academic English Study.
        </div>
        <div class="flex space-x-6">
          <a class="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
          <a class="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a class="font-body-ui text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold text-on-surface" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  )
}