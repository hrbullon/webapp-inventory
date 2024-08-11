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

export const ModalPayment = ({ sale, saleId }) => {

    const dispatch = useDispatch();

    const payments = useSelector(( state ) => state.payments );

    const [visible, setVisible] = useState(false);

    const handleClickFinnish = () => {

    }

    useEffect(() => {

        dispatch( startGettingPayments(saleId) );

    }, [])

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

                    <div className='col-12 mb-3 text-right'>
                        { (sale.total_amount <= sale.total_paid) &&
                        <button type='button' onClick={ handleClickFinnish } className='btn btn-success m-2'>
                            <CIcon icon={icon.cilCheck} title='Finalizar'/> Finalizar
                        </button>
                        }
                    </div>
                </div>
            </CModalBody>
        </CModal>
    </>
  )
}
