import React, { useContext, Fragment } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { printHTML } from 'src/helpers/helpers';

import { AuthContext } from 'src/context/AuthContext';

export const CloseCheckout = () => {

  const { company } = useContext(AuthContext);

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
              <td>14/05/2023</td>
            </tr>
            <tr>
              <td width="400px">Total ventas:</td>
              <td></td>
              <td>$90.00</td>
            </tr>
            <tr>
              <td>Monto total de ventas:</td>
              <td></td>
              <td>$90.00</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <h5 style={{ textAlign:"center" }}>Detalle de transacciones</h5>
        <br/>
        <table>
          <thead>
            <tr>
              <th width="100px">Código</th>
              <th width="300px">Descripción</th>
              <th width="200px">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>Producto 1</td>
              <td>$50.00</td>
            </tr>
            <tr>
              <td>002</td>
              <td>Producto 2</td>
              <td>$25.00</td>
            </tr>
            <tr>
              <td>003</td>
              <td>Producto 3</td>
              <td>$15.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='row'>
          <div className='col'>
            <button className='btn btn-success float-end m-1' onClick={ (e) => printHTML("printDocument") }>
              <CIcon icon={ icon.cilPrint }/> Imprimir
            </button>
            <button className='btn btn-primary float-end m-1' onClick={ (e) => printHTML("printDocument") }>
                <CIcon icon={ icon.cilCog }/> Ejecutar cierre
            </button>
          </div>
      </div>
    </Fragment>
  )
}

export default CloseCheckout;
