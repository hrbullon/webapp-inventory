import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilBriefcase,
  cilCash,
  cilSpeedometer,
  cilStar
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
        name: 'Tasas de cambio',
        to: '/exchanges',
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
        name: 'Productos',
        to: '/products',
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
      }
    ],
  }
]

export default _nav
