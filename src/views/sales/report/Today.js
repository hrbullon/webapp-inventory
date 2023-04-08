import React from 'react'
import { Table } from './Table';

const Today = () => {
  return (
    <div className='row'>
        <div className='col'>
            <div className="card  mt-4">
                <div className="card-body">
                    <Table type="today" title="Listado de ventas diarias" fileName="Reporte-ventas-diarias"/>
                </div>
            </div>
        </div>
    </div>   
  )
}

export default Today;