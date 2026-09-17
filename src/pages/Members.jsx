import { Search, Users, Wheat, MapPin, Plus } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { members as memberSeed } from '../data/mockData'
export default function Members() {
const [rows, setRows] = useState(memberSeed)
const [search, setSearch] = useState('')
const [addOpen, setAddOpen] = useState(false)
const [toast, setToast] = useState('')
const [form, setForm] = useState({ name: '', produce: 'Tomatoes', quantity: '', location: '' })
const filtered = rows.filter((member) => member.name.toLowerCase().includes(search.toLowerCase()) || member.produce.toLowerCase().includes(search.toLowerCase()))
const submit = (e) => {
e.preventDefault()
if (!form.name || !form.quantity || !form.location) return
const initials = form.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
setRows((prev) => [{ id: Date.now(), name: form.name, initials, produce: form.produce, quantity: Number(form.quantity), availability: 'Tomorrow', location: form.location }, ...prev])
setAddOpen(false)
setForm({ name: '', produce: 'Tomatoes', quantity: '', location: '' })
setToast('Member added to the FPO network.')
setTimeout(() => setToast(''), 2600)
}
return <div className="mx-auto max-w-7xl space-y-6">
  <PageHeader eyebrow="FPO network" title="Member Farmers" description="The FPO coordinates procurement with its members. Farmers do not need to interact with the buyer marketplace." action={<button type="button" onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800">
    <Plus size={17} />
    Add member
  </button>} />
<div className="grid gap-4 sm:grid-cols-3">
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs text-slate-500">
      Total members
    </p>
  <p className="mt-1 text-2xl font-bold text-slate-900">{248 + Math.max(rows.length - memberSeed.length, 0)}</p>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-xs text-slate-500">
    Expected aggregation
  </p>
<p className="mt-1 text-2xl font-bold text-slate-900">
  3,420 kg
</p>
</div>
<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-xs text-slate-500">
    Villages covered
  </p>
<p className="mt-1 text-2xl font-bold text-slate-900">
  18
</p>
</div>
</div>
<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="flex items-center gap-2 border-b border-slate-100 p-4">
    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 md:w-96">
      <Search size={16} className="text-slate-400" />
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search member or produce..." className="w-full bg-transparent text-sm outline-none" />
      </div>
  </div>
<div className="overflow-x-auto">
  <table className="w-full min-w-[700px] text-left">
    <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
      <tr>
        <th className="px-5 py-3">
          Member
        </th>
      <th className="px-5 py-3">
        Produce
      </th>
    <th className="px-5 py-3">
      Available
    </th>
  <th className="px-5 py-3">
    Availability
  </th>
<th className="px-5 py-3">
  Location
</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100">{filtered.map((member) => <tr key={member.id} className="hover:bg-slate-50">
    <td className="px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">{member.initials}</div>
        <div>
          <p className="font-semibold text-slate-800">{member.name}</p>
          <p className="text-[11px] text-slate-400">Member #{member.id}</p>
        </div>
    </div>
</td>
<td className="px-5 py-4">
  <div className="flex items-center gap-2 text-sm font-medium">
    <Wheat size={15} className="text-amber-600" /> {member.produce}</div>
</td>
<td className="px-5 py-4 text-sm font-semibold">{member.quantity} kg</td>
<td className="px-5 py-4 text-sm text-slate-600">{member.availability}</td>
<td className="px-5 py-4 text-sm text-slate-600">
  <span className="inline-flex items-center gap-1">
    <MapPin size={13} />{member.location}</span>
</td>
</tr>)}</tbody>
</table>
</div>
</section>
<div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
  <div className="flex items-start gap-3">
    <Users className="mt-0.5 text-emerald-700" size={19} />
    <div>
      <h3 className="font-semibold text-emerald-950">
        Procurement plan for tomatoes
      </h3>
    <p className="mt-1 text-sm text-emerald-900">AI recommends collecting 650 kg from members. Start with members marked as available tomorrow, then cover the remainder from nearby collection points.</p>
  </div>
</div>
</div>
<Modal open={addOpen} title="Add member farmer" description="Add a member to the FPO's internal procurement network." onClose={() => setAddOpen(false)} footer={<>
  <button type="button" onClick={() => setAddOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
    Cancel
  </button>
<button type="submit" form="add-member-form" className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800">
  Add member
</button>
</>}>
<form id="add-member-form" onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
  <label className="sm:col-span-2">
    <span className="mb-1.5 block text-xs font-semibold text-slate-600">
      Full name
    </span>
  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Farmer name" />
  </label>
<label>
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Primary produce
  </span>
<select value={form.produce} onChange={(e) => setForm({ ...form, produce: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">
  <option>
    Tomatoes
  </option>
<option>
  Onions
</option>
<option>
  Potatoes
</option>
<option>
  Carrots
</option>
</select>
</label>
<label>
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Available quantity (kg)
  </span>
<input required min="1" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
</label>
<label className="sm:col-span-2">
  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
    Village / collection point
  </span>
<input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="Village name" />
</label>
</form>
</Modal>
<Toast message={toast} onClose={() => setToast('')} />
</div>
}
