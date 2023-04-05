import React from 'react';

import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

export const ActionButtons = () => {
  return (
    <div className='col-12 mt-2'>
        <button type='submit' className='btn btn-primary'>
            <CIcon icon={icon.cilSave} title='Guardar datos'/> Guardar
        </button>
        <button type='reset' className='btn btn-secondary m-2'>
            <CIcon icon={icon.cilReload} title='Cancelar'/> Cancelar
        </button>
    </div>
  )
}
