import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AsientoContable.css';

const AsientosContables = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mes, setMes] = useState(12);
  const [anio, setAnio] = useState(2024);

  useEffect(() => {
    // Realiza la llamada a la API con los parámetros mes y año
    axios.get(`http://localhost:8080/api/asientos-contables/suma-por-cuenta?mes=${mes}&anio=${anio}`)
      .then(response => {
        setData(response.data); // Establece los datos obtenidos de la API
        setLoading(false); // Deja de mostrar el estado de carga
      })
      .catch(err => {
        setError('Hubo un error al cargar los datos');
        setLoading(false); // Deja de mostrar el estado de carga
      });
  }, [mes, anio]); // Dependiendo de mes y anio, se vuelve a ejecutar

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) return <div>Loading...</div>;

  // Mostrar un mensaje de error si la solicitud falla
  if (error) return <div>{error}</div>;

  // Ordenar los datos: primero tipo D y luego tipo H
  const sortedData = data.sort((a, b) => {
    if (a.tipo === b.tipo) {
      return 0;
    }
    return a.tipo === 'D' ? -1 : 1;
  });

  // Calcular los totales para D y H
  const totals = sortedData.reduce((acc, item) => {
    if (item.tipo === 'D') {
      acc.D += item.monto;
    } else if (item.tipo === 'H') {
      acc.H += item.monto;
    }
    return acc;
  }, { D: 0, H: 0 });

  // Formato para separar los miles con puntos
  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-ES').format(number || 0);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Asientos Contables</h2>
      
      {/* Selección de mes y año */}
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

      {/* Tabla de los asientos contables */}
      <table className="table table-sm table-bordered table-striped mb-4" >
        <thead  >
          <tr>
            <th className="col-1 text-center">Cuenta Contable</th>
            <th className="col-1 text-center">Tipo</th>
            <th className="col-1 text-center">Monto (D)</th>
            <th className="col-1 text-center">Monto (H)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td className="col-1 text-center">{item.cuentaContable}</td>
              <td className="col-1 text-center">{item.tipo}</td>
              <td className="col-1 text-right">{item.tipo === 'D' ? formatNumber(item.monto) : '-'}</td>
              <td className="col-1 text-right">{item.tipo === 'H' ? formatNumber(item.monto) : '-'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="text-end font-weight-bold">Total</td>
            <td className="text-right font-weight-bold">{formatNumber(totals.D)}</td>
            <td className="text-right font-weight-bold">{formatNumber(totals.H)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AsientosContables;