import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import Forecast from './pages/Forecast'
import Inventory from './pages/Inventory'
import Logistics from './pages/Logistics'
import Members from './pages/Members'
import Orders, { OrderDetails } from './pages/Orders'
import Placeholder from './pages/Placeholder'

const withLayout = (element) => (
  <Layout>
    {element}
  </Layout>
)

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={withLayout(<Dashboard />)}
      />

      <Route
        path="/forecast"
        element={withLayout(<Forecast />)}
      />

      <Route
        path="/inventory"
        element={withLayout(<Inventory />)}
      />

      <Route
        path="/orders"
        element={withLayout(<Orders />)}
      />

      <Route
        path="/orders/:orderId"
        element={withLayout(<OrderDetails />)}
      />

      <Route
        path="/members"
        element={withLayout(<Members />)}
      />

      <Route
        path="/logistics"
        element={withLayout(<Logistics />)}
      />

      <Route
        path="/analytics"
        element={withLayout(<Analytics />)}
      />

      <Route
        path="/settings"
        element={withLayout(<Placeholder title="Settings" />)}
      />

      <Route
        path="/help"
        element={withLayout(<Placeholder title="Help & Support" />)}
      />

      <Route
        path="*"
        element={withLayout(<Placeholder title="Page not found" />)}
      />
    </Routes>
  )
}
