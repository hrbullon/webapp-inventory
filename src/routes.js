import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Warehouse = React.lazy(() => import('./views/warehouse/Warehouse'))
const Category = React.lazy(() => import('./views/category/Category'))
const Products = React.lazy(() => import('./views/products/list/Page'))
const Sales = React.lazy(() => import('./views/sales/Sales'))
const SalesCreate = React.lazy(() => import('./views/sales/Form'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/warehouse', name: 'Warehouse', element: Warehouse },
  { path: '/category', name: 'Category', element: Category },
  { path: '/products/list', name: 'Products', element: Products },
  { path: '/sales', name: 'Sales', element: Sales },
  { path: '/sales/create', name: 'SalesCreate', element: SalesCreate },
]

export default routes
