import { useContext } from 'react';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

import moment from 'moment';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { AuthContext } from 'src/context/AuthContext';

export const ButtonExportToPDF = ({ data, title, headerOptions, fileName, columnsStyles = {} }) => {
    
    const { company } = useContext(AuthContext);

    const exportToPDF = (data) => {
       
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'letter',
        });

        printHeader(doc, title);

        autoTable(doc,{ 
            startY: 60, 
            head: [ headerOptions ], 
            body: data,
            styles: { cellPadding: 0.5, fontSize: 8 },
            columnStyles: columnsStyles,
        })

        printFooter(doc);

        const date = moment().format("DD-MM-YYYY");
        // Guarda el archivo PDF
        doc.save(`${fileName}-${date}.pdf`);

    };

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

    const printFooter = (doc) => {

        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text(`Reporte generado por: Luna Sofware - App `, doc.internal.pageSize.getWidth() - 200, doc.internal.pageSize.getHeight() - 10);
    }

    return (

        <button 
            title='Descargar PDF'
            className='btn btn-secondary m-2' 
            onClick={ (e) => exportToPDF(data) }
        >
            <CIcon icon={icon.cilFile} />
    
        </button>
    )
}
