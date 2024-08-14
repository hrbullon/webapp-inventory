import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CModal, CModalBody, CModalHeader } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { FormPayment } from '../payments/FormPayment';
import { CardTotal } from 'src/components/cards/CardTotal';
import { TableDetails as PaymentDetails} from 'src/components/payment/TableDetails';

import { formatCurrency } from 'src/helpers/helpers';

import { startGettingPayments } from 'src/actions/payment';
import { startGettingSaleById } from 'src/actions/sales';

export const ModalPayment = ({ sale, saleId }) => {

    const dispatch = useDispatch();

    const payments = useSelector(( state ) => state.payments );

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        dispatch( startGettingPayments(saleId) );

    }, []);

    useEffect(() => {
        if(payments){
            dispatch( startGettingSaleById( saleId ) );
        }
    }, [payments])

    return (
    <>
         <button
            onClick={ () => setVisible(true) } 
            className="btn btn-warning mb-4 float-end">
            <CIcon icon={ icon.cilDollar } /> Pagos
        </button>
        
        <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
                <h2>Monto a cobrar 
                    <b className='text-danger'> { formatCurrency(sale.total_amount) }</b> 
                </h2>
            </CModalHeader>
            <CModalBody>
                <div className='row'>
                    <div className='col-6'>
                        <FormPayment 
                            sale={sale} 
                            saleId={saleId} 
                            exchangeAmount={ sale.exchange_amount }
                        />
                    </div>
                    <div className='col-6'>
                        <CardTotal model={sale} />
                    </div>
                    <div className='col-12 mb-3'>
                        <PaymentDetails items={ payments } />
                    </div>
                </div>
            </CModalBody>
        </CModal>
    </>
  )
}
