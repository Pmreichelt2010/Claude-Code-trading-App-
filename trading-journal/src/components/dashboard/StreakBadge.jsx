import { Flame, TrendingDown } from 'lucide-react'

export default function StreakBadge({ streak }) {
  if (!streak || streak.type === 'NONE' || streak.count === 0) return null

  const isWin = streak.type === 'WIN'

  return (
    <div
      className="flex items-center gap-3 rounded-xl px-5 py-4"
      style={{
        background: isWin ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
        border: `1px solid ${isWin ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
      }}
    >
      {isWin
        ? <Flame size={20} style={{ color: '#10b981' }} />
        : <TrendingDown size={20} style={{ color: '#ef4444' }} />
      }
      <div>
        <p className="text-sm font-semibold" style={{ color: isWin ? '#10b981' : '#ef4444' }}>
          {streak.count} {streak.count === 1 ? (isWin ? 'Gewinn' : 'Verlust') : (isWin ? 'Gewinne' : 'Verluste')} in Folge
        </p>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Aktuelle {isWin ? 'Gewinnserie' : 'Verlustserie'}
        </p>
      </div>
    </div>
  )
}
