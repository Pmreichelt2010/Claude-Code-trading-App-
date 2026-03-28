import { useTrades } from '../context/TradesContext'
import { useTheme } from '../context/ThemeContext'
import {
  calcWinRate, calcAvgWin, calcAvgLoss, calcProfitFactor, calcTotalPnl
} from '../utils/calculations'
import WinLossPieChart from '../components/statistiken/WinLossPieChart'
import PnlBarChart from '../components/statistiken/PnlBarChart'
import WinRateSlider from '../components/statistiken/WinRateSlider'
import RiskRewardTable from '../components/statistiken/RiskRewardTable'

function Card({ title, children }) {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
      <h3 className="text-sm font-semibold mb-4 m-0" style={{ color: 'var(--color-text)' }}>{title}</h3>
      {children}
    </div>
  )
}

export default function Statistiken() {
  const { trades } = useTrades()
  const { settings } = useTheme()

  const winRate = calcWinRate(trades)
  const avgWin = calcAvgWin(trades)
  const avgLoss = calcAvgLoss(trades)
  const pf = calcProfitFactor(trades)
  const total = calcTotalPnl(trades)
  const wins = trades.filter(t => t.pnl > 0).length
  const losses = trades.filter(t => t.pnl < 0).length

  const fmt = (v, d = 2) => v.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d })

  return (
    <div className="flex flex-col gap-5">
      {/* Win-Rate Ziel */}
      <Card title="Win-Rate Ziel">
        <WinRateSlider />
        {trades.length > 0 && (
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 rounded-lg p-3" style={{ background: 'var(--color-bg)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Ziel</p>
              <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{settings.winRateZiel}%</p>
            </div>
            <div className="text-2xl font-light" style={{ color: 'var(--color-text-muted)' }}>vs.</div>
            <div className="flex-1 rounded-lg p-3" style={{ background: 'var(--color-bg)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Aktuell</p>
              <p className="text-xl font-bold" style={{ color: winRate >= settings.winRateZiel ? '#10b981' : '#ef4444' }}>
                {fmt(winRate, 1)}%
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Gewinn / Verlust Verteilung">
          <WinLossPieChart trades={trades} />
          {trades.length > 0 && (
            <div className="flex justify-around mt-2 text-sm">
              <span style={{ color: '#10b981' }}>{wins} Gewinne</span>
              <span style={{ color: '#ef4444' }}>{losses} Verluste</span>
            </div>
          )}
        </Card>
        <Card title="P&L pro Tag">
          <PnlBarChart trades={trades} />
        </Card>
      </div>

      {/* Kennzahlen */}
      <Card title="Kennzahlen">
        {!trades.length ? (
          <p className="text-sm text-center py-4" style={{ color: 'var(--color-text-muted)' }}>Noch keine Daten</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Gesamt P&L', value: `${total >= 0 ? '+' : ''}${fmt(total)} $`, color: total >= 0 ? '#10b981' : '#ef4444' },
              { label: 'Ø Gewinn', value: `+${fmt(avgWin)} $`, color: '#10b981' },
              { label: 'Ø Verlust', value: `${fmt(avgLoss)} $`, color: '#ef4444' },
              { label: 'Profit Factor', value: isFinite(pf) ? fmt(pf) : '∞', color: pf >= 1 ? '#10b981' : '#ef4444' },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-lg p-3 text-center" style={{ background: 'var(--color-bg)' }}>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                <p className="text-lg font-bold" style={{ color }}>{value}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* R/R Table */}
      <Card title="Risk / Reward Übersicht">
        <RiskRewardTable trades={trades} />
      </Card>
    </div>
  )
}
