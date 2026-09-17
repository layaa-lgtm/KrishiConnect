import { useState } from 'react'
import { ArrowUpRight, BarChart3, IndianRupee, Package, Users, Download } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts'
import PageHeader from '../components/PageHeader'
import Toast from '../components/Toast'
import { salesData, categoryDemand } from '../data/mockData'
export default function Analytics() {
const [month, setMonth] = useState('September 2026')
const [toast, setToast] = useState('')
const exportReport = () => { setToast(`${month} analytics report prepared for export.`); setTimeout(() => setToast(''), 2600) }
return <div className="mx-auto max-w-7xl space-y-6">
  <PageHeader eyebrow="Performance loop" title="Sales & Analytics" description="Completed transactions become the history used by the forecasting layer. This page closes the FPO's demand → sale → forecast loop." action={<div className="flex gap-2">
    <select value={month} onChange={(e) => setMonth(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700">
      <option>
        September 2026
      </option>
    <option>
      August 2026
    </option>
  <option>
    July 2026
  </option>
</select>
<button type="button" onClick={exportReport} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
  <Download size={15} />
  Export
</button>
</div>} />
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <Metric icon={IndianRupee} label="Revenue" value="₹8.4L" trend="+18.2%" />
  <Metric icon={Package} label="Produce sold" value="12.4 T" trend="+11.8%" />
  <Metric icon={Users} label="Active buyers" value="46" trend="+7" />
  <Metric icon={BarChart3} label="Avg. order value" value="₹18.2k" trend="+6.4%" />
</div>
<div className="grid gap-6 lg:grid-cols-3">
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
    <h2 className="font-bold text-slate-900">
      Revenue trend
    </h2>
  <p className="mt-1 text-xs text-slate-500">
    Monthly transaction value across the FPO
  </p>
<div className="mt-6 h-72">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={salesData}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
      <XAxis dataKey="month" tickLine={false} axisLine={false} />
      <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${Math.round(v / 1000)}k`} />
        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
          <Line type="monotone" dataKey="revenue" stroke="#166534" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
    </ResponsiveContainer>
</div>
</section>
<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h2 className="font-bold text-slate-900">
    Buyer mix
  </h2>
<p className="mt-1 text-xs text-slate-500">
  Demand by buyer type
</p>
<div className="mt-6 h-72">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={categoryDemand} layout="vertical">
      <XAxis type="number" hide />
      <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={85} />
      <Bar dataKey="value" fill="#166534" radius={[0, 6, 6, 0]} />
    </BarChart>
</ResponsiveContainer>
</div>
</section>
</div>
<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-bold text-slate-900">
        Feedback into AI
      </h2>
    <p className="mt-1 text-xs text-slate-500">
      What this data enables next
    </p>
</div>
<ArrowUpRight size={18} className="text-emerald-700" />
</div>
<div className="mt-5 grid gap-4 md:grid-cols-3">
  <Insight title="Historical demand" text="Record quantity, buyer, price and delivery date for every completed order." />
  <Insight title="Pattern detection" text="Identify seasonal demand, fast-moving produce and recurring buyer needs." />
  <Insight title="Better procurement" text="Use new patterns to improve next week's forecast and farmer coordination." />
</div>
</section>
<Toast message={toast} onClose={() => setToast('')} />
</div>
}
function Metric({ icon: Icon, label, value, trend }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <p className="text-xs text-slate-500">{label}</p>
    <Icon size={18} className="text-emerald-700" />
  </div>
<p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
<p className="mt-2 text-xs font-semibold text-emerald-700">↑ {trend}</p>
</div> }
function Insight({ title, text }) { return <div className="rounded-xl bg-slate-50 p-4">
  <p className="text-sm font-semibold text-slate-800">{title}</p>
  <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
</div> }
