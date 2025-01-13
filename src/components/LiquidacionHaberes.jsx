import React, { useState } from 'react';

const RealizarLiquidacion = () => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const realizarLiquidacion = async () => {
    setCargando(true);
    setMensaje('');
    try {
      const response = await fetch('http://localhost:8080/api/liquidacion/realizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.text();
        setMensaje(data);
      } else {
        const errorText = await response.text();
        setMensaje(`Error: ${errorText}`);
      }
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
<div>
  <button 
    onClick={realizarLiquidacion} 
    className="btn btn-primary mt-4" // Clase Bootstrap para estilo
    disabled={cargando}
  >
    {cargando ? 'Procesando...' : 'Procesar'}
  </button>
  {mensaje && <p>{mensaje}</p>}
</div>


  );
};

export default RealizarLiquidacion;