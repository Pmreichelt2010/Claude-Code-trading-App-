import { useTheme } from '../context/ThemeContext'
import { useTrades } from '../context/TradesContext'
import { DEFAULT_SETTINGS } from '../constants'
import ColorPicker from '../components/ui/ColorPicker'
import Button from '../components/ui/Button'
import { exportTradesToCsv } from '../utils/csvExport'
import { Download, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'

function Section({ title, children }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
    >
      <h3 className="text-sm font-semibold mb-4 m-0" style={{ color: 'var(--color-text)' }}>{title}</h3>
      {children}
    </div>
  )
}

export default function Einstellungen() {
  const { settings, updateTheme, resetTheme, updateWinRateZiel } = useTheme()
  const { trades } = useTrades()
  const [confirmClear, setConfirmClear] = useState(false)
  const { theme } = settings

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      {/* Farbthema */}
      <Section title="Farbthema">
        <ColorPicker
          label="Primärfarbe"
          value={theme.primaryColor}
          onChange={v => updateTheme({ primaryColor: v })}
        />
        <ColorPicker
          label="Akzentfarbe (Gewinne)"
          value={theme.accentColor}
          onChange={v => updateTheme({ accentColor: v })}
        />
        <ColorPicker
          label="Hintergrundfarbe"
          value={theme.bgColor}
          onChange={v => updateTheme({ bgColor: v })}
        />
        <ColorPicker
          label="Textfarbe"
          value={theme.textColor}
          onChange={v => updateTheme({ textColor: v })}
        />
        <div className="mt-4">
          <Button variant="secondary" onClick={resetTheme}>
            <RotateCcw size={14} />
            Standard wiederherstellen
          </Button>
        </div>
      </Section>

      {/* Win-Rate Ziel */}
      <Section title="Win-Rate Ziel">
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={0}
            max={100}
            value={settings.winRateZiel}
            onChange={e => updateWinRateZiel(parseInt(e.target.value) || 0)}
            className="w-24 px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          />
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>% angestrebte Trefferquote</span>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
          Dieser Wert wird im Dashboard und auf der Statistiken-Seite als Vergleich angezeigt.
        </p>
      </Section>

      {/* Daten */}
      <Section title="Daten">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>CSV-Export</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                {trades.length} {trades.length === 1 ? 'Trade' : 'Trades'} exportieren
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => exportTradesToCsv(trades)}
              disabled={!trades.length}
            >
              <Download size={14} />
              Exportieren
            </Button>
          </div>

          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <div>
              <p className="text-sm font-medium text-red-400">Alle Daten löschen</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                Nicht rückgängig machbar
              </p>
            </div>
            {confirmClear ? (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>Nein</Button>
                <Button variant="danger" size="sm" onClick={() => {
                  localStorage.removeItem('tj_trades')
                  window.location.reload()
                }}>
                  Ja, löschen
                </Button>
              </div>
            ) : (
              <Button variant="danger" onClick={() => setConfirmClear(true)}>
                <Trash2 size={14} />
                Löschen
              </Button>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
