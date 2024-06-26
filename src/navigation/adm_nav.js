import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilBriefcase,
  cilCash,
  cilSpeedometer,
  cilStar,
  cilUser
} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Administracion',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Datos Empresa',
        to: '/company',
      },
      {
        component: CNavItem,
        name: 'Tasas de cambio',
        to: '/exchanges',
      }
    ]
  },  
  {
    component: CNavItem,
    name: 'Compras',
    to: "purchases",
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },  
  {
    component: CNavGroup,
    name: 'Control de Acceso',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Usuarios',
        to: '/users',
      }
    ]
  },  
  {
    component: CNavGroup,
    name: 'Gestión de Inventario',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categorías',
        to: '/categories',
      },
      {
        component: CNavItem,
        name: 'Productos',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Existencias',
        to: '/inventory',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Ventas',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Administrar ventas',
        to: '/sales',
      },
      {
        component: CNavItem,
        name: 'Ventas del mes',
        to: '/sales-month',
      },
      {
        component: CNavItem,
        name: 'Ventas diarias',
        to: '/sales-today',
      },
      {
        component: CNavItem,
        name: 'Cierres de caja',
        to: '/daily_sales',
      }
    ],
  }
]

export default _nav
