
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layout/DashboardLayout'
import TransactionPage from './pages/TransactionsPage'
import CategoriesPage from './pages/CategoriesPage'
import HomePage from './pages/HomePage'
import BudgetsPage from './pages/BudgetsPage'
import ReportsPage from './pages/ReportsPage'
import AccountsPage from './pages/AccountsPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import SettingsPage from './pages/SettingsPage'

function App() {

  return (
    // <Routes>
    //   <Route path="/" element={<DashboardLayout />}>
    //     <Route index element={<Home />} />
    //     <Route path="mail" element={<Mail />} />
    //     <Route path="documents" element={<Documents />} />
    //     <Route path="info" element={<Info />} />
    //     <Route path="*" element={<Navigate to="/" replace />} />
    //   </Route>
    // </Routes>
    <DashboardLayout>
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/transactions" element={<TransactionPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/budgets" element={<BudgetsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </DashboardLayout>
  )
}

export default App
