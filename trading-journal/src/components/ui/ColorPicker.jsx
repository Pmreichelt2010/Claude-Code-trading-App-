export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{value}</p>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg border-2"
          style={{ backgroundColor: value, borderColor: 'var(--color-border)' }}
        />
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
        />
      </div>
    </div>
  )
}
