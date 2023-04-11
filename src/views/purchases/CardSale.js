import React from 'react'
import { formatCurrency } from 'src/helpers/helpers'

export const CardSale = ({ purchase }) => {
  return (
    <div className="card">
        <div className="card-body">
            <div className="mb-3">
                { <b>Nro#: {purchase.code}</b> } <br/>
                { <b>Fecha: {purchase.date}</b> } <br/>
                { <b>Monto Total: { formatCurrency(purchase.total_amount, true) }</b> } <br/>
                { <b>Monto Total: { formatCurrency( (purchase.total_amount/purchase.exchange_amount)) }</b> } <br/>
            </div>
        </div>
    </div>
  )
}
