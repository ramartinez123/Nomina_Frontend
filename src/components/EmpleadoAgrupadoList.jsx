import React, { useState, useEffect } from 'react';

const EmpleadoAgrupadoList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState(12); // Estado para el mes
  const [anio, setAnio] = useState(2024); // Estado para el año

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/api/empleados/agrupados-por-banco?mes=${mes}&anio=${anio}`);

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setEmpleados(data); // Establecer los datos obtenidos
      } catch (err) {
        setError('No se pudo cargar los datos.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, [mes, anio]);

  const formatNumber = (number) => {
    if (number === 0 || !number) return '0';
    return new Intl.NumberFormat('es-ES').format(number);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Agrupar empleados por banco
  const empleadosAgrupados = empleados.reduce((acc, empleado) => {
    const { banco } = empleado;
    if (!acc[banco]) {
      acc[banco] = [];
    }
    acc[banco].push(empleado);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Listado de Netos</h1>

      {/* Formulario para seleccionar mes y año */}
      <div className="row mb-4">
        <div className="col-md-2">
          <label>Mes</label>
          <select
            className="form-control"
            value={mes}
            onChange={(e) => setMes(parseInt(e.target.value))}
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
            onChange={(e) => setAnio(parseInt(e.target.value))}
          >
            {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mostrar error si existe */}
      {error && <p className="text-center text-danger">{error}</p>}

      {loading ? (
        <p className="text-center">Cargando datos...</p>
      ) : (
        // Mostrar los datos agrupados por banco
        Object.keys(empleadosAgrupados).map((banco) => {
          const empleadosPorBanco = empleadosAgrupados[banco];
          const totalNeto = empleadosPorBanco.reduce((acc, empleado) => acc + empleado.monto, 0);

          return (
            <div key={banco} className="table-responsive mb-4">
              <h2 className="text-center">{banco}</h2>
              <table className="table table-sm table-bordered table-striped" style={{ width: '80%', margin: 'auto' }}>
                <thead className="thead-dark">
                  <tr>
                    <th className="col-1 text-center">CBU</th>
                    <th className="col-2 text-center">Apellido</th>
                    <th className="col-2 text-center">Nombre</th>
                    <th className="col-1 text-center">Neto  </th>
                  </tr>
                </thead>
                <tbody>
                  {empleadosPorBanco.map((empleado) => (
                    <tr key={empleado.cbu}>
                      <td className="text-center">{empleado.cbu}</td>
                      <td className="text-center">{empleado.apellido}</td>
                      <td className="text-center">{empleado.nombre}</td>
                      <td className="text-right">{formatNumber(empleado.monto)}</td>
                    </tr>
                  ))}
                  <tr className="font-weight-bold">
                    <td colSpan="3" className="text-end">Total Neto</td>
                    <td className="text-right">{formatNumber(totalNeto)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
};

export default EmpleadoAgrupadoList;  