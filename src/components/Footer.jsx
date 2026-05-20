import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 bottom-0">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-container-max mx-auto w-full space-y-4 md:space-y-0">
        {/* stitch_node_id: copyright-001 */}
        <div className="font-body-ui text-xs text-slate-500">
          © 2024 Linguist Library. Premium Academic English Study.
        </div>
        <div className="flex space-x-6">
          {/* stitch_node_id: terms-link-001 */}
          <a className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Terms of Service</a>
          {/* stitch_node_id: privacy-link-001 */}
          <a className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors" href="#">Privacy Policy</a>
          {/* stitch_node_id: contact-link-001 */}
          <a className="font-body-ui text-xs text-slate-500 hover:text-blue-900 transition-colors font-semibold text-slate-900" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  )
}