import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { confirmDelete, printHTML } from 'src/helpers/helpers';

import { 
  startClosingTransactionCheckout,
  startGettingTransactionsBySession, 
  startGettingTransactionsSummary } from 'src/actions/transaction';
import { formatCurrency } from 'src/helpers/helpers';
import { formatNumber } from 'src/helpers/helpers';
import { TodaySummary } from '../sales/report/TodaySummary';
import moment from 'moment';
import { generateSummarySalesReport } from 'src/reports/pdf/summary_sales_report';
import { AuthContext } from 'src/context/AuthContext';

export const CloseCheckout = () => {

  const dispatch = useDispatch();

  const { company } = useContext(AuthContext);

  const today = moment().format("YYYY-MM-DD");
  const date = new Date(Date.now()).toLocaleDateString();
  const sessionPOS = localStorage.getItem("session_pos");
  const [startedSessionPos] = useState(localStorage.getItem("started_session_pos"));

  const [counterSales, setCounterSales] = useState(0);
  const [openAmount, setOpenAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountChange, setTotalAmountChange] = useState(0);
  const [realTotalAmountSale, setRealTotalAmountSale] = useState(0);
  const [endingCashBalance, setEndingCashBalance] = useState(0);

  const transactions = useSelector((state) => state.transactions);
  const transactionSummary = useSelector((state) => state.transactionSummary);
  const salesSummary = useSelector((state) => state.salesSummary );
  const paymentSummary = useSelector((state) => state.paymentSummary );
  const checkoutClosed = useSelector((state) => state.checkoutClosed );

  useEffect(() => {

    dispatch( startGettingTransactionsBySession(sessionPOS) );
    dispatch( startGettingTransactionsSummary(sessionPOS, today) );

  }, [])

  useEffect(() => {
    
    if(transactionSummary){

      let { 
        total_amount_cash_starting, 
        count_sales, 
        total_amount_sales, 
        total_amount_change, real_total_sale, 
        total_amount_cash_ending } = transactionSummary;

        setCounterSales(count_sales);
        setTotalAmount(total_amount_sales);
        setRealTotalAmountSale(real_total_sale);
        setTotalAmountChange(total_amount_change);
        setOpenAmount(total_amount_cash_starting);
        setEndingCashBalance(total_amount_cash_ending);
    }

  }, [transactionSummary]);

  useEffect(() => {

    if(checkoutClosed){
      localStorage.setItem('started_session_pos', false);
      window.location.reload();
    }
  }, [checkoutClosed])
  
  const generateSummarySalesReportPDF = async () =>  {
    generateSummarySalesReport(company, salesSummary, paymentSummary, transactionSummary);
  }

  const closeCheckout = async () => {
    confirmDelete(`Quiere cerrar la caja`, async () => { 
      dispatch( startClosingTransactionCheckout(sessionPOS, today) )
    })
  }
  
  return (
    <Fragment>
      <div className='card'>
        <div className='row'>
            <div className='col'>
              { startedSessionPos == "true" && 
              <button className='btn btn-danger float-end m-1' onClick={ closeCheckout }>
                <CIcon icon={ icon.cilLockLocked }/> Cerrar caja
              </button>}
              <button className='btn btn-success float-end m-1' onClick={ (e) => printHTML("printDocument") }>
                <CIcon icon={ icon.cilPrint }/> Imprimir
              </button>
              <button onClick={ () => generateSummarySalesReportPDF() } className='btn btn-warning float-end m-1' title='Descargar Reporte de Ventas X' >
                <CIcon icon={icon.cibAdobeAcrobatReader} /> Descargar Reporte
              </button>
            </div>
        </div>
        <div id='printDocument' className='card-body'>
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
                <td>{ formatNumber(counterSales) }</td>
              </tr>
              <tr>
                <td>Total $US (inicio):</td>
                <td></td>
                <td>{ formatCurrency(openAmount) }</td>
              </tr>
              <tr>
                <td>Monto Cobrado por Ventas:</td>
                <td></td>
                <td>{ formatCurrency(totalAmount) }</td>
              </tr>
              <tr>
                <td>Monto Vueltos/Cambios:</td>
                <td></td>
                <td>{ formatCurrency(totalAmountChange) }</td>
              </tr>
              <tr>
                <td>Monto Real Ventas:</td>
                <td></td>
                <td>{ formatCurrency(realTotalAmountSale) }</td>
              </tr>
              <tr>
                <td>Total Efectivo $US en caja:</td>
                <td></td>
                <td><b>{ formatCurrency(endingCashBalance) }</b></td>
              </tr>
            </tbody>
          </table>
          <br/>
          <h5 style={{ textAlign:"center" }}>Detalle de transacciones</h5>
          <br/>
          <table className='table'>
            <thead>
              <tr>
                <th width="300px">Código</th>
                <th width="600px">Descripción</th>
                <th width="400px">Ingreso</th>
                <th width="400px">Egreso</th>
              </tr>
            </thead>
            <tbody>
              { transactions &&
                transactions.map( item => {
                  return (<tr  key={ item.id }>
                      <td>{ item.Transaction.name }</td>
                      <td>{ item.note }</td>
                      <td className='table-success'>{ item.total_amount_in }</td>
                      <td className='table-danger'>{ item.total_amount_out }</td>
                    </tr>)
                })
              }
            </tbody>
          </table>

          <div className='row'>
            <TodaySummary checkoutId={ sessionPOS } today={ today }/>
          </div>
        </div> 
      </div> 
    </Fragment>
  )
}

export default CloseCheckout;
