export function ArrowForwardIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
        fill="currentColor"
      />
    </svg>
  )
}
