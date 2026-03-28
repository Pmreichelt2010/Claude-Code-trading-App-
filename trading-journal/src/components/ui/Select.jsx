export default function Select({ label, error, options = [], className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 rounded-lg text-sm outline-none transition-all cursor-pointer ${className}`}
        style={{
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          border: `1px solid ${error ? '#ef4444' : 'var(--color-border)'}`,
        }}
        onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
        onBlur={e => e.target.style.borderColor = error ? '#ef4444' : 'var(--color-border)'}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
