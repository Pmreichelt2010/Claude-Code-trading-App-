import { useTrades } from '../context/TradesContext'
import { useTheme } from '../context/ThemeContext'
import {
  calcWinRate, calcAvgWin, calcAvgLoss, calcProfitFactor,
  calcTotalPnl, calcMaxDrawdown, calcStreak
} from '../utils/calculations'
import StatCard from '../components/dashboard/StatCard'
import StreakBadge from '../components/dashboard/StreakBadge'
import DrawdownWidget from '../components/dashboard/DrawdownWidget'
import RecentTrades from '../components/dashboard/RecentTrades'
import { TrendingUp, TrendingDown, Target, Activity, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const { trades } = useTrades()
  const { settings } = useTheme()

  const winRate = calcWinRate(trades)
  const avgWin = calcAvgWin(trades)
  const avgLoss = calcAvgLoss(trades)
  const pf = calcProfitFactor(trades)
  const totalPnl = calcTotalPnl(trades)
  const drawdown = calcMaxDrawdown(trades)
  const streak = calcStreak(trades)
  const recent = trades.slice(0, 5)

  const fmt = (v, decimals = 2) =>
    v.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  if (!trades.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <TrendingUp size={64} style={{ color: 'var(--color-text-muted)', opacity: 0.2 }} />
        <h2 className="text-xl font-semibold m-0" style={{ color: 'var(--color-text)' }}>Willkommen im Trading Journal</h2>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Klicke auf „Trade hinzufügen" um deinen ersten Trade zu erfassen.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Streak */}
      <StreakBadge streak={streak} />

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          label="Gesamt P&L"
          value={`${totalPnl >= 0 ? '+' : ''}${fmt(totalPnl)} $`}
          color={totalPnl >= 0 ? '#10b981' : '#ef4444'}
          icon={DollarSign}
        />
        <StatCard
          label="Win-Rate"
          value={`${fmt(winRate, 1)}%`}
          sub={`Ziel: ${settings.winRateZiel}%`}
          color={winRate >= settings.winRateZiel ? '#10b981' : '#f59e0b'}
          icon={Target}
        />
        <StatCard
          label="Ø Gewinn"
          value={`+${fmt(avgWin)} $`}
          color="#10b981"
          icon={TrendingUp}
        />
        <StatCard
          label="Ø Verlust"
          value={`${fmt(avgLoss)} $`}
          color="#ef4444"
          icon={TrendingDown}
        />
        <StatCard
          label="Profit Factor"
          value={isFinite(pf) ? fmt(pf) : '∞'}
          sub={pf >= 1 ? 'Profitabel' : 'Verlustreich'}
          color={pf >= 1 ? '#10b981' : '#ef4444'}
          icon={Activity}
        />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <RecentTrades trades={recent} />
        </div>
        <DrawdownWidget drawdown={drawdown} />
      </div>

      {/* Trade count */}
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        {trades.length} {trades.length === 1 ? 'Trade' : 'Trades'} erfasst
      </p>
    </div>
  )
}
