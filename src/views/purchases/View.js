import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formatCurrency, printHTML } from 'src/helpers/helpers';
import { Fragment } from 'react';

export const View = ({ data }) => {

    return (
    <Fragment>
        <div id='printDocument'> 
            <div className="row">
                <div className="col-xs-12 text-center">
                    <b>Empresa de Ventas</b><br/>
                    Calle Moquegua 430 <br/>
                    Tel. 481890 <br/>
                    Email:yonybrondy17@gmail.com
                </div>
            </div> 
            <div className="row mt-4">
                <div className="col-6">	
                    <ul className='list'>
                        <li><b>CLIENTE</b></li>
                        <li><b>Nombre:</b> { data.Customer.name}</li>
                        <li><b>Nro Documento:</b> { data.Customer.dni}</li>
                        <li><b>Telefono:</b>  { data.Customer.phone}</li>
                        <li><b>Direccion</b> { data.Customer.address}</li>
                    </ul>
                </div>	
                <div className="col-6">	
                    <ul className='list'>
                        <li><b>COMPROBANTE</b></li>
                        <li><b>Nro de Comprobante:</b> { data.code}</li>
                        <li><b>Fecha:</b> { data.date }</li>
                    </ul>
                </div>	
            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.SaleDetails.map( (detail,index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ detail.code }</td>
                                            <td>{ detail.description }</td>
                                            <td>{ detail.price }</td>
                                            <td>{ detail.quantity }</td>
                                            <td>{ detail.subtotal_amount }</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="text-right"><strong>Total:</strong></td>
                                <td>{ formatCurrency(data.total_amount) }</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <button className='btn btn-success float-end' onClick={ (e) => printHTML("printDocument") }>
                    <CIcon icon={ icon.cilPrint }/> Imprimir
                </button>
            </div>
        </div>
    </Fragment>
    
  )
}
