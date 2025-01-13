import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LiquidacionResultado.css';

const LiquidacionResultado = () => {
  // Estados para el mes y el año seleccionados
  const [mes, setMes] = useState(12);  // Default: diciembre
  const [anio, setAnio] = useState(2024);  // Default: 2024

  const [liquidacionData, setLiquidacionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar la liquidación cuando cambian el mes o el año
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/liquidaciones/periodo/${mes}/${anio}`)
      .then(response => {
        setLiquidacionData(response.data); // Guardamos los datos de la liquidación
        setLoading(false);
      })
      .catch(err => {
        setError('Hubo un error al obtener los datos');
        setLoading(false);
      });
  }, [mes, anio]);

  // Función para agregar puntos de miles
  const formatoMiles = (numero) => {
    return numero.toLocaleString('es-AR');
  };

  // Si está cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si hubo un error, mostramos el mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si se obtienen los datos, mostramos la liquidación
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Liquidación de Sueldos</h2>

      {/* Diseño de los selects con Bootstrap */}
      <div className="row mb-4">
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

      {liquidacionData && liquidacionData.detalles ? (
        liquidacionData.detalles.map((empleadoDetalle, index) => {
          const conceptosSin491 = empleadoDetalle.conceptos.filter(c =>
            c.conceptoId !== 491 &&
            c.conceptoId !== 91 &&
            c.conceptoId !== 191 &&
            c.conceptoId !== 230 &&
            c.conceptoId < 1001
          );

          const concepto491 = empleadoDetalle.conceptos.find(c => c.conceptoId === 491);
          const concepto91 = empleadoDetalle.conceptos.find(c => c.conceptoId === 91);
          const concepto191 = empleadoDetalle.conceptos.find(c => c.conceptoId === 191);
          const concepto230 = empleadoDetalle.conceptos.find(c => c.conceptoId === 230);

          const montoConcepto491 = concepto491 ? concepto491.monto : 0;
          const montoConcepto91 = concepto91 ? concepto91.monto : 0;
          const montoConcepto191 = concepto191 ? concepto191.monto : 0;
          const montoConcepto230 = concepto230 ? concepto230.monto : 0;

          const montoFinalRetenciones = montoConcepto191 + montoConcepto230;

          return (
            <div key={index} className="mb-4">
              <h3 className="header-right">Empleado: {empleadoDetalle.empleado.nombre}</h3>
              <div className="table-responsive" style={{ maxWidth: '70%', margin: '0 auto' }}>
                <table className="table table-sm table-bordered table-striped mb-4">
                  <thead>
                    <tr>
                      <th className="text-center col-1">Id</th>
                      <th className="text-center col-4">Concepto</th>
                      <th className="text-center col-2">Haberes</th>
                      <th className="text-center col-2">Retenciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conceptosSin491.map((concepto, idx) => (
                      <tr key={idx}>
                        <td>{concepto.conceptoId}</td>
                        <td>{concepto.nombre}</td>
                        <td className="text-right">
                          {concepto.conceptoId >= 101 ? '-' : `$${formatoMiles(concepto.monto)}`}
                        </td>
                        <td className="text-right">
                          {concepto.conceptoId >= 101 ? `$${formatoMiles(concepto.monto)}` : '-'}
                        </td>
                      </tr>
                    ))}
                    {concepto230 && (
                      <tr>
                        <td>{concepto230.conceptoId}</td>
                        <td>{concepto230.nombre}</td>
                        <td className="text-right">-</td>
                        <td className="text-right">{`$${formatoMiles(concepto230.monto)}`}</td>
                      </tr>
                    )}
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>Total</strong></td>
                      <td className="text-right"><strong>{`$${formatoMiles(montoConcepto91)}`}</strong></td>
                      <td className="text-right"><strong>{`$${formatoMiles(montoFinalRetenciones)}`}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {montoConcepto491 !== null && (
                <div style={{ paddingLeft: '140px', marginTop: '4   px' }}>
                  <p><strong>Total Neto: ${formatoMiles(montoConcepto491)}</strong></p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>No se encontraron detalles de liquidación.</div>
      )}
    </div>
  );
};

export default LiquidacionResultado;