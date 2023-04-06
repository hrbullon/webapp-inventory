import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Warehouse = React.lazy(() => import('./views/warehouse/Warehouse'))
const Categories = React.lazy(() => import('./views/categories/Categories'))
const Sales = React.lazy(() => import('./views/sales/Sales'))
const SalesCreate = React.lazy(() => import('./views/sales/Form'))

const Products = React.lazy(() => import('./views/products/Products'))
const ProductCreate = React.lazy(() => import('./views/products/Create'))
const ProductUpdate = React.lazy(() => import('./views/products/Update'))

const Inventory = React.lazy(() => import('./views/inventory/Inventory'))
const Users = React.lazy(() => import('./views/users/Users'))

const Customers = React.lazy(() => import('./views/customers/Customers'))
const CreateCustomer = React.lazy(() => import('./views/customers/Create'))
const UpdateCustomer = React.lazy(() => import('./views/customers/Update'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/warehouse', name: 'Warehouse', element: Warehouse },
  { path: '/categories', name: 'Category', element: Categories },
  
  { path: '/inventory', name: 'Existencias', element: Inventory },
  { path: '/users', name: 'Usuarios', element: Users },
  
  { path: '/products', name: 'Products', element: Products },
  { path: '/products/create', name: 'ProductCreate', element: ProductCreate },
  { path: '/products/update/:id', name: 'ProductUpdate', element: ProductUpdate },

  { path: '/sales', name: 'Ventas', element: Sales },
  { path: '/sales/create', name: 'Nueva venta', element: SalesCreate },

  { path: '/customers', name: 'Clientes', element: Customers },
  { path: '/customers/create', name: 'Clientes', element: CreateCustomer },
  { path: '/customers/update/:id', name: 'Clientes', element: UpdateCustomer },

]

export default routes
