import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CAlert } from '@coreui/react';
import { useForm } from 'react-hook-form';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';

import { formatDocument } from 'src/helpers/helpers';

import { 
    startGettingCompany, 
    startSendingCompany } 
from '../../actions/company';

const Form = () => {
    
    const dispatch = useDispatch();
    const model = useSelector((state) => state.company);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => { (model !== undefined)| reset(model) }, [model]);

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem("user"));
        dispatch( startGettingCompany(user.company_id) );

    }, [])
    
    const onSubmit = async data => { dispatch( startSendingCompany(data) ) }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title"></h5>
                <hr/>
                <CAlert color="primary" visible={ (Object.entries(errors).length > 0 ) }>
                    Los campos con <b>*</b> son obligatorios
                </CAlert>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <h5>Datos básicos</h5>
                        <hr/>
                    </div>
                    <div className="col-md-4">
                        <label>Nombre Comercial *</label>
                        <input 
                            type="text" 
                            name='name' 
                            className="form-control" 
                            placeholder="Nombre Comercial" 
                            {...register("name", { required: true, maxLength: 45 })}/>
                        <ErrorValidate error={ errors.name }/>  
                    </div>
                    <div className="col-md-4">
                        <label>Razón Social *</label>
                        <input 
                            type="text" 
                            name='legal_name' 
                            className="form-control" 
                            placeholder="Razón Social"
                            {...register("legal_name", { required: true, maxLength: 45 })}/>
                        <ErrorValidate error={ errors.legal_name }/>  
                    </div>
                    <div className="col-4">
                        <label>RIF: *</label>
                        <input 
                            type="text" 
                            name='dni'
                            className="form-control" 
                            placeholder="RIF"
                            onKeyUp={ (e) => formatDocument(e) }  
                            {...register("dni", { required: true, maxLength: 20 })}/>
                        <ErrorValidate error={ errors.dni }/>     
                    </div>
                </div>
                <div className='row'>    
                    <div className='col-12 mt-4'>
                        <h5>Información de contacto</h5>
                        <hr/>
                    </div>
                    <div className="col-4">
                        <label>Sitio Web</label>
                        <input 
                            type="text" 
                            name='web'
                            className="form-control" 
                            placeholder="Sitio web"
                            {...register("web")}/>
                    </div>
                    <div className="col-4">
                        <label>Email</label>
                        <input 
                            type="email"
                            name='email'
                            className="form-control" 
                            placeholder="Correo electrónico"
                            {...register("email")}/>
                    </div>
                    <div className="col-4">
                        <label>Teléfono *</label>
                        <input 
                            type="number" 
                            name='phone'
                            className="form-control" 
                            placeholder="Teléfono"
                            {...register("phone", { required: true})}/>
                        <ErrorValidate error={ errors.phone }/>  
                    </div>
                    <div className="col-12">
                        <label>Dirección *</label>
                        <textarea 
                            type="text" 
                            name='address'
                            className="form-control" 
                            placeholder="Dirección"
                            {...register("address")}/>
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

export default Form;