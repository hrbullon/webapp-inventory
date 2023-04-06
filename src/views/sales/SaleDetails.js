import React from 'react'

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { deleteItem } from 'src/helpers/helpers';

export const SaleDetails = ({ items, sale, setSale }) => {

    const handleDeleteItem = (item) => {

        const filtered = deleteItem(items, item);
        setSale({ ...sale, 
            sale_details: [ ...filtered]
        })
    }

    return (
    <div>
        <h5 className="card-title">Detalle de artículos</h5>
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Artículo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map( (item, index) => {
                        return (
                            <tr key={ item.id }>
                                <td>{ index+1 }</td>
                                <td>{ item.description }</td>
                                <td>{ item.quantity }</td>
                                <td>{ item.price }</td>
                                <td>{ item.subtotal_amount }</td>
                                <td>
                                    <button onClick={ (e) => handleDeleteItem(item) } className='btn btn-sm btn-danger'>
                                        <CIcon icon={ icon.cilDelete }/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
