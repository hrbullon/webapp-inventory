import React, { Fragment } from 'react'

const Warehouse = () => {

  const warehouses = [
    {
        id:1,
        name:"Gran Bazar - Nuevos"
    },
    {
        id:2,
        name:"Gran Bazar - Usados"
    },
    {
        id:3,
        name:"Gran Bazar - Dañados"
    },
  ];

  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Registro de almacén</h5>
                    <div className="mb-3">
                        <input type="text" name="name" className="form-control" placeholder="Nombre del almacén"/>
                    </div>
                    <div className="mb-3">
                        <select className="form-control" name="responsible">
                            <option value="">Seleccione un responsable</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Guardar</button>
                    <button className="btn btn-desabled">Cancelar</button>
                </div>
            </div>
        </div>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Listado de almacenes</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            warehouses.map(  (warehouse, index) => {
                                return (
                                    <tr key={ warehouse.id }>
                                        <td>{ (index+1) }</td>
                                        <td>{ warehouse.name }</td>
                                        <td>
                                            <button className='btn btn-primary'>
                                                Editar
                                            </button>
                                            <button className='btn btn-danger'>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Warehouse
