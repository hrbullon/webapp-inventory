import React, { Fragment } from 'react'

const Form = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Datos básicos</h5>
                            <div className="mb-3">
                                <input type="text" name="name" className="form-control" placeholder="Seleccione un cliente"/>
                            </div>
                            <div className="mb-3">
                                <b>Nombre:</b> José<br/>
                                <b>Apellido:</b> Canseco <br/>
                                <b>Cédula:</b> V2656565 <br/>
                                <b>Nro Tlf.:</b> 042565899 <br/>
                                <b>Dirección:</b> Far far away 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Detalle Factura</h5>
                            <div className="mb-3">
                                <b>Nro#:</b> 000560 <br/>
                                <b>Fecha:</b> 02/03/2023 <br/>
                                <b>Monto Total:</b> $550,00 <br/>
                                <button className="btn btn-success mt-2">Imprimir Factura</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Detalle de artículos</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Artículo</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Form
