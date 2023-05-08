import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { formatNumber } from 'src/helpers/helpers';

export const TableDetails = ({ items, model, setModel, doc}) => {

    const handleDeleteItem = (index) => {
        
        items.splice(index, 1);

        let total = 0;
        let totalConverted = 0;

        items.map( item => {  total += item.subtotal_amount });
        items.map( item => {  totalConverted += item.subtotal_amount_converted });
        
        setModel({ ...model, 
            total_amount: total,
            total_amount_converted: totalConverted,
            details: [ ...items]
        })
    }

    return (
    <div className='table-container'>
        <h5 className="card-title">Detalle de artículos</h5>
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Artículo</th>
                    <th className='text-right'>Cantidad</th>
                    
                    <th className='text-right'>Precio $US</th>
                    <th className='text-right'>Subtotal $US</th>
                    
                    <th className='text-right'>Precio Bs</th>
                    <th className='text-right'>Subtotal Bs</th>
                    { doc == "purchase" && 
                    <th className='text-right'>Precio $US (Venta)</th>
                    }
                    { setModel &&
                        <th className='text-right'>Acciones</th>
                    }
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
                                
                                <td className='text-right'>{ formatNumber(item.price) }</td>
                                <td className='text-right'>{ formatNumber(item.subtotal_amount) }</td>
                                
                                <td className='text-right'>{ formatNumber(item.price_converted) }</td>
                                <td className='text-right'>{ formatNumber(item.subtotal_amount_converted) }</td>
                                { doc == "purchase" && 
                                <td className='text-right'>{ formatNumber(item.salePrice) }</td>
                                }
                                { setModel &&
                                <td className='text-right'>
                                    <button onClick={ (e) => handleDeleteItem(index) } className='btn btn-sm btn-danger'>
                                        <CIcon icon={ icon.cilDelete }/>
                                    </button>
                                </td>}
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td className='text-right' colSpan={7}><b>Total Bs.:</b></td>
                    <td className='text-right'>
                        <b>{ formatNumber(model.total_amount_converted) }</b>
                    </td>
                </tr>
                <tr>
                    <td className='text-right' colSpan={7}><b>Total $US:</b></td>
                    <td className='text-right'>
                        <b>{ formatNumber(model.total_amount) }</b>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
