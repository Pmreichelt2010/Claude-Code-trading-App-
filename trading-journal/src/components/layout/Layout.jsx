import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import TradeModal from '../trades/TradeModal'

const pageTitles = {
  '/': 'Dashboard',
  '/trades': 'Meine Trades',
  '/statistiken': 'Statistiken',
  '/kalender': 'Kalender',
  '/einstellungen': 'Einstellungen',
}

export default function Layout() {
  const [modalOpen, setModalOpen] = useState(false)
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Trading Journal'

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-bg)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '224px' }}>
        <TopBar title={title} onAddTrade={() => setModalOpen(true)} />
        <main className="flex-1 p-6">
          <Outlet context={{ openAddTrade: () => setModalOpen(true) }} />
        </main>
      </div>
      <TradeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
