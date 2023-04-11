import React from 'react'

export const CardBasic = ({ customer }) => {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Datos básicos</h5>
            { customer &&
            <div className="mb-3">
                <b>Nombre:</b> { customer.name }<br/>
                <b>Dni/Cédula:</b> { customer.dni } <br/>
                <b>Nro Tlf.:</b> { customer.phone } <br/>
                <b>Dirección:</b> { customer.address } 
            </div> }
        </div>
    </div>
  )
}
