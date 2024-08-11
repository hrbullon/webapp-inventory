import React, { useState } from 'react';

import { CModal, CModalBody, CModalHeader } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

import { Form as FormDiscount } from '../../components/discount/Form';
import { TableDetails as DiscountDetails } from 'src/components/discount/TableDetails';

export const ModalDiscount = ({ sale, saleId }) => {

    const [visible, setVisible] = useState(false);

    return (
    <>  
        <button 
            onClick={ () => setVisible(true) }
            className="btn btn-light mb-4 float-end" 
        >
            <CIcon icon={ icon.cilTag } /> Descuentos
        </button>

        <CModal size="md" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)} />
            <CModalBody>
                <div className='row'>
                    <div className='col-12'>
                        <FormDiscount sale={ sale } saleId={ saleId } />
                    </div>

                    <div className='col-12 mt-4'>
                        <DiscountDetails saleId={ saleId } />
                    </div>
                </div>
            </CModalBody>
        </CModal>   
    </>
  )
}
