import React from 'react'
import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { confirmDelete, formatNumber } from 'src/helpers/helpers';

import { startDeletingSaleDetails } from 'src/actions/sales';

export const TableDetails = ({ items, model, setModel, doc, total = true}) => {

    const dispatch = useDispatch();

    const textAlignRight = {
        textAlign: "right"
    };

    const handleDeleteItem = (detail) => {
        confirmDelete(`Quiere eliminar la fila seleccionada?`, async () => { 
            dispatch( startDeletingSaleDetails(model.id, detail) );
        });
    }

    return (
    <div className='table-container'>
        <h5 className="card-title">Detalle de artículos</h5>
        <table className="table" style={ { fontSize: "12px" } }>
            <thead>
                <tr>
                    <th >#</th>
                    <th >Code</th>
                    <th >Serial</th>
                    <th >Artículo</th>
                    <th style={ textAlignRight }>Cantidad</th>
                    <th style={ textAlignRight }>Precio $US</th>
                    <th style={ textAlignRight }>Subtotal $US</th>
                    <th style={ textAlignRight }>Precio Bs</th>
                    <th style={ textAlignRight }>Subtotal Bs</th>
                    { doc == "purchase" && 
                    <th style={ textAlignRight }>Precio $US (Venta)</th>
                    }
                    { setModel &&
                        <th style={ textAlignRight }>Acciones</th>
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
                                <td>{ item.serial }</td>
                                <td>{ item.description }</td>
                                
                                <td style={ textAlignRight }>{ item.quantity }</td>
                                <td style={ textAlignRight }>{ formatNumber(item.price) }</td>
                                <td style={ textAlignRight }>{ formatNumber(item.subtotal_amount) }</td>
                                <td style={ textAlignRight }>{ formatNumber(item.price_converted) }</td>
                                <td style={ textAlignRight }>{ formatNumber(item.subtotal_amount_converted) }</td>
                                { doc == "purchase" && 
                                <td style={ textAlignRight }>{ formatNumber(item.salePrice) }</td>
                                }
                                { setModel &&
                                <td style={ textAlignRight }>
                                    <button onClick={ (e) => handleDeleteItem(item.id) } className='btn btn-sm btn-danger'>
                                        <CIcon icon={ icon.cilDelete }/>
                                    </button>
                                </td>}
                            </tr>
                        )
                    })
                }
            </tbody>
            { total && 
            <tfoot>
                <tr>
                    <td colSpan={8}></td>
                    <td style={ textAlignRight }><b>Total Bs.:</b></td>
                    <td style={ textAlignRight }>
                        <b>{ formatNumber(model.total_amount_converted) }</b>
                    </td>
                </tr>
                <tr>
                    <td colSpan={8}></td>
                    <td style={ textAlignRight }><b>Total $US:</b></td>
                    <td style={ textAlignRight }>
                        <b>{ formatNumber(model.total_amount) }</b>
                    </td>
                </tr>
            </tfoot>}
        </table>
    </div>
  )
}
