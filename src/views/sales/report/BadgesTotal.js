import React from 'react'
import { CWidgetStatsB } from '@coreui/react'
import { formatCurrency } from 'src/helpers/helpers'

export const BadgesTotal = ({ bestSeller, totalQuantity, totalSales, aveExchange  }) => {

    return (
    <div className='row mt-5 justify-content-end'>
        <div className='col-3'>
            <CWidgetStatsB
                className="mb-3"
                progress={{ color: 'success', value: 100 }}
                text="Mas vendido"
                title={ bestSeller.description }
                value={ bestSeller.quantity }
            />
        </div>
        <div className='col-3'>
            <CWidgetStatsB
                className="mb-3"
                progress={{ color: 'success', value: 100 }}
                text="Productos vendidos"
                title="Total productos"
                value={ totalQuantity }
            />
        </div>
        <div className='col-3'>
            <CWidgetStatsB
                className="mb-3"
                progress={{ color: 'success', value: 100 }}
                text="Monto acumulado"
                title="Total de ventas"
                value={ formatCurrency(totalSales) }
            />
        </div>
        <div className='col-3'>
            <CWidgetStatsB
                className="mb-3"
                progress={{ color: 'info', value: 100 }}
                text="Tasa de cambio promedio"
                title="Tasa de cambio"
                value={ formatCurrency(aveExchange, true) }
            />
        </div>
    </div>
  )
}
