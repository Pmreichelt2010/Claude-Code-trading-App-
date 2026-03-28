import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { INSTRUMENTS, DIRECTIONS } from '../../constants'
import { calcPnl } from '../../utils/calculations'

const now = () => {
  const d = new Date()
  return d.toISOString().slice(0, 16)
}

export default function TradeForm({ onSubmit, onCancel, defaultValues }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      datetime: now(),
      instrument: 'SP500',
      direction: 'LONG',
      entryPrice: '',
      exitPrice: '',
      pnl: '',
      pnlManual: false,
      riskAmount: '',
      notes: '',
    },
  })

  const direction = watch('direction')
  const entryPrice = watch('entryPrice')
  const exitPrice = watch('exitPrice')
  const pnlManual = watch('pnlManual')

  useEffect(() => {
    if (!pnlManual && entryPrice && exitPrice) {
      const pnl = calcPnl(direction, parseFloat(entryPrice), parseFloat(exitPrice))
      setValue('pnl', pnl.toFixed(2))
    }
  }, [direction, entryPrice, exitPrice, pnlManual, setValue])

  function handleFormSubmit(data) {
    onSubmit({
      ...data,
      entryPrice: parseFloat(data.entryPrice),
      exitPrice: parseFloat(data.exitPrice),
      pnl: parseFloat(data.pnl) || 0,
      riskAmount: data.riskAmount ? parseFloat(data.riskAmount) : null,
      pnlManual: data.pnlManual,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            label="Datum & Uhrzeit"
            type="datetime-local"
            error={errors.datetime?.message}
            {...register('datetime', { required: 'Pflichtfeld' })}
          />
        </div>

        <Select
          label="Instrument"
          options={INSTRUMENTS}
          {...register('instrument')}
        />
        <Select
          label="Richtung"
          options={DIRECTIONS}
          {...register('direction')}
        />

        <Input
          label="Entry-Preis"
          type="number"
          step="0.01"
          placeholder="z.B. 5200.50"
          error={errors.entryPrice?.message}
          {...register('entryPrice', { required: 'Pflichtfeld', min: { value: 0, message: 'Muss positiv sein' } })}
        />
        <Input
          label="Exit-Preis"
          type="number"
          step="0.01"
          placeholder="z.B. 5215.00"
          error={errors.exitPrice?.message}
          {...register('exitPrice', { required: 'Pflichtfeld', min: { value: 0, message: 'Muss positiv sein' } })}
        />
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Input
            label="P&L ($)"
            type="number"
            step="0.01"
            disabled={!pnlManual}
            {...register('pnl')}
          />
        </div>
        <label className="flex items-center gap-2 pb-2 cursor-pointer text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <input type="checkbox" {...register('pnlManual')} className="accent-blue-500" />
          Manuell
        </label>
      </div>

      <Input
        label="Risiko-Betrag ($) (optional)"
        type="number"
        step="0.01"
        placeholder="z.B. 50"
        {...register('riskAmount')}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Notizen</label>
        <textarea
          rows={3}
          placeholder="Begründung, Setup, Beobachtungen..."
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none transition-all"
          style={{
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
          {...register('notes')}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Abbrechen</Button>
        <Button type="submit">Speichern</Button>
      </div>
    </form>
  )
}
