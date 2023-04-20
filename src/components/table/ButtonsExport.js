import React, { useContext } from 'react'

import * as XLSX from 'xlsx';
import moment from 'moment';
import jsPDF from 'jspdf';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { AuthContext } from 'src/context/AuthContext';

export const ButtonsExport = ({ data, headerOptions, title, fileName }) => {

    const { company } = useContext(AuthContext);
    
    const handleClickPDF = () => {
        exportToPDF(data, headerOptions, title, fileName);
    }

    const handleClickExcel = () => {
        exportToExcel(data, headerOptions, title, "A1:F1", fileName);
    }

    const exportToExcel = (data, headers, titleTable, rangeTitle, fileName) => {

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

        let pages = Math.ceil((rows.length)/15);

        for (let i = 0; i < pages; i++) {
            
            const start = i * 20;
            const end = (i + 1) * 20;
            const pageData = rows.slice(start, end);
            
            if(i > 0){
                doc.addPage();
            }

            printHeader(doc, title);

            // Crea la tabla usando la función table
            doc.table(10, 60, pageData, headerOptions , {
                fontSize: 7,
                headerBackgroundColor: "#185f9d",
                headerTextColor: "white"
            });

            printFooter(doc, i, pages);       
            
        }

        const date = moment().format("DD-MM-YYYY");
        // Guarda el archivo PDF
        doc.save(`${fileName}-${date}.pdf`);
    }

    const printHeader = (doc, title) => {

        doc.setFontSize(10);
        doc.text(`${ company.legal_name }`, 110, 20, { align: "center" });
        doc.text(`RIF: ${ company.dni.toUpperCase() }`, 110, 25, { align: "center" });
        doc.text(`Telefono: ${ company.phone }`, 110, 30, { align: "center" });
        doc.text(`Correo Electronico: ${ company.email }`, 110, 35, { align: "center" });
        doc.text(`${ company.address }`, 110, 40, { align: "center" });

        const dateTime = moment().format("DD-MM-YYYY - hh:mm");
        
        doc.text(dateTime, 200, 50, { align: "right" }); 
        doc.text(title, 110, 50, { align: "center" }); 
    }

    const printFooter = (doc, page, totalPage) => {

        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text(`Reporte generado por: Luna Sofware - App `, doc.internal.pageSize.getWidth() - 200, doc.internal.pageSize.getHeight() - 10);

        doc.text(`${ (page+1)}/${totalPage}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);

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
