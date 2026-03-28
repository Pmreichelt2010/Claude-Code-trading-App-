import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TradesProvider } from './context/TradesContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Trades from './pages/Trades'
import Statistiken from './pages/Statistiken'
import Kalender from './pages/Kalender'
import Einstellungen from './pages/Einstellungen'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TradesProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trades" element={<Trades />} />
              <Route path="/statistiken" element={<Statistiken />} />
              <Route path="/kalender" element={<Kalender />} />
              <Route path="/einstellungen" element={<Einstellungen />} />
            </Route>
          </Routes>
        </TradesProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
