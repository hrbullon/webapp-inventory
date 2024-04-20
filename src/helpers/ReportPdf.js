
import jsPDF from 'jspdf';
import moment from 'moment';

let pdfInstance = null;
let doc = null;

function getPDFInstance() {

    if (!pdfInstance) {
      // Crear una nueva instancia de jsPDF
      pdfInstance = new jsPDF({
        orientation: "p",
        unit: 'mm',
        format: "letter",
      });
    }
  
    return pdfInstance;
}

export const createPdf = () => {
    doc = getPDFInstance();
    return doc;
}

export const printHeader = ( headerInfo ) => {

    doc.setFontSize(10);
    doc.text(`${ headerInfo.legal_name }`, 110, 20, { align: "center" });
    doc.text(`RIF: ${ headerInfo.dni.toUpperCase() }`, 110, 25, { align: "center" });
    doc.text(`Telefono: ${ headerInfo.phone }`, 110, 30, { align: "center" });
    doc.text(`Correo Electronico: ${ headerInfo.email }`, 110, 35, { align: "center" });
    doc.text(`${ headerInfo.address }`, 110, 40, { align: "center" });

    const dateTime = moment().format("DD-MM-YYYY - hh:mm");
    
    doc.text(dateTime, 200, 50, { align: "right" }); 
}

export const printTable = ( headerOptions, data, x = 10, y) => {

    doc.table(x, y, data , headerOptions, {
        fontSize: 7,
        headerBackgroundColor: "#185f9d",
        headerTextColor: "white"
    });
}

export const printFooter = ( page, totalPage ) => {

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(`Reporte generado por: Luna Sofware - App `, doc.internal.pageSize.getWidth() - 200, doc.internal.pageSize.getHeight() - 10);

    doc.text(`${ (page+1)}/${totalPage}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);

}