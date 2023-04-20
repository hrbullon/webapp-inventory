import React, { useState, useEffect, useContext } from 'react';

import DataTable from 'react-data-table-component-footer';
import config from '../../config/config.json';
import { headerOptions, columns } from './config-table';

import Page403 from '../error/page403/Page403';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { getDataExport, getTotal, prepareList } from './selector';
import { formatNumber } from 'src/helpers/helpers';
import { getAllProducts } from 'src/services/productsServices';
import { AuthContext } from 'src/context/AuthContext';

const Inventory = () => {

    const [loading, setLoading] = useState(false);
    const [totalInventory, setTotalInventory] = useState(0);
    const [products, setProducts ] = useState([]);
    const [copies, setCopies] = useState([]);

    let { user } = useContext(AuthContext);

    useEffect(() => {
      
      let total = getTotal(products);
      setTotalInventory(total);

    }, [products])
    

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

    if(user.role !== "ADM_ROLE"){
      return <Page403/>
    }
    
    return (
    <div className="card">
        <div className="card-body">
            
            <h5 className="card-title">Listado de existencia</h5>
            
            <ButtonsExport 
              data={ getDataExport(products, totalInventory) } 
              headerOptions={ headerOptions } 
              title="Listado de existencia de productos "
              fileName="Reporte-existencia"/>

            <FormSearch setProducts={setProducts} fetchProducts={ fetchProducts } rows={ copies } />

            <DataTable
              columns={columns}
              data={products}
              progressPending={ loading }
              progressComponent={ <EclipseComponent/> }
              paginationComponentOptions={ config.paginationComponentOptions }
              footer={{
                code:"",
                name:"",
                quantity:"",
                price: "Total $US",
                subtotal: formatNumber(totalInventory),
              }}
              noDataComponent={"No hay datos para mostrar"}/>
        </div>
    </div>
  )
}

export default Inventory;
