import React from 'react';
import { TodaySummary } from 'src/views/sales/report/TodaySummary.js';

const Open = React.lazy(() => import('../views/pos/Open.js'));
const Form = React.lazy(() => import('../views/sales/Form.js'));
const Today = React.lazy(() => import('../views/sales/report/Today'));
const SalesToday = React.lazy(() => import('../views/sales/report/SalesToday'));
const createCustomer = React.lazy(() => import('../views/customers/Create'));
const Cash = React.lazy(() => import('../views/pos/Cash'));
const Products = React.lazy(() => import('../views/products/Products'));
const CloseCheckout = React.lazy(() => import('../views/pos/CloseCheckout'));

const routes = [
    { path: '/', exact: true, name: 'Inicio', element: Open },
    { path: '/pos', exact: true, name: 'Inicio', element: Form },
    { path: '/cash', exact: true, name: 'Efectivo', element: Cash },
    { path: '/products', name: 'Productos', element: Products },
    { path: '/sales/today', name: 'Detalles de ventas diarias ', element: Today},
    { path: '/sales/today/summary', name: 'Reporte de ventas diarias ', element: SalesToday},
    { path: '/sales/today/report-x', name: 'Reporte de ventas diarias ', element: TodaySummary},
    { path: '/customers/create', name: 'Crear cliente', element: createCustomer },
    { path: '/checkout/transactions', name: 'Registro de transacciones', element: CloseCheckout },
]

export default routes
