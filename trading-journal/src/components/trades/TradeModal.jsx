import Modal from '../ui/Modal'
import TradeForm from './TradeForm'
import { useTrades } from '../../context/TradesContext'

export default function TradeModal({ open, onClose, trade }) {
  const { addTrade, updateTrade } = useTrades()
  const isEdit = !!trade

  function handleSubmit(data) {
    if (isEdit) {
      updateTrade(trade.id, data)
    } else {
      addTrade(data)
    }
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Trade bearbeiten' : 'Trade hinzufügen'}
      size="md"
    >
      <TradeForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        defaultValues={isEdit ? {
          ...trade,
          datetime: trade.datetime?.slice(0, 16),
        } : undefined}
      />
    </Modal>
  )
}
