import React from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { deleteCategory } from 'src/services/categoriesServices';

export const Table = ({ categories, setCategory, setCategories }) => {

    const handleDeleteCategory = async (category) => {

        const res = await deleteCategory(category.id);
    
        if(res.category){
          const filtered = categories.filter( item => item.id !== category.id );
          setCategories(filtered);
          swal("Listo","Datos eliminados!!","success");
        }
    }
    
    return (
    <table className="table">
        <thead>
            <tr>
                <th>Nro</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                categories.map(  (category, index) => {
                    return (
                        <tr key={ category.id }>
                            <td>{ (index+1) }</td>
                            <td width={100}>{ category.name }</td>
                            <td>
                                <button onClick={ (e) => setCategory(category) } className='btn btn-sm btn-primary'>
                                    <CIcon icon={ icon.cilPencil }/>
                                </button>
                                <button onClick={ (e) => handleDeleteCategory(category) } className='btn btn-sm btn-danger'>
                                    <CIcon icon={ icon.cilDelete }/>
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}
