import React from 'react'
import { ActionButtons } from 'src/components/forms/ActionButtons'

export const Cash = () => {
  return (
    <div>
        <div class="mb-3">
            <label for="tipo">Tipo</label>
            <select class="form-select" name="type">
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="reason">Motivo</label>
            <textarea class="form-control" name="reason" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label for="amount">Cantidad</label>
            <input type="text" class="form-control" name="amount"/>
        </div>
        <ActionButtons />
    </div>
  )
}
