import { TrendingDown } from 'lucide-react'

export default function DrawdownWidget({ drawdown }) {
  const { dollar, percent } = drawdown

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          Max. Drawdown
        </span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
          <TrendingDown size={16} style={{ color: '#ef4444' }} />
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: dollar > 0 ? '#ef4444' : 'var(--color-text-muted)' }}>
        -{dollar.toLocaleString('de-DE', { minimumFractionDigits: 2 })} $
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
        {percent.toFixed(1)}% vom Peak
      </p>
    </div>
  )
}
