import React from 'react'
import { Table } from './Table';

const Month = () => {
  return (
    <div className='row'>
        <div className='col'>
            <div className="card  mt-4">
                <div className="card-body">
                    <Table type="month" title="Listado de ventas mensual" fileName="Reporte-ventas-mensual"/>
                </div>
            </div>
        </div>
    </div>   
  )
}

export default Month;
