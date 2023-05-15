import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
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

import { AuthContext } from 'src/context/AuthContext';
import { startCheckingStarted } from 'src/actions/transaction';
import { text } from 'src/strings';

const FormCustomer = React.lazy(() => import('src/views/customers/Form'));
const Products  = React.lazy(() => import('src/views/products/Products'));
const Cash  = React.lazy(() => import('src/views/pos/Cash'));
const CloseCheckout  = React.lazy(() => import('src/views/pos/CloseCheckout'));

const AppBreadcrumb = () => {

  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState("");
  const [visible, setVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const started_session_pos = JSON.parse(localStorage.getItem("started_session_pos"));
  const currentLocation = useLocation().pathname;

  useEffect( ()=> {
        
    if(context.user.role == "STD_ROLE"){
      
      let started = dispatch( startCheckingStarted(1) );

      started.then( resp => {
        if(resp.transaction){
            localStorage.setItem("started_session_pos", true);
            window.location.href = "/#/pos";
        }
      }) 
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
      customers: text.add_customer,
      products: text.find_products,
      cash: text.in_out_cash,
      close_checkout: text.close_checkout
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
                  <CTooltip content={ text.sold_products }>
                    <CIcon icon={ icon.cilMoney } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "sales/today/summary" }>
              <div class="card">
                <div class="card-body">
                  <CTooltip content={ text.daily_sales_report }>
                    <CIcon icon={ icon.cilList } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "/pos" }>
              <div class="card" >
                <div class="card-body">
                  <CTooltip content={ text.pos }>
                    <CIcon icon={ icon.cilCart } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <div class="card" onClick={ () => handleShowModal("customers") }>
              <div class="card-body">
                <CTooltip content={ text.add_customer }>
                  <CIcon icon={ icon.cilUserPlus } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={ () => handleShowModal("cash") }>
              <div class="card-body">
                <CTooltip content={ text.in_out_cash }>
                  <CIcon icon={ icon.cilDollar } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={ () => handleShowModal("products") }>
              <div class="card-body">
                <CTooltip content={ text.find_products }>
                  <CIcon icon={ icon.cilSearch } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <div class="card" onClick={ () => handleShowModal("close_checkout") }>
              <div class="card-body">
                <CTooltip content={ text.close_checkout }>
                  <CIcon icon={ icon.cilLockLocked } size='xxl'/>
                </CTooltip>
              </div>
            </div>
            <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader onClose={() => setVisible(false)}>
                <CModalTitle>{ title }</CModalTitle>
              </CModalHeader>
              <CModalBody>
                { showModal == "customers" && <FormCustomer /> }
                { showModal == "products" && <Products /> }
                { showModal == "cash" && <Cash /> }
                { showModal == "close_checkout" && <CloseCheckout /> }
              </CModalBody>
            </CModal>
          </div>
      }
    </div>
  )
}

export default React.memo(AppBreadcrumb)
