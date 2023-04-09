import React from 'react';
import { Link } from 'react-router-dom';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { CButton, CCard, CCardBody } from '@coreui/react'

export const CardMessage = () => {
  return (
    <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
        <CCardBody className="text-center">
            <div>
            <CIcon icon={ icon.cilMoodGood } size="xxl"/>
            <p>
            ¡Bienvenidos a nuestro sistema de ventas! Estamos muy contentos de que hayan decidido unirse a nuestra comunidad y elegirnos para manejar sus ventas. 
            </p>
            <Link to="/register">
                <CButton color="primary" className="mt-3" active tabIndex={-1}>
                Síguenos
                </CButton>
            </Link>
            </div>
        </CCardBody>
    </CCard>
  )
}
