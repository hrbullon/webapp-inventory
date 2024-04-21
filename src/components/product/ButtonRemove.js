import { useDispatch } from 'react-redux';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { startDeletingProduct } from 'src/actions/product';

export const ButtonRemove = ({ product }) => {

    const dispatch = useDispatch();

    const handleDelete = (product) => dispatch( startDeletingProduct(product) );

    return (
        <button 
            className='btn btn-danger btn-block' 
            title='Eliminar producto'
            onClick={ (e) => handleDelete(product) } >

            <CIcon icon={ icon.cilTrash }/>

        </button>
    )
}
