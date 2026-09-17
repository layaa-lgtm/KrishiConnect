import PageHeader from '../components/PageHeader'

export default function Placeholder({ title }) {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        eyebrow="KrishiConnect"
        title={title}
        description="This page is intentionally lightweight in the prototype. Add role-specific controls here once the core backend contracts are ready."
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto max-w-md">
          <p className="text-4xl">🌱</p>

          <h2 className="mt-3 text-lg font-bold text-gray-900">
            Prototype section
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The main SIH workflow is implemented in Dashboard, Forecast,
            Inventory, Orders, Members, Logistics and Analytics.
          </p>
        </div>
      </div>
    </div>
  )
}
