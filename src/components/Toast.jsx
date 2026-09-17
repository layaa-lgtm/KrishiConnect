import { CheckCircle2, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  if (!message) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-[110] w-[min(92vw,380px)] rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <CheckCircle2
          className="mt-0.5 shrink-0 text-emerald-600"
          size={20}
        />

        <p className="flex-1 text-sm font-medium leading-5 text-slate-800">
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="rounded-md p-1 text-slate-400 hover:bg-slate-100"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
