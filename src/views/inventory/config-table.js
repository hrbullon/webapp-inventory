
export const headerOptions = [
    {
      name:"code",
      prompt:"Código",
      width: 50
    },
    {
      name:"name",
      prompt:"Nombre",
      width: 120
    },
    {
      name:"quantity",
      prompt:"Stock",
      width: 30,
      align:"right"
    },
    {
      name:"price",
      prompt:"Precio $US",
      width: 30,
      align:"right"
    },
    {
      name:"subtotal",
      prompt:"Subtotal $US",
      width: 30,
      align:"right"
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