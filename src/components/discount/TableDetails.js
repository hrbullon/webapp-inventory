import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeletingDiscount, startGettingDiscountBySale } from 'src/actions/discount';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { confirmDelete, formatNumber } from 'src/helpers/helpers';

export const TableDetails = ({ saleId }) => {

    const dispatch = useDispatch();
    const discounts = useSelector(( state ) => state.discounts );

    const textAlignRight = {
        textAlign: "right"
    };

    useEffect(() => {
      dispatch( startGettingDiscountBySale(saleId) );
    }, [])

    const handleDeleteDiscount = (id) => {
        confirmDelete(`Quiere eliminar el descuento seleccionado?`, async () => { 
            dispatch( startDeletingDiscount(saleId, id) );
        });
    }
    
    return (
    <>
        <h6 className="card-title text-center">Descuentos aplicados</h6>
        <table className="table" style={ { fontSize: "12px" } }>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Porc. %</th>
                    <th style={ textAlignRight }>Monto $USD</th>
                    <th style={ textAlignRight }>Monto Bs.</th>
                    <th style={ textAlignRight }>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                { discounts &&
                    discounts.map( (item, index) => {
                        return (
                            <tr key={ index }>
                                <td>{ index+1 }</td>
                                <td>{ item.percentage }</td>
                                
                                <td style={ textAlignRight }>{ formatNumber(item.discount) }</td>
                                <td style={ textAlignRight }>{ formatNumber(item.discount_converted) }</td>
                                <td style={ textAlignRight }>
                                    <button 
                                        onClick={ (e) => handleDeleteDiscount(item.id) }
                                        className='btn btn-sm btn-danger'>
                                        <CIcon icon={ icon.cilDelete }/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  )
}
