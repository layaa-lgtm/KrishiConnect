import { ArrowRight, AlertTriangle, CheckCircle2, Clock3, Sparkles } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { stats, forecastData, orders, forecastCards } from '../data/mockData'
export default function Dashboard() {
return <div className="mx-auto max-w-7xl space-y-6">
  <div>
    <p className="text-sm font-semibold text-green-700">
      Tuesday, September 1, 2026
    </p>
  <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
    Good morning, GreenHarvest 👋
  </h1>
<p className="mt-1 text-sm text-gray-500">
  Your FPO command center for demand, inventory, orders and logistics.
</p>
</div>
<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((item) => <StatCard key={item.title} {...item} />)}</div>
<section className="overflow-hidden rounded-2xl bg-green-900 p-6 text-white shadow-sm">
  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
    <div className="max-w-2xl">
      <div className="mb-3 flex items-center gap-2 text-green-100">
        <Sparkles size={18} />
        <span className="text-sm font-semibold">
          AI Demand Insight
        </span>
    </div>
  <h2 className="text-xl font-bold md:text-2xl">
    Tomato demand is expected to increase by 34% next week.
  </h2>
<p className="mt-2 text-sm leading-6 text-green-100">The system predicts a 2,400 kg requirement against 1,800 kg currently available. Early procurement can close the gap before buyer demand arrives.</p>
</div>
<div className="flex shrink-0 flex-wrap gap-3">
  <Link to="/forecast" className="ai-action-link inline-flex min-w-[140px] items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold shadow-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white/70" style={{ color: '#064e3b', backgroundColor: '#ffffff' }}>
    View Forecast
  </Link>
<Link to="/members" className="inline-flex min-w-[150px] items-center justify-center rounded-xl border border-emerald-500 bg-emerald-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-300" style={{ color: '#ffffff', backgroundColor: '#064e3b' }}>
  Plan Procurement
</Link>
</div>
</div>
<div className="mt-6 grid gap-4 sm:grid-cols-3">
  <div className="rounded-xl bg-white/10 p-4">
    <p className="text-xs text-green-200">
      Expected demand
    </p>
  <p className="mt-1 text-xl font-bold">
    2,400 kg
  </p>
</div>
<div className="rounded-xl bg-white/10 p-4">
  <p className="text-xs text-green-200">
    Current availability
  </p>
<p className="mt-1 text-xl font-bold">
  1,800 kg
</p>
</div>
<div className="rounded-xl bg-amber-400/20 p-4">
  <p className="text-xs text-amber-200">
    Potential shortage
  </p>
<p className="mt-1 text-xl font-bold text-amber-100">
  600 kg
</p>
</div>
</div>
</section>
<div className="grid gap-6 xl:grid-cols-3">
  <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-bold text-gray-900">
          Demand overview
        </h2>
      <p className="mt-1 text-xs text-gray-500">
        Historical demand vs AI prediction
      </p>
  </div>
<Link to="/forecast" className="text-sm font-semibold text-green-700">
  View details
</Link>
</div>
<div className="mt-6 h-72">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={forecastData}>
      <XAxis dataKey="day" tickLine={false} axisLine={false} />
      <YAxis tickLine={false} axisLine={false} />
      <Tooltip formatter={(value) => `${value?.toLocaleString('en-IN')} kg`} />
        <Area type="monotone" dataKey="actual" stroke="#166534" fill="#dcfce7" strokeWidth={2} connectNulls />
        <Area type="monotone" dataKey="predicted" stroke="#ca8a04" fill="#fef3c7" strokeWidth={2} strokeDasharray="5 5" />
      </AreaChart>
  </ResponsiveContainer>
</div>
<div className="flex gap-5 text-xs text-gray-500">
  <span className="text-green-700">
    ● Historical demand
  </span>
<span className="text-amber-600">
  ● AI prediction
</span>
</div>
</section>
<section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-bold text-gray-900">
        Orders needing attention
      </h2>
    <p className="mt-1 text-xs text-gray-500">
      Latest FPO actions
    </p>
</div>
<Link to="/orders" className="text-green-700">
  <ArrowRight size={19} />
</Link>
</div>
<div className="mt-5 space-y-3">{orders.slice(0, 4).map((order) => <div key={order.id} className="rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50">
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-semibold text-gray-800">{order.buyer}</p>
        <p className="mt-1 text-xs text-gray-500">{order.quantity} kg {order.product}</p>
      </div>
    <StatusBadge status={order.status} />
  </div>
<div className="mt-2 flex items-center justify-between">
  <p className="text-xs font-semibold text-gray-700">₹{(order.quantity * order.price).toLocaleString('en-IN')}</p>
  <p className="flex items-center gap-1 text-[11px] text-gray-400">
    <Clock3 size={12} /> {order.delivery}</p>
</div>
</div>)}</div>
</section>
</div>
<section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-bold text-gray-900">
        Forecast alerts
      </h2>
    <p className="mt-1 text-xs text-gray-500">
      Recommended actions before demand arrives
    </p>
</div>
<Link to="/forecast" className="text-sm font-semibold text-green-700">
  Open forecast
</Link>
</div>
<div className="mt-5 grid gap-4 lg:grid-cols-3">{forecastCards.map((item) => <div key={item.product} className="rounded-xl border border-gray-100 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">{item.emoji}</span>
        <p className="font-semibold text-gray-800">{item.product}</p>
      </div>
    <span className={`text-[11px] font-semibold ${item.risk === 'High' ? 'text-red-600' : item.risk === 'Medium' ? 'text-amber-600' : 'text-green-700'}`}>{item.risk} risk</span>
  </div>
<div className="mt-3 flex items-end justify-between">
  <div>
    <p className="text-xs text-gray-500">
      Demand
    </p>
  <p className="font-bold text-gray-900">{item.expected.toLocaleString()} kg</p>
</div>
<div>
  <p className="text-xs text-gray-500">
    Available
  </p>
<p className="font-bold text-gray-900">{item.available.toLocaleString()} kg</p>
</div>
</div>
<div className="mt-3 flex items-center gap-2 text-xs">
  <AlertTriangle size={14} className={item.gap > 0 ? 'text-amber-600' : 'text-green-600'} />
    <span className="font-medium text-gray-600">{item.recommendation}</span>
  </div>
</div>)}</div>
</section>
<div className="grid gap-4 sm:grid-cols-3">
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
      <CheckCircle2 className="text-green-600" size={18} />
      248 members
    </div>
  <p className="mt-1 text-xs text-gray-500">
    Active FPO farmers contributing produce
  </p>
</div>
<div className="rounded-2xl border border-gray-200 bg-white p-4">
  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
    <ShoppingCartIcon />
    46 active buyers
  </div>
<p className="mt-1 text-xs text-gray-500">
  Across restaurants, retailers and wholesalers
</p>
</div>
<div className="rounded-2xl border border-gray-200 bg-white p-4">
  <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
    <span className="rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700">
      ONDC
    </span>
  24 live listings
</div>
<p className="mt-1 text-xs text-gray-500">
  FPO inventory available to bulk buyers
</p>
</div>
</div>
</div>
}
function ShoppingCartIcon() { return <span className="flex h-[18px] w-[18px] items-center justify-center rounded bg-green-50 text-[10px] text-green-700">◉</span> }
