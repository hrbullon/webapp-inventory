import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export const Barcode = ({ value }) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    JsBarcode(canvas, value);
  }, [value]);

  return <canvas ref={canvasRef} />;
}