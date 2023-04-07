import React from 'react'

import * as XLSX from 'xlsx';
import moment from 'moment';
import jsPDF from 'jspdf';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

export const ButtonsExport = ({ data, headerOptions, title, fileName }) => {
    
    const handleClickPDF = () => {
        const rows = data.map(({Customer, SaleDetails, ...rest}) => rest);
        exportToPDF(rows, headerOptions, title, fileName);
    }

    const handleClickExcel = () => {
        const rows = data.map(({Customer, SaleDetails, ...rest}) => rest);
        exportToExcel(rows, headerOptions, title, "A1:F1", fileName);
    }
    
    return (
    <div>
        <button className='btn btn-secondary' title='Descargar Hoja de Calculo' onClick={ handleClickExcel }>
            <CIcon icon={icon.cilSpreadsheet} />
        </button>
        <button className='btn btn-secondary m-2' title='Descargar PDF' onClick={ handleClickPDF }>
            <CIcon icon={icon.cilFile} />
        </button>
    </div>
  )
}


export const exportToExcel = (data, headers, titleTable, rangeTitle, fileName) => {
    
    const worksheet = XLSX.utils.json_to_sheet(data, { origin: "A2"});
    
    /** Merge a group of cells */
    if(!worksheet["!merges"]) worksheet["!merges"] = [];
    worksheet["!merges"].push(XLSX.utils.decode_range(rangeTitle));

    // Apply the style object to the cell
    worksheet["A1"] = { t: "s", v: titleTable };

    /** Print Headers*/
    headers.map( (header, key) => {
        worksheet[XLSX.utils.encode_cell({c:key,r:1})] = { t: "s", v: header.prompt };
    })

    const date = moment().format("DD-MM-YYYY");

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "datos");
    XLSX.writeFile(workbook, `${fileName}-${date}.xlsx`, { compression: true });

}

const exportToPDF = (rows, headerOptions, title, fileName) => {

    // Crea un objeto jsPDF
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'letter',
    });

    doc.setFontSize(12);
    doc.text(`Mi propia empresa, C.A`, 100, 20, { align: "center" });
    doc.text(`RIF: J987987892`, 100, 25, { align: "center" });
    doc.text(`Telefono: 9878789722`, 100, 30, { align: "center" });
    doc.text(`Correo Electronico: mail@domain.com`, 100, 35, { align: "center" });
    doc.text(`Direccion: mi direccio es muy lejos`, 100, 40, { align: "center" });
    
    doc.text(title, 100, 50, { align: "center" }); 

    // Crea la tabla usando la función table
    doc.table(10, 60, rows, headerOptions , {
        autoSize: true,
        fontSize: 10,
        headerBackgroundColor: "#185f9d",
        headerTextColor: "white"
    });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(`Reporte generado por: Luna Sofware - App `, doc.internal.pageSize.getWidth() - 200, doc.internal.pageSize.getHeight() - 10);
    
    const date = moment().format("DD-MM-YYYY");
    const dateTime = moment().format("DD-MM-YYYY - hh:mm");
    doc.text(`${dateTime}`, doc.internal.pageSize.getWidth() - 50, doc.internal.pageSize.getHeight() - 10);

    // Guarda el archivo PDF
    doc.save(`${fileName}-${date}.pdf`);
}
