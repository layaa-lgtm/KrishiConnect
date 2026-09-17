import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import { forecastData, forecastCards } from '../data/mockData'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
export default function Forecast() {
const [range, setRange] = useState('Next 7 days')
const [planOpen, setPlanOpen] = useState(false)
const [toast, setToast] = useState('')
const planRows = useMemo(() => forecastCards.filter((item) => item.gap > 0), [])
const createPlan = () => {
setPlanOpen(false)
setToast('Procurement plan created for the selected shortages.')
setTimeout(() => setToast(''), 2800)
}
return <div className="mx-auto max-w-7xl space-y-6">
  <PageHeader
  eyebrow="AI intelligence"
  title="Demand Forecast"
  description="Predictions combine historical orders, sales patterns, seasonality and buyer demand to help the FPO procure before shortages happen."
  action={<select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-200">
    <option>
      Next 7 days
    </option>
  <option>
    Next 14 days
  </option>
<option>
  Next 30 days
</option>
</select>}
/>
<div className="grid gap-6 xl:grid-cols-3">
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <BrainCircuit size={20} />
      </div>
    <div>
      <h2 className="font-bold text-slate-900">
        Tomato demand prediction
      </h2>
    <p className="text-xs text-slate-500">Model confidence: 91% · Horizon: {range.toLowerCase()}</p>
  </div>
</div>
<div className="mt-6 h-80">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={forecastData}>
      <XAxis dataKey="day" tickLine={false} axisLine={false} />
      <YAxis tickLine={false} axisLine={false} />
      <Tooltip formatter={(value) => `${Number(value).toLocaleString('en-IN')} kg`} />
        <Area type="monotone" dataKey="actual" stroke="#166534" fill="#dcfce7" strokeWidth={2} connectNulls />
        <Area type="monotone" dataKey="predicted" stroke="#b45309" fill="#fef3c7" strokeWidth={2} strokeDasharray="5 5" />
      </AreaChart>
  </ResponsiveContainer>
</div>
</section>
<section className="rounded-2xl bg-emerald-950 p-6 text-white shadow-sm">
  <p className="text-sm font-semibold text-emerald-200">
    Forecast summary
  </p>
<div className="mt-5 space-y-5">
  <div>
    <p className="text-xs text-emerald-200">
      Expected demand
    </p>
  <p className="mt-1 text-3xl font-bold">
    2,400 kg
  </p>
</div>
<div>
  <p className="text-xs text-emerald-200">
    Current availability
  </p>
<p className="mt-1 text-2xl font-bold">
  1,800 kg
</p>
</div>
<div className="border-t border-white/10 pt-5">
  <p className="text-xs text-amber-200">
    Potential shortage
  </p>
<p className="mt-1 text-2xl font-bold text-amber-200">
  600 kg
</p>
</div>
</div>
<button type="button" onClick={() => setPlanOpen(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-emerald-950 shadow-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/70">Create procurement plan <ArrowRight size={16} />
</button>
</section>
</div>
<section className="grid gap-4 lg:grid-cols-3">{forecastCards.map((item) => <div key={item.product} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{item.emoji}</span>
        <h3 className="font-bold text-slate-900">{item.product}</h3>
      </div>
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${item.risk === 'High' ? 'bg-red-50 text-red-700' : item.risk === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{item.risk} risk</span>
  </div>
<div className="mt-5 grid grid-cols-2 gap-3">
  <div className="rounded-xl bg-slate-50 p-3">
    <p className="text-[11px] text-slate-500">
      Expected demand
    </p>
  <p className="mt-1 font-bold text-slate-900">{item.expected.toLocaleString()} kg</p>
</div>
<div className="rounded-xl bg-slate-50 p-3">
  <p className="text-[11px] text-slate-500">
    Available
  </p>
<p className="mt-1 font-bold text-slate-900">{item.available.toLocaleString()} kg</p>
</div>
</div>
<div className="mt-4 flex gap-2 text-xs text-slate-600">{item.gap > 0 ? <ShieldAlert size={15} className="text-amber-600" /> : <CheckCircle2 size={15} className="text-emerald-600" />}<span>{item.recommendation}</span>
</div>
</div>)}</section>
<section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
  <div className="flex items-start gap-3">
    <TrendingUp className="mt-0.5 text-emerald-700" size={20} />
    <div>
      <h3 className="font-semibold text-emerald-950">
        How the feedback loop works
      </h3>
    <p className="mt-1 text-sm leading-6 text-emerald-900">Completed orders become sales history. That history is fed back into the forecasting layer, improving future procurement recommendations for the FPO.</p>
    <Link to="/members" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-800 hover:text-emerald-950">Coordinate with members <ArrowRight size={15} />
    </Link>
</div>
</div>
</section>
<Modal open={planOpen} title="Create procurement plan" description="Turn the current forecast gaps into an actionable member collection plan." onClose={() => setPlanOpen(false)} footer={<>
  <button type="button" onClick={() => setPlanOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
    Cancel
  </button>
<button type="button" onClick={createPlan} className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">
  Create plan
</button>
</>}>
<div className="space-y-3">{planRows.map((item) => <div key={item.product} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
    <div>
      <p className="font-semibold text-slate-800">{item.emoji} {item.product}</p>
      <p className="text-xs text-slate-500">Recommended: {item.gap + 50} kg</p>
    </div>
  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
    Shortage
  </span>
</div>)}</div>
</Modal>
<Toast message={toast} onClose={() => setToast('')} />
</div>
}
