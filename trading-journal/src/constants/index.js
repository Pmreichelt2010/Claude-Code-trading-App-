export const INSTRUMENTS = [
  { value: 'SP500', label: 'S&P 500' },
  { value: 'NASDAQ', label: 'NASDAQ' },
]

export const DIRECTIONS = [
  { value: 'LONG', label: 'Long' },
  { value: 'SHORT', label: 'Short' },
]

export const STORAGE_KEYS = {
  TRADES: 'tj_trades',
  SETTINGS: 'tj_settings',
}

export const DEFAULT_THEME = {
  primaryColor: '#3b82f6',
  accentColor: '#10b981',
  bgColor: '#0f172a',
  textColor: '#f1f5f9',
}

export const DEFAULT_SETTINGS = {
  winRateZiel: 60,
  theme: DEFAULT_THEME,
}
