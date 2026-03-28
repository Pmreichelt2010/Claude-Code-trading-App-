export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled, className = '' }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all cursor-pointer border-0 outline-none'

  const variants = {
    primary: 'text-white hover:opacity-90 active:scale-95',
    secondary: 'bg-transparent border text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:border-[color:var(--color-text-muted)]',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20',
    ghost: 'bg-transparent text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  const primaryStyle = variant === 'primary'
    ? { backgroundColor: 'var(--color-primary)' }
    : variant === 'secondary'
    ? { borderColor: 'var(--color-border)' }
    : {}

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={primaryStyle}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
