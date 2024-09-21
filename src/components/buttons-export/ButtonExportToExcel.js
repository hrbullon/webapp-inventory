import * as XLSX from 'xlsx';

import moment from 'moment';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

export const ButtonExportToExcel = ({ data, headerOptions, fileName }) => {
    
    const exportToExcel = (data) => {

        const date = moment().format("DD-MM-YYYY");

        const worksheet = XLSX.utils.json_to_sheet(data, { origin: "A2"});

        headerOptions.map( (header, key) => {
            worksheet[XLSX.utils.encode_cell({c:key,r:1})] = { t: "s", v: header };
        })

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

        XLSX.writeFile(workbook, `${fileName}-${date}.xlsx`, { compression: true });
    }

    return (

        <button 
            className='btn btn-secondary' 
            title='Descargar Hoja de Calculo' 
            onClick={ (e) => exportToExcel(data) }
        >

            <CIcon icon={icon.cilSpreadsheet} />
        
        </button>
    )
}
