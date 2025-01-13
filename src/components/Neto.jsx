import React, { useState, useEffect } from 'react';

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mes, setMes] = useState(12);
  const [anio, setAnio] = useState(2024);

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:8080/api/liquidaciones/concepto-491?mes=${mes}&anio=${anio}`
      );
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      console.log('Datos recibidos:', data); // Log para depuración
      setEmpleados(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, [mes, anio]);

  const formatNumber = (number) =>
    new Intl.NumberFormat('es-ES').format(number || 0);

  // Calcular el total neto
  const totalNeto = empleados.reduce(
    (acc, empleado) => acc + (empleado.montoConcepto491 || 0),
    0
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Listado de Netos</h1>

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

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && empleados.length === 0 && !error && (
        <p className="text-center">No hay datos disponibles.</p>
      )}

      {!loading && empleados.length > 0 && (
        <table className="table table-sm table-bordered table-striped" style={{ width: '80%', margin: 'auto' }}>
          <thead className="thead-dark">
            <tr>
              <th className="col-1 text-center">ID</th>
              <th className="col-1 text-center">Apellido</th>
              <th className="col-1 text-center">Nombre</th>
              <th className="col-1 text-center">Neto</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td className="col-1 text-center">{empleado.id}</td>
                <td className="col-1 text-center">{empleado.apellido}</td>
                <td className="col-1 text-center">{empleado.nombre}</td>
                <td className="col-1 text-right">{formatNumber(empleado.montoConcepto491)}</td>
              </tr>
            ))}
            {/* Fila para el total neto */}
            <tr>
              <td colSpan="3" className="text-end font-weight-bold">Total Neto</td>
              <td className="text-right font-weight-bold">{formatNumber(totalNeto)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmpleadoList;