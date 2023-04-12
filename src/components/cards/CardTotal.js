import React from 'react'
import { formatCurrency } from 'src/helpers/helpers'

export const CardTotal = ({ model }) => {
  return (
    <div className="card">
        <div className="card-body">
            <div className="mb-3">
                { <b>Nro#: {model.code}</b> } <br/>
                { <b>Fecha: {model.date}</b> } <br/>
                { <b>Monto Total: { formatCurrency(model.total_amount) }</b> } <br/>
                { <b>Monto Total: { formatCurrency(model.total_amount_converted, true) }</b> } <br/>
            </div>
        </div>
    </div>
  )
}
