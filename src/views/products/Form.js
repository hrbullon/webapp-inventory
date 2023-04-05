import React, { useEffect } from 'react';

import swal from 'sweetalert';
import { CAlert } from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { createProduct, getProductById, updateProduct } from 'src/services/productsServices';

export const Form = ({ title }) => {

    let { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    useEffect(() => {
        if(id && id !== undefined){
            getProductDetail(id);
        }
    }, [id])
    
    const getProductDetail = async (id) => {
        const res = await getProductById(id);
        reset(res.product);
    }

    const onSubmit = async data => { 
        
        let res;

        if(!id){
            res = await createProduct(data);
        }else{
            res = await updateProduct(id, data);
        }

        if(res.product){
            (id)? reset(data) : reset();
            swal("Completado!", "Datos guardados!", "success");
        }else{
            swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{ title }</h5>
          <hr/>
          <CAlert color="primary" visible={true}>
            Los campos con <b>*</b> son obligatorios
          </CAlert>
          <div className='row mt-5'>
            <div className="col-4">
              <div className="form-group">
                <label>Codigo/Serial:</label>
                <input type="text" className="form-control" name="code" {...register("code")}/>
              </div>
              <div className="form-group">
                <label>Nombre: *</label>
                <input type="text" className="form-control" name="name" {...register("name", { required: true, maxLength: 45 }) }/>
                <ErrorValidate error={ errors.name }/>
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className='form-control' name="description" {...register("description")}>
                </textarea>
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>Categoria:</label>
                <input type="text" className="form-control" name="category_id" {...register("category_id")}/>
              </div>
              <div className="form-group">
                <label>Marca:</label>
                <input type="text" className="form-control" name="brand" {...register("brand")}/>
              </div>
              <div className="form-group">
                <label>Modelo:</label>
                <input type="text" className="form-control" name="model" {...register("model")}/>
              </div>
            </div>
            <div className="col-4">
              <div id='imagePreview'></div>
              <div className="form-group">
                <label>Imagen:</label>
                <input type="file" className="form-control" name="image"/>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-4'>
              <div className="form-group">
                <label>Precio: *</label>
                <input type="text" className="form-control" name="price" {...register("price", { required: true }) }/>
                <ErrorValidate error={ errors.price }/>
               </div>
            </div>
            <div className='col-4'>
              <div className="form-group">
                <label>Cantidad: *</label>
                <input type="text" className="form-control" name="quantity" {...register("quantity", { required: true }) }/>
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
