// Inline SVG icon for arrow_forward (Material Symbols Outlined style)
export function ArrowForwardIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block text-sm ${className}`.trim()}
    >
      <path 
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" 
        fill="currentColor"
      />
    </svg>
  )
}
