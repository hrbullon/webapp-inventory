import React from 'react'

export const FormSearch = ({ setProducts, rows }) => {

    const handleFilter = (product) => {
       
        let filtered = rows
        .filter( item => {
            return item.code && item.code.toLowerCase().includes(product.toLowerCase()) ||
            item.name && item.name.toLowerCase().includes(product.toLowerCase()) ||
            item.description && item.description.toLowerCase().includes(product.toLowerCase()) 
        })

        setProducts(filtered);
    }

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
