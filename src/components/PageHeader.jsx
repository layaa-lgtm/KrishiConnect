export default function PageHeader({ eyebrow, title, description, action }) {
return <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
  <div>
    <p className="text-sm font-semibold text-green-700">{eyebrow}</p>
    <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{title}</h1>{description && <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{description}</p>}</div>{action}</div>
}
