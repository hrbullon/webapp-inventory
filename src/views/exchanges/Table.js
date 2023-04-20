import React, { Fragment } from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import DataTable from 'react-data-table-component';

import config from '../../config/config.json';

import EclipseComponent from 'src/components/loader/EclipseComponent';
import { FormSearch } from './FormSearch';
import { deleteExchange } from 'src/services/exchangesServices';
import { formatCurrency } from 'src/helpers/helpers';

export const Table = ({ setExchange, exchanges, setExchanges, data }) => {

    const columns = [
        {
            name: 'Desccripción',
            sortable:true,
            selector: row => row.description,
        },
        {
            name: 'Fecha',
            sortable:true,
            selector: row => row.date,
        },
        {
            name: 'Monto',
            sortable:true,
            selector: row => formatCurrency(row.amount, true),
        },
        {
            name: 'Acciones',
            sortable:true,
            right: true,
            selector: row => {
                return (
                    <Fragment>
                        <button onClick={ (e) => setExchange(row) } className='btn btn-sm btn-primary m-2'>
                            <CIcon icon={ icon.cilPencil }/>
                        </button>
                        {/* <button onClick={ (e) => handleDeleteExchange(row) } className='btn btn-sm btn-danger'>
                            <CIcon icon={ icon.cilDelete }/>
                        </button> */}
                    </Fragment>
                )
            },
        }
    ]

    const handleDeleteExchange= async (exchange) => {

        const res = await deleteExchange(exchange.id);
    
        if(res.exchange){
          const filtered = exchanges.filter( item => item.id !== exchange.id );
          setExchanges(filtered);
          swal("Listo","Datos eliminados!!","success");
        }
    }
    
    return (

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Listado de tasas de cambio</h5>
                
                <FormSearch setExchanges={ setExchanges } rows={data}/>    

                <DataTable 
                    columns={columns}
                    data={exchanges}
                    progressComponent={ <EclipseComponent/> }
                    paginationComponentOptions={ config.paginationComponentOptions }
                    noDataComponent={"No hay datos para mostrar"}/>  
            </div>
        </div>
    )
}
