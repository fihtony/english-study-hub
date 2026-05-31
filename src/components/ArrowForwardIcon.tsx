interface ArrowForwardIconProps {
  className?: string
}

export default function ArrowForwardIcon({ className = '' }: ArrowForwardIconProps) {
  return (
    <svg
      className={`material-symbols-outlined ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z"
        fill="currentColor"
      />
    </svg>
  )
}