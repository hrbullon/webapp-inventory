import React, { Fragment } from 'react'

const Category = () => {

  const categories = [
    {
      id:1,
      name:"Accesorios",
      padre:""
    },
    {
      id:2,
      name:"Periféricos",
      padre:""
    },
    {
      id:3,
      name:"Consumibles",
      padre:""
    },
    {
      id:4,
      name:"Repuestos",
      padre:""
    },
  ];

  return (
    <Fragment>
      <div className='row'>
        <div className='col-6'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Registro de catgegorías</h5>
                    <div className="mb-3">
                        <input type="text" name="name" className="form-control" placeholder="Nombre de la categoría"/>
                    </div>
                    <div className="mb-3">
                        <select className="form-control" name="responsible">
                            <option value="">Seleccione una categporía padre</option>
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
                    <h5 className="card-title">Listado de categorías</h5>
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
                              categories.map(  (category, index) => {
                                  return (
                                      <tr key={ category.id }>
                                          <td>{ (index+1) }</td>
                                          <td>{ category.name }</td>
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

export default Category
