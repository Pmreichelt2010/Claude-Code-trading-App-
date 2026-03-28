import { createContext, useContext, useState, useEffect } from 'react'
import { get, set } from '../utils/localStorage'
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../constants'

const ThemeContext = createContext(null)

function applyTheme(theme) {
  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.primaryColor)
  root.style.setProperty('--color-accent', theme.accentColor)
  root.style.setProperty('--color-bg', theme.bgColor)
  root.style.setProperty('--color-text', theme.textColor)
}

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    return get(STORAGE_KEYS.SETTINGS) || DEFAULT_SETTINGS
  })

  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  useEffect(() => {
    set(STORAGE_KEYS.SETTINGS, settings)
  }, [settings])

  function updateTheme(newTheme) {
    setSettings(prev => ({ ...prev, theme: { ...prev.theme, ...newTheme } }))
  }

  function updateWinRateZiel(value) {
    setSettings(prev => ({ ...prev, winRateZiel: value }))
  }

  function resetTheme() {
    setSettings(prev => ({ ...prev, theme: DEFAULT_SETTINGS.theme }))
  }

  return (
    <ThemeContext.Provider value={{ settings, updateTheme, updateWinRateZiel, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
