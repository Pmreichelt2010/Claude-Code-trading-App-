export function exportTradesToCsv(trades) {
  const headers = ['Datum', 'Uhrzeit', 'Instrument', 'Richtung', 'Einstieg', 'Ausstieg', 'PnL', 'Notizen']
  const rows = trades.map(t => {
    const dt = new Date(t.datetime)
    const date = dt.toLocaleDateString('de-DE')
    const time = dt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    return [
      date,
      time,
      t.instrument,
      t.direction,
      t.entryPrice,
      t.exitPrice,
      t.pnl.toFixed(2),
      `"${(t.notes || '').replace(/"/g, '""')}"`,
    ].join(';')
  })
  const csv = [headers.join(';'), ...rows].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `trading-journal-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
