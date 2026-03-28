import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import { groupByDay } from '../../utils/calculations'

export default function PnlBarChart({ trades }) {
  const data = groupByDay(trades)

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48" style={{ color: 'var(--color-text-muted)' }}>
        Noch keine Daten
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
          tickFormatter={d => {
            const [, m, day] = d.split('-')
            return `${day}.${m}`
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `${v}$`}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--color-sidebar)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text)',
          }}
          formatter={(value) => [`${value.toFixed(2)} $`, 'P&L']}
          labelFormatter={label => {
            const [y, m, d] = label.split('-')
            return `${d}.${m}.${y}`
          }}
        />
        <ReferenceLine y={0} stroke="var(--color-border)" />
        <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
