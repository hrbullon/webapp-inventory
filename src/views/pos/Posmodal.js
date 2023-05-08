import React from 'react';
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';

export const Posmodal = ({ title, Component }) => {
  return (
    <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{ title }</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <Component/>
        </CModalBody>
    </CModal>
  )
}
