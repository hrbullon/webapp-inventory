import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import swal from 'sweetalert';

import { CAlert } from '@coreui/react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { formatDocument } from 'src/helpers/helpers';

//Actions customers
import { 
    startSendingCustomer,
    startGettingCustomerByID, 
} from '../../actions/customer';

import { VIEW_MESSAGE } from 'src/strings';

export const Form = ({ title, dni }) => {

    let { id } = useParams();
    let navigate = useNavigate();

    const dispatch = useDispatch()

    const model = useSelector((state) => state.customer);
    const customerSaved = useSelector((state) => state.customerSaved);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => { (model !== undefined)| reset(model) }, [model]);
    useEffect(() => { (id)? dispatch( startGettingCustomerByID(id) ) : reset({}) }, [id])

    useEffect(() => {
      if(dni && dni !== undefined){
        reset({
            dni: dni
        })
      }
    }, [dni])

    useEffect(() => {
      
        const params = window.location.href.split("document=");

        if(params.length > 1){
            reset({
                dni: params[1]
            });
        } 
    }, [])

    useEffect(() => {
      if(customerSaved){

        swal("Completado!", VIEW_MESSAGE.DATA_SAVED_SUCCESSFULLY, "success");

        if(/document/.test(window.location.href)){
            reset();
            navigate("/pos");
        }
      }
    }, [customerSaved])

    const onSubmit = async data => dispatch( startSendingCustomer(data) );

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{ title }</h5>
                <CAlert color="primary" visible={ (Object.entries(errors).length > 0 ) }>
                    Los campos con <b>*</b> son obligatorios
                </CAlert>
                <div className='row mt-3'>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Nombre: *</label>
                            <input type="text" className="form-control" name="name" autoComplete='autoComplete' {...register("name", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.name }/>
                        </div>
                        <div className="form-group">
                            <label>DNI/Cedula: *</label>
                            <input type="text" className="form-control" name="dni" autoComplete='autoComplete' onKeyUp={ (e) => formatDocument(e) } {...register("dni", { required: true, maxLength: 20 })}/>
                            <ErrorValidate error={ errors.dni }/>
                        </div>
                        <div className="form-group">
                            <label>Direccion: *</label>
                            <textarea className="form-control" name="address" autoComplete='autoComplete' {...register("address", { required: true, maxLength: 100 })}/>
                            <ErrorValidate error={ errors.address }/>                        
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Telefono: *</label>
                            <input type="text" className="form-control" name="phone" autoComplete="autoComplete" {...register("phone", { required: true, maxLength: 12, pattern:'/[0-1]*/' })}/>
                            <ErrorValidate error={ errors.phone }/>                        
                        </div>
                        <div className="form-group">
                            <label>Correo: *</label>
                            <input type="email" className="form-control" name="email" autoComplete='autoComplete' {...register("email", { required: true, maxLength: 45 })}/>
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
export default Form