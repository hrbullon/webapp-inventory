import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import routes from '../routes/main.routes';

import { 
  CBreadcrumb, 
  CBreadcrumbItem, 
  CTooltip } from '@coreui/react'

import { AuthContext } from 'src/context/AuthContext';
import { startCheckingStarted } from 'src/actions/transaction';
import { text } from 'src/strings';

import { ADMIN_ROLE, STANDARD_ROLE } from "../constants/variables";

const AppBreadcrumb = () => {

  const dispatch = useDispatch();
  const context = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const started_session_pos = JSON.parse(localStorage.getItem("started_session_pos"));
  const currentLocation = useLocation().pathname;

  useEffect( ()=> {
        
    if(context.user.role == STANDARD_ROLE){
      
      let started = dispatch( startCheckingStarted( localStorage.getItem("checkoutId")) );
      
      started.then( resp => {
        if(resp.transaction.transaction_id == "1" && window.location.hash == "" ){
            localStorage.setItem("session_pos", resp.transaction.checkout_session_id);
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

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <div>
      { user.role == ADMIN_ROLE &&
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
      { user.role == STANDARD_ROLE && started_session_pos &&
          <div style={{ display: "flex" }}>
            <Link to={ "sales/today" }>
              <div className="card">
                <div className="card-body">
                  <CTooltip content={ text.sold_products }>
                    <CIcon icon={ icon.cilMoney } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "sales/today/summary" }>
              <div className="card">
                <div className="card-body">
                  <CTooltip content={ text.daily_sales_report }>
                    <CIcon icon={ icon.cilList } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "/pos" }>
              <div className="card" >
                <div className="card-body">
                  <CTooltip content={ text.pos }>
                    <CIcon icon={ icon.cilCart } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "customers/create" }>
              <div className="card">
                <div className="card-body">
                  <CTooltip content={ text.add_customer }>
                    <CIcon icon={ icon.cilUserPlus } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "cash" }>
              <div className="card">
                <div className="card-body">
                  <CTooltip content={ text.in_out_cash }>
                    <CIcon icon={ icon.cilDollar } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "products" }>
              <div className="card">
                <div className="card-body">
                  <CTooltip content={ text.find_products }>
                    <CIcon icon={ icon.cilSearch } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
            <Link to={ "checkout/transactions" }>
              <div className="card">
                <div className="card-body">
                  <CTooltip content={ text.close_checkout }>
                    <CIcon icon={ icon.cilLockLocked } size='xxl'/>
                  </CTooltip>
                </div>
              </div>
            </Link>
          </div>
      }
    </div>
  )
}

export default React.memo(AppBreadcrumb)
