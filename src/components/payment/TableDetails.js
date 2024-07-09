import React from 'react'
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { confirmDelete, formatNumber } from 'src/helpers/helpers';
import { startDeletingPayment } from 'src/actions/payment';

export const TableDetails = ({ items }) => {

    const dispatch = useDispatch();

    const textAlignRight = {
        textAlign: "right"
    };

    const handleDeleteItem = (paymentId) => {

        confirmDelete(`Quiere eliminar el pago seleccionado?`, async () => {
            const saleId = localStorage.getItem('sale_id');
            dispatch( startDeletingPayment(saleId, paymentId) );
        });
    }

    return (
    <div className='table-container'>
        <h5 className="card-title">Detalles de pago</h5>
        <table className="table" style={ { fontSize: "12px" } }>
            <thead>
                <tr>
                    <th >#</th>
                    <th >Tipo de transacción</th>
                    <th >Referencia</th>
                    <th style={ textAlignRight }>Monto Bs.</th>
                    <th style={ textAlignRight }>Monto $USD</th>
                    <th style={ textAlignRight }>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map( (item, index) => {
                        return (
                            <tr key={ index }>
                                <td>{ index+1 }</td>
                                <td>{ item.payment_method }</td>
                                <td>{ item.reference }</td>
                                
                                <td style={ textAlignRight }>{ formatNumber(item.total_amount_converted) }</td>
                                <td style={ textAlignRight }>{ formatNumber(item.total_amount) }</td>
                                <td style={ textAlignRight }>
                                    <button onClick={ (e) => handleDeleteItem(item.payment_id) } className='btn btn-sm btn-danger'>
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
                    <td colSpan={3}></td>
                    <td style={ textAlignRight }><b>Total Bs.:</b></td>
                    <td style={ textAlignRight }>
                        <b>{ formatNumber(0) }</b>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}></td>
                    <td style={ textAlignRight }><b>Total $US:</b></td>
                    <td style={ textAlignRight }>
                        <b>{ formatNumber(0) }</b>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
