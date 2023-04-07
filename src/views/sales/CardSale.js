import React from 'react'
import { formatCurrency } from 'src/helpers/helpers'

export const CardSale = ({ sale }) => {
  return (
    <div className="card">
        <div className="card-body">
            <div className="mb-3">
                { <b>Nro#: {sale.code}</b> } <br/>
                { <b>Fecha: {sale.date}</b> } <br/>
                { <b>Monto Total: { formatCurrency(sale.total_amount, true) }</b> } <br/>
                { <b>Monto Total: { formatCurrency( (sale.total_amount/sale.exchange_amount)) }</b> } <br/>
            </div>
        </div>
    </div>
  )
}
