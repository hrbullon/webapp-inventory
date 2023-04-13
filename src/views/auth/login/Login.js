import React, { useEffect, useContext } from 'react';

import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'

import CIcon from '@coreui/icons-react';

import { cilLockLocked, cilUser } from '@coreui/icons'
import { CardMessage } from './CardMessage';
import { login } from 'src/services/authServices';

import { AuthContext } from 'src/context/AuthContext';

const Login = () => {

  const {register, handleSubmit, reset, formState: { errors } } = useForm();

  const { token } = useContext(AuthContext);
  
  useEffect(() => {
 
    if(token){
      window.location.href = "/";
    }
    
  }, [token]);

  const onSubmit = async data => {

    const res = await login(data);

    if(res.token){
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    }else{
      swal("Error!", res.message, "warning");
    }

  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      { !token &&
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={ handleSubmit(onSubmit)} >
                    <h1>Iniciar sesión</h1>
                    <p className="text-medium-emphasis">Ingresa tus datos de acceso</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      
                      <input 
                        type="text"
                        name='account' 
                        className='form-control'
                        placeholder="Usuario" 
                        required
                        {...register("account", { required: true })}
                        autoComplete="off" />
                        </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      
                      <input
                        type="password"
                        name='password'
                        required
                        className='form-control'
                        {...register("password", { required: true })}
                        placeholder="Contraseña"
                        autoComplete='password'
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Entrar
                        </CButton>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CardMessage />
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>}
    </div>
  )
}

export default Login
