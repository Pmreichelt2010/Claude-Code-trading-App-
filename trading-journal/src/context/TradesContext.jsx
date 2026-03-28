import { createContext, useContext, useState, useEffect } from 'react'
import { get, set } from '../utils/localStorage'
import { STORAGE_KEYS } from '../constants'

const TradesContext = createContext(null)

export function TradesProvider({ children }) {
  const [trades, setTrades] = useState(() => get(STORAGE_KEYS.TRADES) || [])

  useEffect(() => {
    set(STORAGE_KEYS.TRADES, trades)
  }, [trades])

  function addTrade(trade) {
    const newTrade = {
      ...trade,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTrades(prev => [newTrade, ...prev])
  }

  function updateTrade(id, updates) {
    setTrades(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t)
    )
  }

  function deleteTrade(id) {
    setTrades(prev => prev.filter(t => t.id !== id))
  }

  return (
    <TradesContext.Provider value={{ trades, addTrade, updateTrade, deleteTrade }}>
      {children}
    </TradesContext.Provider>
  )
}

export function useTrades() {
  return useContext(TradesContext)
}
