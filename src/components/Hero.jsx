import React from 'react'

export default function Hero() {
  return (
    <div className="max-w-container-max w-full text-center space-y-stack-lg">
      {/* stitch_node_id: headline-001 */}
      <h1 className="font-h1 text-h1 text-primary max-w-3xl mx-auto">
        Master Academic English with Scholarly Precision.
      </h1>
      {/* stitch_node_id: cta-btn-001 */}
      <div className="flex justify-center pt-stack-sm">
        <button className="bg-on-tertiary-container text-on-tertiary font-button text-button px-stack-lg py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
          Start Learning Now
        </button>
      </div>
      {/* stitch_node_id: category-links-001 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-gutter pt-stack-lg">
        {/* stitch_node_id: category-grammar-001 */}
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Advanced Grammar</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
        {/* stitch_node_id: category-research-001 */}
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Research Writing</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
        <div className="hidden md:block w-px h-4 bg-outline-variant"></div>
        {/* stitch_node_id: category-vocabulary-001 */}
        <a className="group flex items-center space-x-2 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer" href="#">
          <span className="font-label-caps text-label-caps uppercase tracking-widest">Formal Vocabulary</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>
  )
}