export default function StatusBadge({ status }) {
const styles = {
New: 'bg-blue-50 text-blue-700', Preparing: 'bg-amber-50 text-amber-700', Ready: 'bg-green-50 text-green-700', 'In Transit': 'bg-violet-50 text-violet-700', Delivered: 'bg-gray-100 text-gray-600', Listed: 'bg-green-50 text-green-700', Limited: 'bg-amber-50 text-amber-700', Draft: 'bg-gray-100 text-gray-600', 'Ready for Pickup': 'bg-green-50 text-green-700',
}
return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />{status}</span>
}
