import React from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { formatCurrency, printHTML } from 'src/helpers/helpers';
import { Fragment } from 'react';
import { TableDetails } from 'src/components/product/TableDetails';

export const Document = ({ data, details }) => {

    return (
    <Fragment>
        <div id='printDocument'> 
            <div className="row">
                <div className="col-xs-12 text-center">
                    <b>TU ELECTRONIC IMPORT G.R, C.A</b><br/>
                    AV AVENIDA 15 DELICIAS CON CALLE 100 AV LIBERTADOR LOCAL <br/>
                    Centro Comercial - Gran Bazar<br/> Local ML-1144
                    Tel. +58 424-6170748 <br/>
                    tuelectronicimport@gmail.com<br/>
                    @tuelectronicimport
                </div>
            </div> 
            <div className="row mt-4">
                {  data.Customer &&  
                <div className="col-6">	
                    <ul className='list'>
                        <li><b>CLIENTE</b></li>
                        <li><b>Nombre:</b> { data.Customer.name}</li>
                        <li><b>Nro Documento:</b> { data.Customer.dni}</li>
                        <li><b>Telefono:</b>  { data.Customer.phone}</li>
                        <li><b>Direccion</b> { data.Customer.address}</li>
                    </ul>
                </div>}	
                <div className="col-6">	
                    <ul className='list'>
                        <li><b>COMPROBANTE</b></li>
                        <li><b>Nro de Comprobante:</b> { data.code}</li>
                        <li><b>Fecha:</b> { data.date }</li>
                        <li><b>Tasa Cambio:</b> { formatCurrency(data.exchange_amount,true) }</li>
                    </ul>
                </div>	
            </div>
            <div className="row">
                <div className="col-12 mt-4">
                    <TableDetails items={ details } model={data} setModel={null}/>
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
