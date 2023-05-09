import React, { useState, useEffect, useContext } from 'react'
import { AppFooter, AppHeader } from '../../components/index'

import { AuthContext } from 'src/context/AuthContext'
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form as FormSale } from '../sales/Form';
import { Form as FormCustomer } from '../customers/Form';
import Today from '../sales/report/Today';
import { Cash } from './Cash';
import Products from '../products/Products';
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';

const PosForm = () => {

  const dispatch = useDispatch()
  const showModal = useSelector( (state) => state.showModal );
  const actionViewChanged = useSelector( (state) => state.actionViewChanged );
  const user = localStorage.getItem("user");
  const { token } = useContext(AuthContext);
  
  const [action, setAction] = useState("sales");
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(actionViewChanged && actionViewChanged !== undefined){
      setAction(actionViewChanged);
    }
  }, [actionViewChanged])
  

  useEffect(() => {
      if(!visible){
        dispatch({ type: "set", showModal: false });
      }
  }, [visible])

  useEffect(() => {
    if(showModal && showModal !== undefined){
      setVisible(true)

      const titles = {
        customers:"Agregar cliente",
        products: "Buscar producto",
        cash: "Entrada/Salida de efectivo"
      };

      setTitle( titles[showModal] );

    }
}, [showModal])

  useEffect(() => {
    const role  = JSON.parse(user).role;
    if(role == "STD_ROLE"){
      dispatch({ type: "set", sidebarShow: false });
    }
  }, [user])
  

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
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                  { action == "today" && <Today /> }
                  { action == "sales" && <FormSale /> }
              </div>
              <AppFooter />
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
          </Fragment>
        }
    </div>
  )
}

export default PosForm
