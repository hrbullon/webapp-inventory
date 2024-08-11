import { formatCurrency } from 'src/helpers/helpers'

export const CardExchange = ({ exchange_amount }) => {
  return (
    <div className="card">
        <div className="card-body bg-info">
            { exchange_amount && 
                <b style={{ fontSize: "29px"}}>Tasa: {  formatCurrency(exchange_amount, true) }</b>
            }    
        </div>
    </div>
  )
}
