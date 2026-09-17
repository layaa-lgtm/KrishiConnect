import { Package, ShoppingCart, TrendingUp, Truck } from 'lucide-react'
const icons = { inventory: Package, orders: ShoppingCart, forecast: TrendingUp, delivery: Truck }
export default function StatCard({ title, value, subtitle, trend, type }) {
const Icon = icons[type] || Package
return <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{value}</h3>
      <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
    </div>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
    <Icon size={20} />
  </div>
</div>
<div className={`mt-4 text-xs font-semibold ${type === 'forecast' ? 'text-amber-700' : 'text-green-700'}`}>{trend}</div>
</div>
}
