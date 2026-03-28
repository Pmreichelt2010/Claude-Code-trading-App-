import Badge from '../ui/Badge'

function pnlColor(pnl) {
  if (pnl > 0) return '#10b981'
  if (pnl < 0) return '#ef4444'
  return 'var(--color-text-muted)'
}

export default function RecentTrades({ trades }) {
  if (!trades.length) return null

  return (
    <div
      className="rounded-xl"
      style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
    >
      <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Letzte Trades</h3>
      </div>
      <div className="divide-y" style={{ '--tw-divide-opacity': 1 }}>
        {trades.map(t => {
          const dt = new Date(t.datetime)
          const date = dt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
          return (
            <div key={t.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xs w-10" style={{ color: 'var(--color-text-muted)' }}>{date}</span>
                <Badge variant={t.instrument === 'SP500' ? 'sp500' : 'nasdaq'}>
                  {t.instrument === 'SP500' ? 'S&P' : 'NDX'}
                </Badge>
                <Badge variant={t.direction === 'LONG' ? 'long' : 'short'}>{t.direction}</Badge>
              </div>
              <span className="text-sm font-medium" style={{ color: pnlColor(t.pnl) }}>
                {t.pnl >= 0 ? '+' : ''}{t.pnl?.toLocaleString('de-DE', { minimumFractionDigits: 2 })} $
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
