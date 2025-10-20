import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider"
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Dashboard from './mga_pahina/Dashboard.tsx';
import Payroll from './mga_pahina/Payroll.tsx';
import Employee from './mga_pahina/Employee.tsx';
import Attendance from './mga_pahina/Attedance.tsx';
import Account from './mga_pahina/Account.tsx';
import EmployeeReqs from './mga_pahina/EmployeeRequest.tsx';
import RevenueAndExpenses from './mga_pahina/ExpensesRevenue.tsx'

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    
  },
  {
    path: "dashboard",
    Component: Dashboard,
  },
  {
    path: "payroll",
    Component: Payroll,
  },
    {
    path: "employee",
    Component: Employee,
  },
    {
    path: "attendance",
    Component: Attendance,
  },
    {
      path: "account",
      Component: Account,
  },
    {
      path: "requests",
      Component: EmployeeReqs,
  },
    {
      path: "expensesrevenue",
      Component: RevenueAndExpenses,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
