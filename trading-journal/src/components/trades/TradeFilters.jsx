import { INSTRUMENTS, DIRECTIONS } from '../../constants'

export default function TradeFilters({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value })
  }

  const inputStyle = {
    background: 'var(--color-sidebar)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
  }

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <select
        value={filters.instrument}
        onChange={e => set('instrument', e.target.value)}
        className="px-3 py-1.5 rounded-lg text-sm outline-none cursor-pointer"
        style={inputStyle}
      >
        <option value="">Alle Instrumente</option>
        {INSTRUMENTS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
      </select>

      <select
        value={filters.direction}
        onChange={e => set('direction', e.target.value)}
        className="px-3 py-1.5 rounded-lg text-sm outline-none cursor-pointer"
        style={inputStyle}
      >
        <option value="">Alle Richtungen</option>
        {DIRECTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>

      <input
        type="date"
        value={filters.from}
        onChange={e => set('from', e.target.value)}
        className="px-3 py-1.5 rounded-lg text-sm outline-none"
        style={inputStyle}
        title="Von"
      />
      <input
        type="date"
        value={filters.to}
        onChange={e => set('to', e.target.value)}
        className="px-3 py-1.5 rounded-lg text-sm outline-none"
        style={inputStyle}
        title="Bis"
      />
    </div>
  )
}
