import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import routes from '../routes/main.routes'

import { 
  CBreadcrumb, 
  CBreadcrumbItem, 
  CModal, 
  CModalBody, 
  CModalHeader, 
  CModalTitle, 
  CTooltip } from '@coreui/react'

const FormCustomer = React.lazy(() => import('src/views/customers/Form'));
const Products  = React.lazy(() => import('src/views/products/Products'));
const Cash  = React.lazy(() => import('src/views/pos/Cash'));

const AppBreadcrumb = () => {

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState("");
  const [visible, setVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const started_session_pos = JSON.parse(localStorage.getItem("started_session_pos"));
  const currentLocation = useLocation().pathname;

  useEffect(() => {
    if(started_session_pos && started_session_pos !== undefined){
      window.location.href = "/#/pos";
    }
  }, [])
  

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

  const handleShowModal = (option) => {
    
    setVisible(true)
    setShowModal(option);

    const titles = {
      customers:"Agregar cliente",
      products: "Buscar producto",
      cash: "Entrada/Salida de efectivo"
    };

    setTitle( titles[option] );
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
      { user.role == "STD_ROLE" && started_session_pos &&
          <div style={{ display: "flex" }}>
            <Link to={ "sales/today" }>
              <div class="card">
                <div class="card-body">
                  <CTooltip content="Productos vendidos">
                    <CIcon icon={ icon.cilMoney } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "sales/today/summary" }>
              <div class="card">
                <div class="card-body">
                  <CTooltip content="Reporte de ventas diarias">
                    <CIcon icon={ icon.cilList } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "/pos" }>
              <div class="card" >
                <div class="card-body">
                  <CTooltip content="Punto de venta">
                    <CIcon icon={ icon.cilCart } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <div class="card" onClick={ () => handleShowModal("customers") }>
              <div class="card-body">
                <CTooltip content="Agregar cliente">
                  <CIcon icon={ icon.cilUserPlus } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={ () => handleShowModal("cash") }>
              <div class="card-body">
                <CTooltip content="Entrada/Salida de efectivo">
                  <CIcon icon={ icon.cilDollar } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={ () => handleShowModal("products") }>
              <div class="card-body">
                <CTooltip content="Consultar producto">
                  <CIcon icon={ icon.cilSearch } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            {/* <div class="card" onClick={() => dispatch({ type: 'set', showModal: "products" })}>
              <div class="card-body">
                <CTooltip content="(2) Ventas pendientes">
                  <CIcon icon={ icon.cilBell } size='xxl'/>
                </CTooltip>
                <CBadge color="danger" position="top-end" shape="rounded-pill">
                  2+ <span className="visually-hidden">unread messages</span>
                </CBadge>
              </div>
            </div> */}
            <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle>{ title }</CModalTitle>
              </CModalHeader>
              <CModalBody>
                { showModal == "customers" && <FormCustomer /> }
                { showModal == "products" && <Products /> }
                { showModal == "cash" && <Cash /> }
              </CModalBody>
            </CModal>
          </div>
      }
    </div>
  )
}

export default React.memo(AppBreadcrumb)
