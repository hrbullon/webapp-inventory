import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Sales = () => {
  return (
    <Fragment>
        <div className='row'>
            <div className='col'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Todas las ventas
                            <Link to="/sales/create" title="Agregar nueva venta" className="btn btn-primary float-end">Agregar</Link>
                        </h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Cliente</th>
                                    <th>Nro Control</th>
                                    <th>Fecha</th>
                                    <th>Monto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Sales

