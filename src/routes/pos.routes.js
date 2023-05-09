import React from 'react'

const Posform = React.lazy(() => import('../views/pos/PosForm.js'));

const routes = [
    { path: '/', exact: true, name: 'Inicio' },
    { path: '/point-of-sale', name: 'Punto de venta', element: Posform },

]

export default routes
