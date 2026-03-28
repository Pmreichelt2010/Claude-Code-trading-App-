import { useState } from 'react'
import { useTrades } from '../context/TradesContext'
import TradeTable from '../components/trades/TradeTable'
import TradeFilters from '../components/trades/TradeFilters'

export default function Trades() {
  const { trades } = useTrades()
  const [filters, setFilters] = useState({ instrument: '', direction: '', from: '', to: '' })

  const filtered = trades.filter(t => {
    if (filters.instrument && t.instrument !== filters.instrument) return false
    if (filters.direction && t.direction !== filters.direction) return false
    if (filters.from && t.datetime.slice(0, 10) < filters.from) return false
    if (filters.to && t.datetime.slice(0, 10) > filters.to) return false
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {filtered.length} von {trades.length} Trades
        </p>
      </div>
      <TradeFilters filters={filters} onChange={setFilters} />
      <TradeTable trades={filtered} />
    </div>
  )
}
