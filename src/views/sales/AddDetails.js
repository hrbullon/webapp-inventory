import { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import { startGettingProductsWithStock } from 'src/actions/product';
import { startCreatingSaleDetails } from 'src/actions/sales';
import { prepareOptions } from 'src/helpers/helpers';
import { getProductById } from 'src/services/productsServices';
import { addRowDetail } from './selector';

export const AddDetails = ({ sale, saleId }) => {

    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [serial, setSerial] = useState("");

    const products = useSelector(( state ) => state.products );

    useEffect(() => {
        dispatch( startGettingProductsWithStock() );
    }, [])

    useEffect(() => {
        if(products && products !== undefined){
            const items = prepareOptions(products);
            setOptions(items);
        }
    }, [ products ]);

    const handleChangingProduct = async (input) => {
        
        const res = await getProductById(input.value);
        const { product } = res;

        if(Number(product.quantity) >= Number(quantity)) {
            
            const sale_details = addRowDetail({ product, quantity, sale, serial});
            sale_details.sale_id = saleId;

            dispatch( startCreatingSaleDetails(sale_details) );

            setSerial("");

        } else {
            swal("Alerta", `Cantidad: ${ quantity } no disponible, quedan ${ (product.quantity) }`,'warning');
        }
    }

    return (
    <div className="card">
        <div className="card-body">
            <div className='row'>
                <div className="col-4">
                    <input 
                        type="text" 
                        name="serial" 
                        placeholder='Número Serial ej. xxxx-xxxx' 
                        value={ serial } 
                        className="form-control"
                        onChange={ (e) => setSerial(e.target.value) } 
                    />
                </div>
                <div className="col-4">
                    <input 
                        type="number" 
                        name="quantity" 
                        value={ quantity } 
                        className="form-control"
                        onChange={ (e) => setQuantity(e.target.value) } 
                    />
                </div>
                <div className="col-4">
                    <Select options={options} onChange={handleChangingProduct}/>
                </div>
            </div>
        </div>
    </div>
  )
}
