import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import swal from 'sweetalert';
import { useForm } from 'react-hook-form';

import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { ActionButtons } from 'src/components/forms/ActionButtons';

//Actions category
import { startGettingCategory, startSendingCategory } from 'src/actions/category';

export const Form = () => {

    const dispatch = useDispatch()

    const model = useSelector(state => state.category )
    const categorySaved = useSelector(state => state.categorySaved )

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        (model !== undefined)| reset(model);
    }, [model])
    
    useEffect(() => {
       if(categorySaved !== undefined){
           dispatch( startGettingCategory() );
           swal("Listo","Datos guardados correctamente!!","success");
       } 
    }, [categorySaved])
    
    const onSubmit = async data => dispatch( startSendingCategory(data) );

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
