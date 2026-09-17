import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  Leaf,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Truck,
  Users,
  X,
} from 'lucide-react'

const menuItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    name: 'Demand Forecast',
    icon: TrendingUp,
    path: '/forecast',
  },
  {
    name: 'Inventory',
    icon: Package,
    path: '/inventory',
  },
  {
    name: 'Orders',
    icon: ShoppingCart,
    path: '/orders',
  },
  {
    name: 'Logistics',
    icon: Truck,
    path: '/logistics',
  },
  {
    name: 'Members',
    icon: Users,
    path: '/members',
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
  },
]

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
                <Leaf size={22} />
              </div>

              <div>
                <h1 className="font-bold text-slate-900">
                  KrishiConnect
                </h1>
                <p className="text-xs text-slate-500">
                  FPO command center
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X size={19} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {menuItems.map(({ name, icon: Icon, path }) => (
              <NavLink
                key={name}
                to={path}
                end={path === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? 'text-emerald-700'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }
                    />
                    {name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-slate-100 p-3">
            <NavLink
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <Settings size={18} />
              Settings
            </NavLink>

            <NavLink
              to="/help"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <HelpCircle size={18} />
              Help
            </NavLink>

            <div className="mt-3 rounded-xl bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-800">
                GreenHarvest FPO
              </p>
              <p className="text-xs text-slate-500">
                Karnataka · 248 members
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
