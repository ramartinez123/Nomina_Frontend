import React, { useState } from 'react';

const CargasSociales = () => {
  const [mes, setMes] = useState(12); // Mes inicial
  const [anio, setAnio] = useState(2024); // Año inicial
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const procesarCargasSociales = async () => {
    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch(
        `http://localhost:8080/procesar-cargas-sociales?mes=${mes}&anio=${anio}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Procesar Cargas Sociales</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          procesarCargasSociales();
        }}
      >
        <div className="row mb-4">
          {/* Selector de Mes */}
          <div className="col-md-2">
            <label>Mes</label>
            <select
              className="form-control"
              value={mes}
              onChange={(e) => setMes(parseInt(e.target.value, 10))}
            >
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {new Date(0, index).toLocaleString('es-ES', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Año */}
          <div className="col-md-2">
            <label>Año</label>
            <select
              className="form-control"
              value={anio}
              onChange={(e) => setAnio(parseInt(e.target.value, 10))}
            >
              {Array.from({ length: 5 }, (_, i) => 2025 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? 'Procesando...' : 'Procesar'}
        </button>
      </form>

      {/* Mensaje de resultado */}
      {mensaje && <p className="mt-4">{mensaje}</p>}
    </div>
  );
};

export default CargasSociales;  