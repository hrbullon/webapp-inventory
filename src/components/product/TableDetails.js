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
        <div className='row'>
            <div className='col-12'>
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
                        { total &&
                        <>
                        <tr>
                            <td colSpan={6} style={ textAlignRight }>Subtotal Bs.</td>
                            <td width={100} className='text-right'>{ formatNumber(model.subtotal_amount_converted) }</td>
                            <td style={ textAlignRight }>Subtotal Bs.</td>
                            <td style={ textAlignRight }>{ formatNumber(model.subtotal_amount) }</td>
                        </tr>
                        <tr>
                            <td colSpan={6} style={ textAlignRight }>Descuento Bs.</td>
                            <td width={100} className='text-right'>{ formatNumber(model.discount_amount_converted) }</td>
                            <td style={ textAlignRight }>Descuento Bs.</td>
                            <td style={ textAlignRight }>{ formatNumber(model.discount_amount) }</td>
                        </tr>
                        <tr>
                            <td colSpan={6} style={ textAlignRight }>Total Bs.</td>
                            <td width={100} className='text-right'>{ formatNumber(model.total_amount_converted) }</td>
                            <td style={ textAlignRight }>Total $USD.</td>
                            <td style={ textAlignRight }>{ formatNumber(model.total_amount) }</td>
                        </tr>
                        <tr>
                            <td colSpan={6} style={ textAlignRight }>Pagado Bs.</td>
                            <td width={100} className='text-right'>{ formatNumber(model.total_amount_paid_converted) }</td>
                            <td style={ textAlignRight }>Pagado $USD.</td>
                            <td style={ textAlignRight }>{ formatNumber(model.total_amount_paid) }</td>
                        </tr>
                        <tr>
                            <td colSpan={6} style={ textAlignRight }>Vuelto/Cambio Bs.</td>
                            <td width={100} className='text-right'>{ formatNumber(model.total_amount_change*model.exchange_amount) }</td>
                            <td style={ textAlignRight }>Vuelto/Cambio $USD.</td>
                            <td style={ textAlignRight }>{ formatNumber(model.total_amount_change) }</td>
                        </tr>
                        </>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
