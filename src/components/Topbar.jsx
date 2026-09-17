import { useState } from 'react'
import { Bell, Menu, Search, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Topbar({ setMobileOpen }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [noticeOpen, setNoticeOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const submitSearch = (event) => {
    event.preventDefault()

    const value = query.toLowerCase()

    if (value.includes('order')) {
      navigate('/orders')
    } else if (
      value.includes('inventory') ||
      value.includes('stock')
    ) {
      navigate('/inventory')
    } else if (
      value.includes('forecast') ||
      value.includes('demand')
    ) {
      navigate('/forecast')
    } else if (
      value.includes('logistics') ||
      value.includes('route')
    ) {
      navigate('/logistics')
    } else if (
      value.includes('member') ||
      value.includes('farmer')
    ) {
      navigate('/members')
    } else if (
      value.includes('analytic') ||
      value.includes('sales')
    ) {
      navigate('/analytics')
    }

    setQuery('')
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </button>

        <form
          onSubmit={submitSearch}
          className={`items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 md:flex ${
            searchOpen
              ? 'absolute left-4 right-4 flex bg-white shadow-lg ring-1 ring-slate-200 md:static md:w-auto md:shadow-none md:ring-0'
              : 'hidden'
          }`}
        >
          <Search size={17} className="text-slate-400" />

          <input
            autoFocus={searchOpen}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search orders, inventory, members..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none md:w-72"
          />

          {searchOpen && (
            <button
              type="button"
              className="text-slate-400 md:hidden"
              onClick={() => setSearchOpen(false)}
            >
              <X size={17} />
            </button>
          )}
        </form>

        <button
          type="button"
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Search"
          onClick={() => setSearchOpen((value) => !value)}
        >
          <Search size={19} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100"
            onClick={() => setNoticeOpen((value) => !value)}
          >
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {noticeOpen && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">
                  Notifications
                </p>

                <button
                  type="button"
                  className="text-xs font-semibold text-emerald-700"
                  onClick={() => setNoticeOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="mt-3 space-y-2">
                <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">
                  Tomato forecast shows a 600 kg shortage next week.
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-xs text-blue-900">
                  New 500 kg tomato order from ABC Restaurant.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
            GH
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              GreenHarvest
            </p>
            <p className="text-xs text-slate-500">
              FPO Admin
            </p>
          </div>
        </div>

        <span className="sr-only">
          Current path: {location.pathname}
        </span>
      </div>
    </header>
  )
}
