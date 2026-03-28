export function calcPnl(direction, entry, exit) {
  if (entry == null || exit == null) return 0
  return direction === 'LONG' ? exit - entry : entry - exit
}

export function calcWinRate(trades) {
  if (!trades.length) return 0
  const wins = trades.filter(t => t.pnl > 0).length
  return (wins / trades.length) * 100
}

export function calcAvgWin(trades) {
  const wins = trades.filter(t => t.pnl > 0)
  if (!wins.length) return 0
  return wins.reduce((s, t) => s + t.pnl, 0) / wins.length
}

export function calcAvgLoss(trades) {
  const losses = trades.filter(t => t.pnl < 0)
  if (!losses.length) return 0
  return losses.reduce((s, t) => s + t.pnl, 0) / losses.length
}

export function calcProfitFactor(trades) {
  const grossProfit = trades.filter(t => t.pnl > 0).reduce((s, t) => s + t.pnl, 0)
  const grossLoss = Math.abs(trades.filter(t => t.pnl < 0).reduce((s, t) => s + t.pnl, 0))
  if (!grossLoss) return grossProfit > 0 ? Infinity : 0
  return grossProfit / grossLoss
}

export function calcTotalPnl(trades) {
  return trades.reduce((s, t) => s + t.pnl, 0)
}

export function calcMaxDrawdown(trades) {
  if (!trades.length) return { dollar: 0, percent: 0 }
  const sorted = [...trades].sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
  let peak = 0
  let equity = 0
  let maxDD = 0
  for (const t of sorted) {
    equity += t.pnl
    if (equity > peak) peak = equity
    const dd = peak - equity
    if (dd > maxDD) maxDD = dd
  }
  const percent = peak > 0 ? (maxDD / peak) * 100 : 0
  return { dollar: maxDD, percent }
}

export function calcStreak(trades) {
  if (!trades.length) return { type: 'NONE', count: 0 }
  const sorted = [...trades].sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
  const first = sorted[0]
  const type = first.pnl > 0 ? 'WIN' : first.pnl < 0 ? 'LOSS' : 'NONE'
  if (type === 'NONE') return { type: 'NONE', count: 1 }
  let count = 0
  for (const t of sorted) {
    if ((type === 'WIN' && t.pnl > 0) || (type === 'LOSS' && t.pnl < 0)) {
      count++
    } else {
      break
    }
  }
  return { type, count }
}

export function calcRiskReward(trade) {
  if (!trade.riskAmount || trade.riskAmount <= 0) return null
  return Math.abs(trade.pnl) / trade.riskAmount
}

export function groupByDay(trades) {
  const map = {}
  for (const t of trades) {
    const day = t.datetime.slice(0, 10)
    if (!map[day]) map[day] = 0
    map[day] += t.pnl
  }
  return Object.entries(map)
    .map(([date, pnl]) => ({ date, pnl }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
