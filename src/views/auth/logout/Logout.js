import React, { useEffect } from 'react';

import {
  CCol,
  CContainer,
  CRow,
  CSpinner
} from '@coreui/react';

export const Logout = () => {
  
  useEffect(() => {
    //Data from localstorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("session_pos");
    localStorage.removeItem("started_session_pos");
    
    setTimeout(() => {
        window.location.href = "/#/auth/login";    
    }, 2000);
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
            <h1 className="float-start display-4 me-4">
                <CSpinner/>
            </h1>
            <h4 className="pt-3">Se está cerrando tu sesión ahora!</h4>
            <p className="text-medium-emphasis float-start">
                Gracias por usar nuestra plataforma de ventas!!
            </p>
          </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

