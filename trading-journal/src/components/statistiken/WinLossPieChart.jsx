import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function WinLossPieChart({ trades }) {
  const wins = trades.filter(t => t.pnl > 0).length
  const losses = trades.filter(t => t.pnl < 0).length
  const neutral = trades.filter(t => t.pnl === 0).length

  const data = [
    { name: 'Gewinn', value: wins },
    { name: 'Verlust', value: losses },
    neutral > 0 && { name: 'Neutral', value: neutral },
  ].filter(Boolean)

  const COLORS = ['#10b981', '#ef4444', '#94a3b8']

  if (!trades.length) {
    return (
      <div className="flex items-center justify-center h-48" style={{ color: 'var(--color-text-muted)' }}>
        Noch keine Daten
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'var(--color-sidebar)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text)',
          }}
          formatter={(value, name) => [`${value} Trades`, name]}
        />
        <Legend
          formatter={(value) => <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
