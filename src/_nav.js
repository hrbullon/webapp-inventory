import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilCash,
  cilDescription,
  cilSpeedometer,
  cilStar
} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Gestión de Inventario',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Almacenes',
        to: '/warehouse',
      },
      {
        component: CNavItem,
        name: 'Categorías de productos',
        to: '/category',
      },
      {
        component: CNavItem,
        name: 'Productos',
        to: '/products/list',
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
        name: 'Nueva venta',
        to: '/sales/create',
      },
      {
        component: CNavItem,
        name: 'Ventas diarias',
        to: '/sales/report/today',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
