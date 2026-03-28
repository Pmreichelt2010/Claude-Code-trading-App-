import { useTheme } from '../../context/ThemeContext'

export default function WinRateSlider() {
  const { settings, updateWinRateZiel } = useTheme()
  const ziel = settings.winRateZiel

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          Mein Win-Rate Ziel
        </label>
        <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{ziel}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={ziel}
        onChange={e => updateWinRateZiel(parseInt(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: 'var(--color-primary)' }}
      />
      <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )
}
