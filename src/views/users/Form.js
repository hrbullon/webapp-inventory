import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CAlert, CFormSwitch } from '@coreui/react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { ActionButtons } from 'src/components/forms/ActionButtons';
import { ErrorValidate } from 'src/components/forms/ErrorValidate';
import { formatDocument } from 'src/helpers/helpers';
import { startSendingUser, startGettingUserById } from 'src/actions/users';

export const Form = ({ title }) => {

    const dispatch = useDispatch();

    let { id } = useParams();
    const model = useSelector((state) => state.user);
    const userSaved = useSelector((state) => state.userSaved);
    const [state, setState] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues:{}});

    useEffect(() => { (id)? dispatch( startGettingUserById(id) ) : reset({}) }, [id]);
    
    useEffect(() => {
        if(userSaved){
            (id)? reset(userSaved) : reset();
        }
    }, [userSaved])

    useEffect(() => {
        if(model !== undefined){
            let state = (model.state)? true : false;
            setState(state);
            reset(model);
        }  
    }, [model]);

    const onSubmit = async data => { 

        let checked = document.getElementById("state").checked;
        data.state = (checked)? 1 : 0;

        dispatch( startSendingUser( data ) );
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
                <div className='row mt-4'>
                    <div className='col-12'>
                        <h5>Datos personales</h5>
                        <hr/>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Nombre: *</label>
                            <input type="text" className="form-control" name="firstname" autoComplete='off' {...register("firstname", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.firstname }/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Apellido: *</label>
                            <input type="text" className="form-control" name="lastname" autoComplete='off' {...register("lastname", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.lastname }/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>DNI/Cedula: *</label>
                            <input type="text" className="form-control" name="dni" autoComplete='off'   onKeyUp={ (e) => formatDocument(e) } {...register("dni", { required: true, maxLength: 20 })}/>
                            <ErrorValidate error={ errors.dni }/>
                        </div>
                    </div>
                </div>
                <div className='row'>    
                    <div className='col-12 mt-4'>
                        <h5>Información de contacto</h5>
                        <hr/>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Telefono: *</label>
                            <input type="text" className="form-control" name="phone" autoComplete='off' {...register("phone", { required: true, maxLength: 12 })}/>
                            <ErrorValidate error={ errors.phone }/>                        
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Correo: *</label>
                            <input type="text" className="form-control" name="email" autoComplete='off' {...register("email", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.email }/>     
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Direccion: *</label>
                            <input type='text' className="form-control" name="address" autoComplete='off' {...register("address", { required: true, maxLength: 100 })}/>
                            <ErrorValidate error={ errors.address }/>                        
                        </div>
                    </div>
                </div>
                <div className='row'>    
                    <div className='col-12 mt-4'>
                        <h5>Datos de usuario</h5>
                        <hr/>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Usuario: *</label>
                            <input type="text" className="form-control" name="account" autoComplete='off' {...register("account", { required: true, maxLength: 45 })}/>
                            <ErrorValidate error={ errors.account }/>     
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Rol/Tipo usuario: *</label>
                            <select className="form-control" name="role" {...register("role", { required: true })}>
                                <option value="">Seleccione un tipo de usuario</option>
                                <option value="1">Administrador</option>
                                <option value="2">Vendedor</option>
                            </select>
                            <ErrorValidate error={ errors.role }/>     
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Contraseña: *</label>
                            <input type="password" className="form-control" name="password" autoComplete='off' {...register("password", { required: (id)? false : true })}/>
                            <ErrorValidate error={ errors.password }/>     
                        </div>
                    </div>
                    <div className='col-6'>
                        <label>Activo</label>
                        <CFormSwitch id="state" name="state" {...register("state" )} defaultChecked={ state }/>
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
