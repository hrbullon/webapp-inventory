import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Warehouse = React.lazy(() => import('./views/warehouse/Warehouse'))
const Categories = React.lazy(() => import('./views/categories/Categories'))

const Sales = React.lazy(() => import('./views/sales/Sales'))
const SalesCreate = React.lazy(() => import('./views/sales/Form'))
const SalesMonth = React.lazy(() => import('./views/sales/report/Month'))
const SalesToday = React.lazy(() => import('./views/sales/report/Today'))


const Products = React.lazy(() => import('./views/products/Products'))
const ProductCreate = React.lazy(() => import('./views/products/Create'))
const ProductUpdate = React.lazy(() => import('./views/products/Update'))

const Inventory = React.lazy(() => import('./views/inventory/Inventory'))
const Users = React.lazy(() => import('./views/users/Users'))
const CreateUser = React.lazy(() => import('./views/users/Create'))
const UpdateUser = React.lazy(() => import('./views/users/Update'))

const Customers = React.lazy(() => import('./views/customers/Customers'))
const CreateCustomer = React.lazy(() => import('./views/customers/Create'))
const UpdateCustomer = React.lazy(() => import('./views/customers/Update'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/warehouse', name: 'Warehouse', element: Warehouse },
  { path: '/categories', name: 'Categorias', element: Categories },
  
  { path: '/inventory', name: 'Existencias', element: Inventory },
  
  { path: '/products', name: 'Productos', element: Products },
  { path: '/products/create', name: 'Crear producto', element: ProductCreate },
  { path: '/products/update/:id', name: 'Editar producto', element: ProductUpdate },

  { path: '/sales', name: 'Ventas', element: Sales },
  { path: '/sales/create', name: 'Nueva venta', element: SalesCreate },
  { path: '/sales-month', name: 'Ventas del mes', element: SalesMonth },
  { path: '/sales-today', name: 'Ventas diarias', element: SalesToday },

  { path: '/customers', name: 'Clientes', element: Customers },
  { path: '/customers/create', name: 'Crear cliente', element: CreateCustomer },
  { path: '/customers/update/:id', name: 'Editar cliente', element: UpdateCustomer },

  { path: '/users', name: 'Usuaios', element: Users },
  { path: '/users/create', name: 'Crear usuario', element: CreateUser },
  { path: '/users/update/:id', name: 'Editar usuario', element: UpdateUser },

]

export default routes
