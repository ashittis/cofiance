export function StarLogo({ className = "h-7 w-7" }: { className?: string }) {
  // 4-point sparkle/star mark (matches reference logo)
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c.6 5.7 3.3 8.7 12 12-8.7 3.3-11.4 6.3-12 12-.6-5.7-3.3-8.7-12-12C8.7 8.7 11.4 5.7 12 0Z" />
    </svg>
  );
}
