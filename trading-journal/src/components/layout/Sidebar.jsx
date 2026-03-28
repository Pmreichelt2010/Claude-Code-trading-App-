import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListOrdered, BarChart2, CalendarDays, Settings } from 'lucide-react'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trades', label: 'Trades', icon: ListOrdered },
  { to: '/statistiken', label: 'Statistiken', icon: BarChart2 },
  { to: '/kalender', label: 'Kalender', icon: CalendarDays },
  { to: '/einstellungen', label: 'Einstellungen', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-56 flex flex-col z-40"
      style={{ background: 'var(--color-sidebar)', borderRight: '1px solid var(--color-border)' }}
    >
      {/* Logo */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-primary)' }}>
            TJ
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Trading Journal</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all no-underline ${
                isActive
                  ? 'text-white'
                  : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) => isActive
              ? { background: 'var(--color-primary)', color: '#fff' }
              : { color: 'var(--color-text-muted)' }
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>S&P 500 · NASDAQ</p>
      </div>
    </aside>
  )
}
