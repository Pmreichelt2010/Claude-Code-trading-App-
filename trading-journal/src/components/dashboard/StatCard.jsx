export default function StatCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color || 'var(--color-primary)'}20` }}>
            <Icon size={16} style={{ color: color || 'var(--color-primary)' }} />
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: color || 'var(--color-text)' }}>{value}</p>
        {sub && <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>}
      </div>
    </div>
  )
}
