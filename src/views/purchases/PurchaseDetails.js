import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { formatCurrency } from 'src/helpers/helpers';

export const PurchaseDetails = ({ items, purchase, setPurchase }) => {

    const handleDeleteItem = (index) => {
        items.splice(index, 1);
        setPurchase({ ...purchase, 
            purchase_details: [ ...items]
        })
    }

    return (
    <div>
        <h5 className="card-title">Detalle de artículos</h5>
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Artículo</th>
                    <th className='text-right'>Cantidad</th>
                    <th className='text-right'>Precio</th>
                    <th className='text-right'>Subtotal</th>
                    <th className='text-right'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map( (item, index) => {
                        return (
                            <tr key={ index }>
                                <td>{ index+1 }</td>
                                <td>{ item.code }</td>
                                <td>{ item.description }</td>
                                <td className='text-right'>{ item.quantity }</td>
                                <td className='text-right'>{ formatCurrency(item.price, true) }</td>
                                <td className='text-right'>{ formatCurrency(item.subtotal_amount, true) }</td>
                                <td className='text-right'>
                                    <button onClick={ (e) => handleDeleteItem(index) } className='btn btn-sm btn-danger'>
                                        <CIcon icon={ icon.cilDelete }/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td className='text-right' colSpan={5}><b>Total:</b></td>
                    <td className='text-right'>
                        <b>{ formatCurrency(purchase.total_amount,true) }</b>
                    </td>
                </tr>
                <tr>
                    <td colSpan={5}></td>
                    <td className='text-right'>
                        <b>{ formatCurrency( (purchase.total_amount/purchase.exchange_amount)) }</b>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
