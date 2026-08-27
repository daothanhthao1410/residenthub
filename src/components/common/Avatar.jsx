export default function Avatar({ initials, size = 'md' }) {
  const sizeStyles = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary font-display font-semibold text-white ${sizeStyles[size]}`}
    >
      {initials}
    </div>
  )
}
