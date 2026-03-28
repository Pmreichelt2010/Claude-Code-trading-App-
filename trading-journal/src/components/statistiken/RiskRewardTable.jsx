import { calcRiskReward } from '../../utils/calculations'
import Badge from '../ui/Badge'

export default function RiskRewardTable({ trades }) {
  const tradesWithRR = trades.filter(t => t.riskAmount > 0)

  if (!tradesWithRR.length) {
    return (
      <p className="text-sm py-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
        Kein Risiko-Betrag erfasst. Füge einen Risiko-Betrag zu deinen Trades hinzu.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
            {['Datum', 'Instrument', 'Richtung', 'P&L', 'Risiko', 'R/R'].map(h => (
              <th key={h} className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tradesWithRR.map(t => {
            const rr = calcRiskReward(t)
            const dt = new Date(t.datetime)
            return (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="px-3 py-2" style={{ color: 'var(--color-text-muted)' }}>
                  {dt.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                </td>
                <td className="px-3 py-2">
                  <Badge variant={t.instrument === 'SP500' ? 'sp500' : 'nasdaq'}>
                    {t.instrument === 'SP500' ? 'S&P 500' : 'NASDAQ'}
                  </Badge>
                </td>
                <td className="px-3 py-2">
                  <Badge variant={t.direction === 'LONG' ? 'long' : 'short'}>{t.direction}</Badge>
                </td>
                <td className="px-3 py-2 font-medium" style={{ color: t.pnl >= 0 ? '#10b981' : '#ef4444' }}>
                  {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)} $
                </td>
                <td className="px-3 py-2" style={{ color: 'var(--color-text-muted)' }}>
                  {t.riskAmount.toFixed(2)} $
                </td>
                <td className="px-3 py-2 font-semibold" style={{ color: 'var(--color-text)' }}>
                  {rr !== null ? `${rr.toFixed(2)}R` : '—'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
