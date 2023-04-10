import React, { useEffect, useContext } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { AuthContext } from 'src/context/AuthContext'
import { Fragment } from 'react';

const DefaultLayout = () => {

  const { token } = useContext(AuthContext);
  
  useEffect(() => {
 
    if(!token){
      window.location.href = "/#/auth/login";
    }
    
  }, [token]);

  return (
    <div>
      { 
        token &&
          <Fragment>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <AppContent />
              </div>
              <AppFooter />
            </div>
          </Fragment>
        }
    </div>
  )
}

export default DefaultLayout
