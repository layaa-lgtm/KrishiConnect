import { ArrowRight, CheckCircle2, Clock3, Copy, MapPinned, Navigation, Route as RouteIcon, Truck, Share2 } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { api } from '../services/api'
const stops = [
{ key: 'FPO', label: 'FPO Centre', detail: 'Origin', x: '18%', y: '64%' },
{ key: 'B', label: 'Wholesaler B', detail: '800 kg potato', x: '42%', y: '28%' },
{ key: 'A', label: 'Restaurant A', detail: '500 kg tomato', x: '66%', y: '42%' },
{ key: 'C', label: 'Retailer C', detail: '250 kg carrot', x: '78%', y: '70%' },
]
export default function Logistics() {
const [optimised, setOptimised] = useState(false)
const [shareOpen, setShareOpen] = useState(false)
const [track, setTrack] = useState(null)
const [toast, setToast] = useState('')
const [loading, setLoading] = useState(false)
const handleOptimise = async () => {
setLoading(true)
try { await api.optimizeRoute({ origin: 'FPO Centre', stops: ['Restaurant A', 'Wholesaler B', 'Retailer C'] }); setOptimised(true); setToast('Route optimised. Stop sequence is ready for the logistics partner.') }
finally { setLoading(false); setTimeout(() => setToast(''), 3000) }
}
const share = async () => { setShareOpen(false); setToast('Route handoff copied. Share this sequence with the logistics provider.'); try { await navigator.clipboard?.writeText('FPO Centre → Wholesaler B → Restaurant A → Retailer C') } catch {} setTimeout(() => setToast(''), 3000) }
return <div className="mx-auto max-w-7xl space-y-6">
  <PageHeader eyebrow="Delivery planning" title="Logistics" description="Recommend the best delivery sequence. The logistics provider handles the vehicle, roads and navigation." action={<button type="button" onClick={handleOptimise} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-70">
    <Navigation size={17} /> {loading ? 'Optimising...' : optimised ? 'Route optimised' : 'Optimise route'}</button>} />
  <div className="grid gap-6 lg:grid-cols-3">
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
      <div className="border-b border-slate-100 p-4">
        <div className="flex items-center gap-2">
          <MapPinned size={18} className="text-emerald-700" />
          <div>
            <h2 className="font-bold text-slate-900">
              Today's delivery map
            </h2>
          <p className="text-xs text-slate-500">3 destinations · FPO departure · {optimised ? 'Optimised route' : 'Suggested route'}</p>
        </div>
    </div>
</div>
<div className="relative h-[420px] overflow-hidden bg-emerald-50 grid-map">
  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polyline points="18,64 42,28 66,42 78,70" fill="none" stroke={optimised ? '#166534' : '#86efac'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={optimised ? '0' : '3 3'} />
    <polyline points="18,64 42,28 66,42 78,70" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".22" />
  </svg>{stops.map((stop, index) => <div key={stop.key} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: stop.x, top: stop.y }}>
  <div className={`route-dot relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-700 text-xs font-bold text-white ${index === 0 ? 'ring-4 ring-emerald-200' : ''}`}>{index}</div>
  <div className="mt-2 min-w-32 -translate-x-1/4 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-2 text-left shadow-sm backdrop-blur">
    <p className="text-[11px] font-bold text-slate-800">{stop.label}</p>
    <p className="mt-0.5 text-[10px] text-slate-500">{stop.detail}</p>
  </div>
</div>)}</div>
</section>
<aside className="space-y-4">
  <div className="rounded-2xl bg-emerald-950 p-5 text-white shadow-sm">
    <p className="text-xs font-semibold text-emerald-200">
      AI recommended sequence
    </p>
  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-bold">
    <span>
      FPO
    </span>
  <ArrowRight size={15} />
  <span>B</span>
  <ArrowRight size={15} />
  <span>A</span>
  <ArrowRight size={15} />
  <span>C</span>
</div>
<div className="mt-5 grid grid-cols-2 gap-3">
  <div className="rounded-xl bg-white/10 p-3">
    <p className="text-[11px] text-emerald-200">
      Distance
    </p>
  <p className="mt-1 text-lg font-bold">
    42 km
  </p>
</div>
<div className="rounded-xl bg-white/10 p-3">
  <p className="text-[11px] text-emerald-200">
    Travel time
  </p>
<p className="mt-1 text-lg font-bold">
  1h 18m
</p>
</div>
</div>
<div className="mt-4 rounded-xl bg-amber-400/20 p-3 text-xs text-amber-100">
  Saves 8.4 km and ~17 minutes vs the current sequence.
</div>
<div className="mt-4 grid grid-cols-2 gap-2">
  <button type="button" onClick={() => setShareOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-bold text-emerald-950 hover:bg-emerald-50">
    <Share2 size={14} />
    Share route
  </button>
<button type="button" onClick={() => setTrack('DL-10482')} className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-emerald-800 px-3 py-2.5 text-xs font-bold text-white hover:bg-emerald-700">
  <Truck size={14} />
  Track delivery
</button>
</div>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex items-center gap-2">
    <RouteIcon size={18} className="text-emerald-700" />
    <h2 className="font-bold text-slate-900">
      Stop sequence
    </h2>
</div>
<div className="mt-5 space-y-3">{stops.map((stop, index) => <button type="button" key={stop.key} onClick={() => setTrack(stop.label)} className="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left transition hover:bg-slate-100">
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{index + 1}</div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-slate-800">{stop.label}</p>
      <p className="text-[11px] text-slate-400">{stop.detail}</p>
    </div>{index === 0 && <Truck size={15} className="text-slate-400" />}</button>)}</div>
</div>
<div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
  <div className="flex gap-2 text-sm font-semibold text-emerald-950">
    <CheckCircle2 size={17} />
    Provider handoff ready
  </div>
<p className="mt-1 text-xs leading-5 text-emerald-900">
  Share this stop order with the logistics partner; they can use their own navigation stack.
</p>
</div>
</aside>
</div>
<Modal open={shareOpen} title="Share optimised route" description="The FPO controls the stop sequence; the transport provider controls the actual navigation." onClose={() => setShareOpen(false)} footer={<>
  <button type="button" onClick={() => setShareOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
    Cancel
  </button>
<button type="button" onClick={share} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">
  <Copy size={15} />
  Copy route
</button>
</>}>
<div className="rounded-xl bg-slate-50 p-4">
  <p className="text-xs text-slate-500">
    Route to share
  </p>
<p className="mt-1 text-sm font-bold text-slate-900">
  FPO Centre → Wholesaler B → Restaurant A → Retailer C
</p>
</div>
</Modal>
<Modal open={!!track} title="Delivery tracking" description="Prototype tracking view. Live GPS can be connected later through the logistics partner API." onClose={() => setTrack(null)} footer={<button type="button" onClick={() => setTrack(null)} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
    Close
  </button>}>
<div className="space-y-3">
  <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-3">
    <div>
      <p className="text-xs text-emerald-700">
        Selected stop
      </p>
    <p className="font-bold text-emerald-950">{track}</p>
  </div>
<span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
  In transit
</span>
</div>
<div className="flex items-center gap-2 text-sm text-slate-600">
  <Clock3 size={15} />
  ETA 3:42 PM
</div>
<p className="text-xs leading-5 text-slate-500">
  The provider manages the vehicle and road navigation. This dashboard shows the handoff status and recommended sequence.
</p>
</div>
</Modal>
<Toast message={toast} onClose={() => setToast('')} />
</div>
}
