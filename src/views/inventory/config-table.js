import { formatCurrency } from "src/helpers/helpers";

export const headerOptions = [
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

export const columns = [
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
      name: 'Precio $US',
      sortable:true,
      right: true,
      selector: row => (row.price),
    },
    {
      name: 'Subtotal $US',
      sortable:true,
      right: true,
      selector: row => (row.subtotal) 
    }
]