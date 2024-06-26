import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { CAlert } from '@coreui/react';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { Barcode } from 'src/components/barcode/Barcode';

import { AuthContext } from 'src/context/AuthContext';
import Page403 from '../error/page403/Page403';

//Actions
import { startGettingProductById, startSendingProduct } from '../../actions/product';
import { CategorySelect } from 'src/components/forms/select/CategorySelect';
import { ADMIN_ROLE } from 'src/constants/variables';

export const Form = ({ title }) => {

    let { id } = useParams();
    let { user } = useContext(AuthContext);

    const dispatch = useDispatch()
    const model = useSelector((state) => state.product);    

    const defaultCategory = { value:'', label:'Seleccione una categoría' };
    const [idCategory, setIdCategory] = useState(defaultCategory);

    const {register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues:{} });

    useEffect(() => { 
      if(model){

        if(model.category_id){
          const { Category } = model;
          setIdCategory({ value: Category.id, label: Category.name });
        }

        reset(model);
      }
    }, [model])

    useEffect(() => { (id && id !== undefined)? dispatch( startGettingProductById(id) ) : reset({}) }, [id])

    const onSubmit = async data => { 
      
      let formData = new FormData();

      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category_id", idCategory.value);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("image", data.image[0]);

      dispatch( startSendingProduct(formData, id) )
    } 

    if(user.role !== ADMIN_ROLE){
      return <Page403/>
    }

    return (
    <form id="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ title }</h5>
          <hr/>
          <CAlert color="primary" visible={(Object.entries(errors).length > 0 )}>
            Los campos con <b>*</b> son obligatorios
          </CAlert>
          <div className='row mt-4'>
            <div className="col-4">
              <div className="form-group">
                <label>Codigo/Serial:</label>
                <input type="text" className="form-control" name="code" {...register("code")} autoComplete='autoComplete' />
              </div>
              <div className="form-group">
                <label>Nombre: *</label>
                <input type="text" className="form-control" name="name" {...register("name", { required: true, maxLength: 150 }) } autoComplete='autoComplete'/>
                <ErrorValidate error={ errors.name }/>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className='form-control' name="description" {...register("description", { maxLength: 300 })} >
                </textarea>
              </div>
            </div>
            <div className="col-4">
              
              <CategorySelect idCategory={idCategory} setIdCategory={setIdCategory}/>
          
              <div className="form-group">
                <label>Marca:</label>
                <input type="text" className="form-control" name="brand" {...register("brand")} autoComplete='autoComplete'/>
              </div>
              <div className="form-group">
                <label>Modelo:</label>
                <input type="text" className="form-control" name="model" {...register("model")} autoComplete='autoComplete'/>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Imagen:</label>
                <input type="file" className="form-control" name="image" {...register("image")}/>
              </div>
              <div className="form-group mt-2">
                { watch("code") &&
                  <Barcode value={ watch("code") } />
                }
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <div className="form-group">
                <label>Precio: *</label>
                <input type="number" className="form-control" name="price" {...register("price", { required: true }) }/>
                <ErrorValidate error={ errors.price }/>
               </div>
            </div>
            <div className='col-4'>
              <div className="form-group">
                <label>Cantidad: *</label>
                <input type="number" className="form-control" name="quantity" {...register("quantity", { required: true }) }/>
                <ErrorValidate error={ errors.quantity }/>
              </div>
            </div>
          </div>
          <div className='row'>
            <ActionButtons />
          </div>
        </div>
      </div>
    </form>
  )
}
