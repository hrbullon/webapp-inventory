import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataTable from 'react-data-table-component-footer';
import config from '../../config/config.json';
import { headerOptions, columns } from './config-table';

import Page403 from '../error/page403/Page403';
import { FormSearch } from './FormSearch';
import { ButtonsExport } from 'src/components/table/ButtonsExport';
import EclipseComponent from 'src/components/loader/EclipseComponent';

import { getDataExport, getTotal, prepareList } from './selector';
import { formatNumber } from 'src/helpers/helpers';
import { AuthContext } from 'src/context/AuthContext';

//Actions product
import { startGettingProducts } from 'src/actions/product';

const Inventory = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const products = useSelector((state) => state.products);

    const [items, setItems] = useState([]);
    const [totalInventory, setTotalInventory] = useState(0);

    let { user } = useContext(AuthContext);

    useEffect(() => {
      if(products && products !== undefined){
        let items = prepareList(products);
        let total = getTotal(items);
        setItems(items);
        setTotalInventory(total);
      }
    }, [products])

    useEffect(() => {
      dispatch( startGettingProducts() );
    }, [])

    if(user.role !== "ADM_ROLE"){
      return <Page403/>
    }
    
    return (
    <div className="card">
        <div className="card-body">
            
            <h5 className="card-title">Listado de existencia</h5>
            
            { products && 
              <ButtonsExport 
              data={ getDataExport(items, totalInventory) } 
              headerOptions={ headerOptions } 
              title="Listado de existencia de productos "
              fileName="Reporte-existencia"/>}

            <FormSearch/>

            <DataTable
              columns={columns}
              data={items}
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
