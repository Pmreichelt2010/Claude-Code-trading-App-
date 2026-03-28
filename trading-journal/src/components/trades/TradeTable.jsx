import TradeRow from './TradeRow'
import { TrendingUp } from 'lucide-react'

const headers = ['Datum', 'Instrument', 'Richtung', 'Entry', 'Exit', 'P&L', 'Notizen', '']

export default function TradeTable({ trades }) {
  if (!trades.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <TrendingUp size={48} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Trades erfasst.</p>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}>Klicke auf „Trade hinzufügen" um zu starten.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: 'var(--color-sidebar)', borderBottom: '1px solid var(--color-border)' }}>
            {headers.map(h => (
              <th
                key={h}
                className={`px-4 py-3 text-xs font-medium uppercase tracking-wider ${h === 'Entry' || h === 'Exit' || h === 'P&L' ? 'text-right' : 'text-left'}`}
                style={{ color: 'var(--color-text-muted)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trades.map(trade => (
            <TradeRow key={trade.id} trade={trade} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
