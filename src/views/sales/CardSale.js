import React from 'react'

export const CardSale = ({ sale }) => {
  return (
    <div className="card">
        <div className="card-body">
            <h5 className="card-title">Detalle Factura</h5>
            <div className="mb-3">
                { <b>Nro#: {sale.code}</b> } <br/>
                { <b>Fecha: {sale.date}</b> } <br/>
                { <b>Monto Total: {sale.total_amount}</b> } <br/>
            </div>
        </div>
    </div>
  )
}
