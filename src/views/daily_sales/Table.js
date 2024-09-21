import { Fragment, useEffect, useState } from "react";

import { DatatableComponent as DataTable } 
from "src/components/datatable/DatatableComponent";

import { 
    getColums, 
    headerOptions, 
    getDataExport, 
    getFooterSummary } from "./config";

import { FormSearch } from "./FormSearch";

import { ButtonExportToPDF } from "src/components/buttons-export/ButtonExportToPDF";
import { ButtonExportToExcel } from "src/components/buttons-export/ButtonExportToExcel";

export const Table = () => { 

    const [ items, setItems ]                 = useState([]);
    const [ apiUrl, setApiUrl ]               = useState('');
    const [ footerSummary, setFooterSummary ] = useState({});

    useEffect(() => {

        if(items && items.length > 0) {
            
            const summary = getFooterSummary(items);
            setFooterSummary(summary);

        }

    }, [items]);

    return (
        <Fragment>

            <ButtonExportToPDF 
                data={ getDataExport(items) } 
                headerOptions={ headerOptions} 
                title='Reporte Cierres de Caja'
                fileName='reporte-cierre-cajas'/>

            <ButtonExportToExcel 
                data={ getDataExport(items) } 
                headerOptions={ headerOptions} 
                fileName='reporte-cierre-cajas'/>

            <FormSearch setApiUrl={ setApiUrl }/>

            <DataTable 
                url={ apiUrl }
                setApiUrl={ setApiUrl }
                columns={ getColums() }
                items={ items }
                setItems={ setItems }
                footer={ footerSummary }
            />
        </Fragment>
    )
}