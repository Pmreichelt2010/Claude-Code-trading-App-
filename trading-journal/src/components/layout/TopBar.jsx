import { Plus } from 'lucide-react'
import Button from '../ui/Button'

export default function TopBar({ title, onAddTrade }) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
      style={{
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <h1 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>{title}</h1>
      <Button onClick={onAddTrade} size="sm">
        <Plus size={16} />
        Trade hinzufügen
      </Button>
    </header>
  )
}
