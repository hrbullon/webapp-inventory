import React, { useState, useEffect,useContext, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { printHTML } from 'src/helpers/helpers';

import { AuthContext } from 'src/context/AuthContext';
import { startGettingTransactionsByCheckoutId } from 'src/actions/transaction';
import { formatCurrency } from 'src/helpers/helpers';
import { formatNumber } from 'src/helpers/helpers';

export const CloseCheckout = () => {

  const dispatch = useDispatch();
  const date = new Date(Date.now()).toLocaleDateString();
  const checkoutId = localStorage.getItem("checkoutId");

  const { company } = useContext(AuthContext);
  const [counter, setCounter] = useState(0)
  const [totalCash, setTotalCash] = useState(0)
  const [openAmount, setOpenAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch( startGettingTransactionsByCheckoutId(checkoutId) );
  }, [])


  useEffect(() => {
    if(transactions && transactions !== undefined){

      let open = 0;
      let counter = 0;
      let cash = 0;

      const totalAmount = transactions.reduce((acc, transaction) => {

        if(transaction.transaction_id === 1 && !open){
          open = true;
          setOpenAmount(transaction.amount);
        }
        
        if(transaction.transaction_id === 3){
          cash += parseFloat(transaction.amount);
        }
        
        if(transaction.transaction_id === 4){
          cash -= parseFloat(transaction.amount);
        }
        
        if (transaction.transaction_id === 5) {
          counter++;
          
          return acc + parseFloat(transaction.amount);
        } else {
          return acc;
        }
      }, 0);

      setTotalCash(cash);
      setCounter(counter);
      setTotalAmount(totalAmount);
    }
    

  }, [transactions])

  return (
    <Fragment>
      <div id='printDocument'> 
        <div className="row">
            <div className="col-xs-12 text-center">
                <b>{ company.name }</b><br/>
                { company.address } <br/>
                { company.phone } <br/>
                { company.email }<br/>
                { company.web }
            </div>
        </div> <br/>
        <h5 style={{ textAlign:"center" }}>Resumen de ventas</h5>
        <table>
          <tbody>
            <tr>
              <td>Fecha:</td>
              <td></td>
              <td>{ date }</td>
            </tr>
            <tr>
              <td width="400px">Total ventas:</td>
              <td></td>
              <td>{ formatNumber(counter) }</td>
            </tr>
            <tr>
              <td>Monto total de ventas:</td>
              <td></td>
              <td>{ formatCurrency(totalAmount) }</td>
            </tr>
            <tr>
              <td>Total $US (inicio):</td>
              <td></td>
              <td>{ formatCurrency(openAmount) }</td>
            </tr>
            <tr>
              <td>Total $US (final):</td>
              <td></td>
              <td>{ formatCurrency(totalCash) }</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <h5 style={{ textAlign:"center" }}>Detalle de transacciones</h5>
        <br/>
        <table>
          <thead>
            <tr>
              <th width="300px">Código</th>
              <th width="600px">Descripción</th>
              <th width="400px">Monto</th>
            </tr>
          </thead>
          <tbody>
            { transactions &&
              transactions.map( item => {
                return (<tr  key={ item.id }>
                    <td>{ item.Transaction.name }</td>
                    <td>{ item.note }</td>
                    <td>{ item.amount }</td>
                  </tr>)
              })
            }
          </tbody>
        </table>
      </div>
      <div className='row'>
          <div className='col'>
            <button className='btn btn-success float-end m-1' onClick={ (e) => printHTML("printDocument") }>
              <CIcon icon={ icon.cilPrint }/> Imprimir
            </button>
          </div>
      </div>
    </Fragment>
  )
}

export default CloseCheckout;
