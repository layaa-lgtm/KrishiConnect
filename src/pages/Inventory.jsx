import { Plus, Search, PackageCheck, MapPin, ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { inventory as inventorySeed } from '../data/mockData'
export default function Inventory() {
const [rows, setRows] = useState(inventorySeed)
const [search, setSearch] = useState('')
const [status, setStatus] = useState('All status')
const [addOpen, setAddOpen] = useState(false)
const [manageItem, setManageItem] = useState(null)
const [toast, setToast] = useState('')
const [form, setForm] = useState({ name: '', grade: 'A', quantity: '', price: '', location: 'GreenHarvest FPO Centre' })
const filtered = useMemo(() => rows.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && (status === 'All status' || item.status === status)), [rows, search, status])
const submitAdd = (e) => {
e.preventDefault()
if (!form.name || !form.quantity || !form.price) return
const newItem = { id: Date.now(), emoji: '🌾', name: form.name, grade: form.grade, quantity: Number(form.quantity), price: Number(form.price), availableFrom: '04 Sep 2026', status: 'Draft', location: form.location }
setRows((prev) => [newItem, ...prev])
setAddOpen(false)
setForm({ name: '', grade: 'A', quantity: '', price: '', location: 'GreenHarvest FPO Centre' })
setToast(`${newItem.name} added to inventory as a draft listing.`)
setTimeout(() => setToast(''), 2800)
}
const publish = (item) => {
setRows((prev) => prev.map((row) => row.id === item.id ? { ...row, status: 'Listed' } : row))
setManageItem({ ...item, status: 'Listed' })
setToast(`${item.name} is now marked as a live ONDC listing.`)
setTimeout(() => setToast(''), 2800)
}
return <div className="mx-auto max-w-7xl space-y-6">
  <PageHeader eyebrow="FPO stock & listings" title="Inventory" description="Manage aggregated produce, quality grades, pricing and ONDC-ready listings." action={<button type="button" onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800">
    <Plus size={17} />
    Add produce
  </button>} />
<div className="grid gap-4 sm:grid-cols-3">
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs text-slate-500">
      Total stock
    </p>
  <p className="mt-1 text-2xl font-bold text-slate-900">{rows.reduce((sum, row) => sum + row.quantity, 0).toLocaleString()} kg</p>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-xs text-slate-500">
    Live ONDC listings
  </p>
<p className="mt-1 text-2xl font-bold text-slate-900">{rows.filter((row) => row.status === 'Listed').length + 20}</p>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-xs text-slate-500">
    Low-stock items
  </p>
<p className="mt-1 text-2xl font-bold text-amber-600">3</p>
</div>
</div>
<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 md:w-80">
      <Search size={16} className="text-slate-400" />
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search produce..." className="w-full bg-transparent text-sm outline-none" />
      </div>
    <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none">
      <option>
        All status
      </option>
    <option>
      Listed
    </option>
  <option>
    Limited
  </option>
<option>
  Draft
</option>
</select>
</div>
<div className="overflow-x-auto">
  <table className="w-full min-w-[820px] text-left">
    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
      <tr>
        <th className="px-5 py-3">
          Produce
        </th>
      <th className="px-5 py-3">
        Grade
      </th>
    <th className="px-5 py-3">
      Available
    </th>
  <th className="px-5 py-3">
    Price
  </th>
<th className="px-5 py-3">
  Available from
</th>
<th className="px-5 py-3">
  Status
</th>
<th className="px-5 py-3">
  Action
</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100">{filtered.map((item) => <tr key={item.id} className="hover:bg-slate-50">
    <td className="px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.emoji}</span>
        <div>
          <p className="font-semibold text-slate-800">{item.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
            <MapPin size={11} /> {item.location}</p>
        </div>
    </div>
</td>
<td className="px-5 py-4">
  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">Grade {item.grade}</span>
</td>
<td className="px-5 py-4 text-sm font-semibold text-slate-800">{item.quantity.toLocaleString()} kg</td>
<td className="px-5 py-4 text-sm text-slate-700">₹{item.price}/kg</td>
<td className="px-5 py-4 text-sm text-slate-600">{item.availableFrom}</td>
<td className="px-5 py-4">
  <StatusBadge status={item.status} />
</td>
<td className="px-5 py-4">
  <button type="button" onClick={() => setManageItem(item)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50">Manage <ExternalLink size={12} />
  </button>
</td>
</tr>)}</tbody>
</table>
</div>
</section>
<div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950">
  <div className="flex items-center gap-2 font-semibold">
    <PackageCheck size={18} />
    Marketplace rule
  </div>
<p className="mt-1 text-xs leading-5 text-blue-900">The FPO is the seller of record. Member farmers supply the FPO's aggregated inventory; buyers discover the FPO listing through ONDC.</p>
</div>
<Modal open={addOpen} title="Add produce" description="Create an inventory record. It starts as a draft until the FPO publishes it." onClose={() => setAddOpen(false)} footer={<>
  <button type="button" onClick={() => setAddOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
    Cancel
  </button>
<button form="add-produce-form" type="submit" className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">
  Add produce
</button>
</>}>
<form id="add-produce-form" onSubmit={submitAdd} className="grid gap-4 sm:grid-cols-2">
  <label className="sm:col-span-2">
    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
      Produce name
    </span>
  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-200" placeholder="e.g. Cabbage" />
  </label>
<label>
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Grade
  </span>
<select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
</label>
<label>
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Quantity (kg)
  </span>
<input required min="1" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
</label>
<label>
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Price (₹/kg)
  </span>
<input required min="1" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
</label>
<label>
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Collection point
  </span>
<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
</label>
</form>
</Modal>
<Modal open={!!manageItem} title={manageItem ? manageItem.name : ''} description="Manage this FPO inventory listing." onClose={() => setManageItem(null)} footer={<button type="button" onClick={() => setManageItem(null)} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800">
    Close
  </button>}>
{manageItem && <div className="space-y-4">
  <div className="grid grid-cols-2 gap-3">
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[11px] text-slate-500">
        Stock
      </p>
    <p className="mt-1 font-bold text-slate-900">{manageItem.quantity.toLocaleString()} kg</p>
  </div>
<div className="rounded-xl bg-slate-50 p-3">
  <p className="text-[11px] text-slate-500">
    Price
  </p>
<p className="mt-1 font-bold text-slate-900">₹{manageItem.price}/kg</p>
</div>
</div>
<p className="text-sm text-slate-600">Status: <span className="font-semibold text-slate-900">{manageItem.status}</span>
</p>{manageItem.status !== 'Listed' && <button type="button" onClick={() => publish(manageItem)} className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800">
Publish on ONDC
</button>}</div>}
</Modal>
<Toast message={toast} onClose={() => setToast('')} />
</div>
}
