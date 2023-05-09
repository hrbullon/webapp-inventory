import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem, CTooltip } from '@coreui/react'
import { useDispatch } from 'react-redux';

const AppBreadcrumb = () => {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"))
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <div>
      { user.role == "ADM_ROLE" &&
      <CBreadcrumb className="m-0 ms-2">
        <CBreadcrumbItem href="/">Inicio</CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb>}
      { user.role == "STD_ROLE" && 
          <div style={{ display: "flex" }}>
            <div class="card" onClick={() => dispatch({ type: 'set', actionViewChanged: "today" })}>
              <div class="card-body">
                <CTooltip content="Reporte de ventas">
                  <CIcon icon={ icon.cilMoney } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={() => dispatch({ type: 'set', actionViewChanged: "sales" })}>
              <div class="card-body">
                <CTooltip content="Punto de venta">
                  <CIcon icon={ icon.cilCart } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={() => dispatch({ type: 'set', showModal: "customers" })}>
              <div class="card-body">
                <CTooltip content="Agregar cliente">
                  <CIcon icon={ icon.cilUserPlus } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={() => dispatch({ type: 'set', showModal: "cash" })}>
              <div class="card-body">
                <CTooltip content="Entrada/Salida de efectivo">
                  <CIcon icon={ icon.cilDollar } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={() => dispatch({ type: 'set', showModal: "products" })}>
              <div class="card-body">
                <CTooltip content="Consultar producto">
                  <CIcon icon={ icon.cilSearch } size='xxl'/>
                </CTooltip>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default React.memo(AppBreadcrumb)
