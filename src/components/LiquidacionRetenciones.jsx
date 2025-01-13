import React, { useState } from 'react';

const LiquidacionRetenciones = () => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const procesarRetenciones = async () => {
    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch('http://localhost:8080/api/liquidacion/retenciones', {
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
        onClick={procesarRetenciones}
        className="btn btn-primary mt-4" // Agregando clase de Bootstrap
        disabled={cargando}
      >
        {cargando ? 'Procesando...' : 'Procesar '}
      </button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default LiquidacionRetenciones;