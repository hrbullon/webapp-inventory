import React from 'react';
import { 
    CModal, 
    CModalHeader,
    CModalTitle,
    CModalBody, 
    CModalFooter 
} from '@coreui/react';

import { Document } from '../report/Document';

export const ViewModal = ({ title, visible, setVisible, data, details, doc }) => {
  return (
    <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{ title }</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <Document data={ data } details={ details } doc={ doc }/>
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
    </CModal>
  )
}
