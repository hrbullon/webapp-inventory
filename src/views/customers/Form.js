import React, { useEffect } from 'react'

import swal from 'sweetalert';
import { CAlert } from '@coreui/react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { createCustomer, getCustomerById, updateCustomer } from 'src/services/customersServices';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';

export const Form = ({ title }) => {

    let { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if(id && id !== undefined){
            getCustomer(id);
        }
    }, [id])
    
    const getCustomer = async (id) => {
        const res = await getCustomerById(id);
        reset(res.customer);
    }

    const onSubmit = async data => { 
        
        let res;

        if(!id){
            res = await createCustomer(data);
        }else{
            res = await updateCustomer(id, data);
        }

        if(res.customer){
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
                    <div className="col-6">
                        <div className="form-group">
                            <label>Nombre: *</label>
                            <input type="text" className="form-control" name="name" autoComplete='off' {...register("name", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.name }/>
                        </div>
                        <div className="form-group">
                            <label>DNI/Cedula: *</label>
                            <input type="text" className="form-control" name="dni" autoComplete='off' {...register("dni", { required: true, maxLength: 20 })}/>
                            <ErrorValidate error={ errors.dni }/>
                        </div>
                        <div className="form-group">
                            <label>Direccion: *</label>
                            <textarea className="form-control" name="address" autoComplete='off' {...register("address", { required: true, maxLength: 100 })}/>
                            <ErrorValidate error={ errors.address }/>                        
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Telefono: *</label>
                            <input type="text" className="form-control" name="phone" autoComplete='off' {...register("phone", { required: true, maxLength: 12 })}/>
                            <ErrorValidate error={ errors.phone }/>                        
                        </div>
                        <div className="form-group">
                            <label>Correo: *</label>
                            <input type="text" className="form-control" name="email" autoComplete='off' {...register("email", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.email }/>     
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
