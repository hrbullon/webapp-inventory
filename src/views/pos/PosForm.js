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

const PosForm = () => {

  const dispatch = useDispatch()
  const showModalCustomer = useSelector( (state) => state.showModalCustomer );
  const actionViewChanged = useSelector( (state) => state.actionViewChanged );
  const user = localStorage.getItem("user");
  const { token } = useContext(AuthContext);
  
  const [action, setAction] = useState("sales");
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);

  const [customer, setCustomer] = useState({
    name:"Haderson Bullon",
    dni:"V20203256",
    phone:"584246488813",
    address:" Por estas calles men"
  })

  const [sale, setSale] = useState({
    code:"----",
    date:"07/05/2023",
    total_amount:0,
    total_amount_converted:0,
    sale_details:[

    ]
  })

  useEffect(() => {
    if(actionViewChanged && actionViewChanged !== undefined){
      console.log(actionViewChanged);
      setAction(actionViewChanged);
    }
  }, [actionViewChanged])
  

  useEffect(() => {
      if(!visible){
        dispatch({ type: "set", showModalCustomer: false });
      }
  }, [visible])
  

  useEffect(() => {
    if(showModalCustomer){
      setVisible(true);
      setTitle("Agregar cliente");
    }
  }, [showModalCustomer])

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
            </div>
          </Fragment>
        }
    </div>
  )
}

export default PosForm
