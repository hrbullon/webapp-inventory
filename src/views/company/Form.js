import React, { useState, useEffect } from 'react'

import swal from 'sweetalert';
import { CAlert } from '@coreui/react';
import { useForm } from 'react-hook-form';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { getCompanyById, updateCompany } from 'src/services/companiesServices';

const Form = () => {
    
    const [idCompany, setIdCompany] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetchData();
    }, [])
    
    const fetchData = async () => {

        let user = localStorage.getItem("user");
        user = JSON.parse(user);

        setIdCompany(user.company_id);

        const res = await getCompanyById(user.company_id);
        reset(res.company);
    }

    const onSubmit = async data => { 
        
        const res = await updateCompany(idCompany, data);

        if(res.company){
            swal("Completado!", "Datos guardados!", "success");
        }else{
            swal("Oops","Algo salio mal al guardar los datos","warning");
        }
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title"></h5>
                <hr/>
                <CAlert color="primary" visible={true}>
                    Los campos con <b>*</b> son obligatorios
                </CAlert>
                <div className='row mt-4'>
                    <div className='col-12'>
                        <h5>Datos personales</h5>
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
                            type="text" 
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