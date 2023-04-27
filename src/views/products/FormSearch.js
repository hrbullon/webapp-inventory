import React from 'react';
import { useDispatch } from 'react-redux';
import { startGettingProducts } from '../../actions/product';

export const FormSearch = () => {

    const dispatch = useDispatch()

    const handleFilter = (product) => { dispatch( startGettingProducts({ search: product }) ) }

    return (
        <form>
            <div className='row mt-4'>
                <div className='col-12'>
                    <input type="text" className='form-control' autoComplete='off' onKeyUp={ (e) => handleFilter(e.target.value) }  placeholder='Buscar producto por código/nombre/descripción'/>  
                </div>
            </div>  
        </form>
    )
}
