import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGettingPaymentSummary } from 'src/actions/payment';
import { startGettingSaleSummary } from 'src/actions/sales';
import { formatNumber } from 'src/helpers/helpers';

export const TodaySummary = ( { checkoutSessionId } ) => {

    const dispatch = useDispatch();
    const salesSummary = useSelector((state) => state.salesSummary );
    const paymentSummary = useSelector((state) => state.paymentSummary );

    useEffect(() => {
        dispatch( startGettingSaleSummary(checkoutSessionId) );
        dispatch( startGettingPaymentSummary(checkoutSessionId) );
    }, [])

    const getTotal = (items, column) => {
        
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += parseFloat(items[i][column]);
        }
        return total;
    }
 
    return (

    <div className='bg-white'>

        <h5>Ventas</h5>
        { salesSummary && 
            <table className='table table-bordered table-stripped'>
                <tbody>
                    <tr>
                        <th>Producto</th>
                        <th className='text-right'>Cantidad</th>
                        <th className='text-right'>Total $USD</th>
                        <th className='text-right'>Total Bs</th>
                    </tr>
                    {
                        salesSummary.map( sale => {
                            return <tr key={ sale.id }>
                                <td>{ sale.product }</td>
                                <td className='text-right'>{ sale.quantity }</td>
                                <td className='text-right'>{ formatNumber(parseFloat(sale.total_amount)) }</td>
                                <td className='text-right'>{ formatNumber(parseFloat(sale.total_amount_converted)) }</td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th className='text-right'><b>{ formatNumber(getTotal(salesSummary, 'quantity')) }</b></th>
                        <th className='text-right'><b>{ formatNumber(getTotal(salesSummary, 'total_amount')) }</b></th>
                        <th className='text-right'><b>{ formatNumber(getTotal(salesSummary, 'total_amount_converted')) }</b></th>
                    </tr>
                </tfoot>
            </table>
        }

        <h5>Pagos</h5>
        
        { paymentSummary && 
            <table className='table table-bordered table-stripped'>
                <thead>
                
                </thead>
                <tbody>
                    <tr>
                        <th>Tipo de pago</th>
                        <th className='text-right'>Monto $USD</th>
                        <th className='text-right'>Monto Bs.</th>
                    </tr>
                    {
                        paymentSummary.map( payment => {
                            return <tr>
                                <td>{ payment.payment_method }</td>
                                <td className='text-right'>{ formatNumber( parseFloat(payment.total_amount)) }</td>
                                <td className='text-right'>{ formatNumber( parseFloat(payment.total_amount_converted)) }</td>
                            </tr>
                        })
                    }
                    <></>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th className='text-right'><b>{ formatNumber(getTotal(paymentSummary, 'total_amount')) }</b></th>
                        <th className='text-right'><b>{ formatNumber(getTotal(paymentSummary, 'total_amount_converted')) }</b></th>
                    </tr>
                </tfoot>
            </table>
        }
    </div>
  )
}
