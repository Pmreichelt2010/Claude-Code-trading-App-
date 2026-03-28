export default function Badge({ children, variant = 'default' }) {
  const variants = {
    win: { background: 'rgba(16,185,129,0.15)', color: '#10b981' },
    loss: { background: 'rgba(239,68,68,0.15)', color: '#ef4444' },
    long: { background: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
    short: { background: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
    sp500: { background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
    nasdaq: { background: 'rgba(6,182,212,0.15)', color: '#06b6d4' },
    default: { background: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
  }

  const style = variants[variant] || variants.default

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
      style={style}
    >
      {children}
    </span>
  )
}
