import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  let d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1 // Monday = 0
}

function buildDayMap(trades, year, month) {
  const map = {}
  for (const t of trades) {
    const dt = new Date(t.datetime)
    if (dt.getFullYear() === year && dt.getMonth() === month) {
      const d = dt.getDate()
      if (!map[d]) map[d] = { pnl: 0, count: 0, trades: [] }
      map[d].pnl += t.pnl
      map[d].count++
      map[d].trades.push(t)
    }
  }
  return map
}

export default function TradeKalender({ trades }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState(null)

  const dayMap = buildDayMap(trades, year, month)
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
    setSelected(null)
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
    setSelected(null)
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/10 cursor-pointer border-0 bg-transparent" style={{ color: 'var(--color-text-muted)' }}>
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-base font-semibold m-0" style={{ color: 'var(--color-text)' }}>
          {MONTHS[month]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/10 cursor-pointer border-0 bg-transparent" style={{ color: 'var(--color-text-muted)' }}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-center text-xs py-2 font-medium" style={{ color: 'var(--color-text-muted)' }}>{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />
          const data = dayMap[day]
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
          const isSelected = selected === day
          let bg = 'transparent'
          let textColor = 'var(--color-text-muted)'
          if (data) {
            bg = data.pnl >= 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'
            textColor = data.pnl >= 0 ? '#10b981' : '#ef4444'
          }

          return (
            <button
              key={day}
              onClick={() => setSelected(isSelected ? null : day)}
              className="rounded-lg p-1 flex flex-col items-center gap-0.5 transition-all cursor-pointer border-0 min-h-[52px]"
              style={{
                background: isSelected ? (data?.pnl >= 0 ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)') : bg,
                border: isToday ? '2px solid var(--color-primary)' : '2px solid transparent',
              }}
            >
              <span className="text-xs font-medium" style={{ color: isToday ? 'var(--color-primary)' : 'var(--color-text)' }}>
                {day}
              </span>
              {data && (
                <span className="text-xs font-semibold" style={{ color: textColor, fontSize: '10px' }}>
                  {data.pnl >= 0 ? '+' : ''}{data.pnl.toFixed(0)}$
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected day detail */}
      {selected && dayMap[selected] && (
        <div
          className="mt-5 rounded-xl p-4"
          style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
            {selected}. {MONTHS[month]} {year} — {dayMap[selected].count} {dayMap[selected].count === 1 ? 'Trade' : 'Trades'}
          </p>
          <div className="flex flex-col gap-2">
            {dayMap[selected].trades.map(t => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <span style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(t.datetime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} · {t.instrument} · {t.direction}
                </span>
                <span style={{ color: t.pnl >= 0 ? '#10b981' : '#ef4444' }}>
                  {t.pnl >= 0 ? '+' : ''}{t.pnl.toFixed(2)} $
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
