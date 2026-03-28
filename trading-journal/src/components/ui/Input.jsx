export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 rounded-lg text-sm outline-none transition-all ${className}`}
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          border: `1px solid ${error ? '#ef4444' : 'var(--color-border)'}`,
        }}
        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
        onBlur={e => e.target.style.borderColor = error ? '#ef4444' : 'var(--color-border)'}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
