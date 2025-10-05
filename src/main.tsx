import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
