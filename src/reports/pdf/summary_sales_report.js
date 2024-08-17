import moment from "moment";
import { createPdf, printFooter, printHeader, printTable } from "src/helpers/ReportPdf"
import { formatNumber } from "src/helpers/helpers";
import { getDiscountsWithTotalAmount, getSalesAndPaymentsWIthTotalAmount } from "src/views/sales/report/selector";

const headerOptionsSales = [
    {
        name:"product",
        prompt:"Producto",
        width: 100,
    },
    {
        name:"quantity",
        prompt:"Cantidad",
        width: 30,
    },
    {
        name:"total_amount",
        prompt:"Monto $USD",
        width: 30,
    },
    {
        name:"total_amount_converted",
        prompt:"Monto Bs",
        width: 30,
    },
];

const headerOptionsPayments = [
    {
        name:"payment_method",
        prompt:"Método de pago",
        width: 50,
    },
    {
        name:"total_amount",
        prompt:"Monto $USD",
        width: 50,
    },
    {
        name:"total_amount_converted",
        prompt:"Monto Bs",
        width: 50,
    },
]

const headerOptionsDiscounts = [
    {
        name:"description",
        prompt:"Descripción",
        width: 50,
    },
    {
        name:"percentage",
        prompt:"Porcentaje %",
        width: 50,
    },
    {
        name:"discount",
        prompt:"Monto $USD",
        width: 50,
    },
    {
        name:"discount_converted",
        prompt:"Monto Bs",
        width: 50,
    },
]

export const generateSummarySalesReport = (company, sales, payments, transactionSummary, totalAmountCashSale, discountSummary) => {

    const salesPerPage = 10;
    const doc = createPdf(company);

    //Get pages number
    const pageNumber = Math.ceil( ( (sales.length+payments.length)/salesPerPage));
    
    const salesItems = getSalesAndPaymentsWIthTotalAmount(sales, "sales");
    const paymentsItems = getSalesAndPaymentsWIthTotalAmount(payments, "payments");
    const discountItems = getDiscountsWithTotalAmount(discountSummary);

    for (let i = 0; i < pageNumber; i++) {

        const start = i * salesPerPage;
        const end = (i + 1) * salesPerPage;
        const pageData = salesItems.slice(start, end);

        if(i > 0){
            doc.addPage();
        }
       
        printHeader(company);
    
        doc.text("Reporte diario de ventas X", 110, 50, { align: "center" }); 
        
        doc.text(`Total ventas: ${ formatNumber(transactionSummary.count_sales) }`, 10, 55, { align: "left"}); 
        doc.text(`Monto Cobrado por Ventas: ${ formatNumber(transactionSummary.total_amount_sales) }`, 10, 60, { align: "left"}); 
        doc.text(`Monto Real Ventas: ${ formatNumber(transactionSummary.real_total_sale) }`, 10, 65, { align: "left"}); 
        
        doc.text(`___________Montos Efectivo________________`, 10, 75, { align: "left"}); 
        
        doc.text(`Monto apertura: ${ formatNumber(transactionSummary.total_amount_cash_starting) }`, 10, 80, { align: "left"}); 
        doc.text(`Monto ventas: ${ formatNumber(totalAmountCashSale) }`, 10, 85, { align: "left"}); 
        doc.text(`Monto ingreso: ${ formatNumber(transactionSummary.total_amount_in_cash) }`, 10, 90, { align: "left"}); 
        doc.text(`Monto salida: ${ formatNumber(transactionSummary.total_amount_out_cash) }`, 10, 95, { align: "left"}); 
        doc.text(`Monto Vueltos/Cambios: ${ formatNumber(transactionSummary.total_amount_change) }`, 10, 100, { align: "left"}); 
        doc.text(`Total Efectivo $US en caja: ${ formatNumber(transactionSummary.total_amount_cash_ending) }`, 10, 105, { align: "left"}); 
        
        if(pageData.length > 0){
            doc.setFontSize(15);
            doc.text("Ventas", 10, 115, { align: "left"}); 

            printTable(headerOptionsSales, pageData, 10, 120);

        }

        if ((pageNumber-1) == i) {
            doc.setFontSize(15);
            doc.text("Descuentos", 10, (pageData.length*10)+130, { align: "left"}); 
            printTable(headerOptionsDiscounts, discountItems, 10, (pageData.length*10)+140);
        }

        if ((pageNumber-1) == i) {

            const startTable = (pageData.length*10)+(discountItems.length*10)+160;

            doc.setFontSize(15);
            doc.text("Pagos", 10, startTable, { align: "left"}); 
            printTable(headerOptionsPayments, paymentsItems, 10, (startTable)+10);
        }

        printFooter(i,pageNumber);
    }

    const date = moment().format("DD-MM-YYYY");
    var blob = doc.output('blob');

    // Crear una URL del Blob
    var url = URL.createObjectURL(blob);
    
    // Abrir una nueva pestaña del navegador con el PDF
    window.open(url);
    //doc.save(`Reporte de Ventas X (Diario)-${date}.pdf`);

}