import React from 'react';

const Open = React.lazy(() => import('../views/pos/Open.js'));
const Form = React.lazy(() => import('../views/sales/Form.js'));
const Today = React.lazy(() => import('../views/sales/report/Today'));
const SalesToday = React.lazy(() => import('../views/sales/report/SalesToday'));

const routes = [
    { path: '/', exact: true, name: 'Inicio', element: Open },
    { path: '/pos', exact: true, name: 'Inicio', element: Form },
    { path: '/sales/today', name: 'Detalles de ventas diarias ', element: Today},
    { path: '/sales/today/summary', name: 'Reporte de ventas diarias ', element: SalesToday},
]

export default routes
