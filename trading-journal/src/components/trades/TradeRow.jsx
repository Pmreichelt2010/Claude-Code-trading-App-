import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Badge from '../ui/Badge'
import TradeModal from './TradeModal'
import { useTrades } from '../../context/TradesContext'

function pnlColor(pnl) {
  if (pnl > 0) return '#10b981'
  if (pnl < 0) return '#ef4444'
  return 'var(--color-text-muted)'
}

export default function TradeRow({ trade }) {
  const [editOpen, setEditOpen] = useState(false)
  const { deleteTrade } = useTrades()

  const dt = new Date(trade.datetime)
  const date = dt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })
  const time = dt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      <tr
        className="transition-colors"
        style={{ borderBottom: '1px solid var(--color-border)' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <td className="px-4 py-3 text-sm whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>
          {date} {time}
        </td>
        <td className="px-4 py-3">
          <Badge variant={trade.instrument === 'SP500' ? 'sp500' : 'nasdaq'}>
            {trade.instrument === 'SP500' ? 'S&P 500' : 'NASDAQ'}
          </Badge>
        </td>
        <td className="px-4 py-3">
          <Badge variant={trade.direction === 'LONG' ? 'long' : 'short'}>
            {trade.direction}
          </Badge>
        </td>
        <td className="px-4 py-3 text-sm text-right" style={{ color: 'var(--color-text-muted)' }}>
          {trade.entryPrice?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
        </td>
        <td className="px-4 py-3 text-sm text-right" style={{ color: 'var(--color-text-muted)' }}>
          {trade.exitPrice?.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
        </td>
        <td className="px-4 py-3 text-sm text-right font-medium" style={{ color: pnlColor(trade.pnl) }}>
          {trade.pnl >= 0 ? '+' : ''}{trade.pnl?.toLocaleString('de-DE', { minimumFractionDigits: 2 })} $
        </td>
        <td className="px-4 py-3 text-sm max-w-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
          {trade.notes || '—'}
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditOpen(true)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border-0 bg-transparent"
              style={{ color: 'var(--color-text-muted)' }}
              title="Bearbeiten"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => deleteTrade(trade.id)}
              className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer border-0 bg-transparent text-red-400"
              title="Löschen"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      </tr>
      <TradeModal open={editOpen} onClose={() => setEditOpen(false)} trade={trade} />
    </>
  )
}
