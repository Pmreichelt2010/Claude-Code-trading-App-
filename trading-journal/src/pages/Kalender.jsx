import { useTrades } from '../context/TradesContext'
import TradeKalender from '../components/kalender/TradeKalender'

export default function Kalender() {
  const { trades } = useTrades()

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
    >
      <TradeKalender trades={trades} />
    </div>
  )
}
