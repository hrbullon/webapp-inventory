import React, { useState, useEffect } from 'react';

import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { ActionButtons } from 'src/components/forms/ActionButtons';
import { createCategory, updateCategory } from 'src/services/categoriesServices';

export const Form = ({ category, fetchCategories }) => {

    const [idCategory, setIdCategory] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(category);
        setIdCategory(category.id);
    }, [category]);

    const onSubmit = async data => {
        
        let res;
    
        if(!idCategory){
            res = await createCategory(data);
        }else{
            res = await updateCategory(idCategory, data);
        }
    
        if(res.category){
          (idCategory)? reset(data) : reset();
          fetchCategories();
          swal("Listo","Datos guardados correctamente!!","success");
        }else{
          swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="card-title">Datos de categoria</h5>
        <div className="mb-3">
            <input type="text" name="name" {...register("name", { required: true, maxLength: 45 }) } autoComplete='off' className="form-control" placeholder="Nombre de la categoría"/>
            <ErrorValidate error={ errors.name } />
        </div>
        <div className="mb-3">
            <input type="text" name="description" {...register("description")} autoComplete='off' className="form-control" placeholder="Descripción de la categoría"/>
        </div>
        <ActionButtons />
    </form> 
  )
}
