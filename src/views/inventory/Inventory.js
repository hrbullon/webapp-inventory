import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';
import config from '../../config/config.json';

import EclipseComponent from 'src/components/loader/EclipseComponent';
import { ButtonsExport } from 'src/components/table/ButtonsExport';

import { getAllProducts } from 'src/services/productsServices';
import { FormSearch } from './FormSearch';

const Inventory = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts ] = useState([]);
    const [copies, setCopies] = useState([]);

    const headerOptions = [
        {
          name:"code",
          prompt:"Código"
        },
        {
          name:"name",
          prompt:"Nombre"
        },
        {
          name:"quantity",
          prompt:"Stock"
        },
        {
          name:"price",
          prompt:"Precio"
        },
        {
          name:"subtotal",
          prompt:"Subtotal"
        },
    ];

    const columns = [
        {
          name: 'Código',
          sortable:true,
          selector: row => row.code,
        },
        {
          name: 'Nombre',
          sortable:true,
          selector: row => row.name,
        },
        {
          name: 'Stock',
          sortable:true,
          right: true,
          selector: row => row.quantity,
        },
        {
          name: 'Precio',
          sortable:true,
          right: true,
          selector: row => row.price,
        },
        {
          name: 'Subtotal',
          sortable:true,
          right: true,
          selector: row => row.subtotal
        }
    ]

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const res = await getAllProducts();
        const rows = prepareList(res.products);
        setCopies(rows);
        setProducts(rows);
        setLoading(false);
    }

    const prepareList = data => {

      let rows = [];

      data.map( item => {

          let subtotal = (Number(item.price)*Number(item.quantity));

          const row = {
              code: item.code,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              subtotal: subtotal.toString()
          };

          rows.push(row);
      });

      return rows;
  }
    
    return (
    <div className="card">
        <div className="card-body">
            
            <h5 className="card-title">Listado de existencia</h5>
            
            <ButtonsExport 
              data={ products } 
              headerOptions={ headerOptions } 
              title="Listado de existencia de productos "
              fileName="Reporte-existencia"/>

            <FormSearch setProducts={setProducts} rows={ copies } />

            <DataTable
              columns={columns}
              data={products}
              progressPending={ loading }
              progressComponent={ <EclipseComponent/> }
              paginationComponentOptions={ config.paginationComponentOptions }
              noDataComponent={"No hay datos para mostrar"}/>
        </div>
    </div>
  )
}

export default Inventory;
