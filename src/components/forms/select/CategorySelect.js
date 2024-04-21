import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';

import { startGettingCategory } from 'src/actions/category';
import { prepareOptions } from 'src/helpers/helpers';

export const CategorySelect = ({ idCategory, setIdCategory }) => {

    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const categories = useSelector((state) => state.categories);

    useEffect(() => { dispatch( startGettingCategory() ) }, []);

    const handleChangingCategory = (input) => { 
        input? setIdCategory(input) 
        : setIdCategory(defaultCategory) 
    }

    useEffect(() => {

        if(categories && categories !== undefined){
         
            const items = prepareOptions(categories);
            setOptions(items);
        
        }

    }, [categories]);

    return (
        <div className="form-group">
            <label>Categoria:</label>
            <Select name="category_id" value={ idCategory }  options={options} onChange={handleChangingCategory}/>
        </div>
    )
}
