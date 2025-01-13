import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EMPLEADO_BASE_REST_API_URL = 'http://localhost:8080/api/empleados';
const EMPLEADO_BASE_REST_API_URL2 = 'http://localhost:8080/api/empleados';

export default function EmpleadoLista() {
  const [empls, setEmpls] = useState([]);
  const [empls2, setEmpls2] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  // Obtener los empleados desde la base de datos
  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(EMPLEADO_BASE_REST_API_URL);
      setEmpls(response.data);  // Guardamos los empleados en el estado

    } catch (error) {
      console.error('Error al obtener empleados:', error);
      setError('No se pudo obtener la lista de empleados.');
    } finally {
      setLoading(false);  // Después de obtener los datos, dejamos de cargar
    }
  };

  // Actualizar un empleado

  
  const updateEmpleado = async (empleado) => {
    try {
      await axios.put(`${EMPLEADO_BASE_REST_API_URL2}/${empleado.id}`, empleado);
      // Actualizamos la lista de empleados en el estado
      setEmpls2(prevEmpls2 =>
        prevEmpls2.map(e => (e.id === empleado.id ? empleado : e))
      );
      setEmpleadoEditando(null);  // Cerramos el formulario de edición
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      setError('No se pudo actualizar el empleado.');
    }
  };

  // Establecer el empleado que se está editando
  const handleEdit = (empleado) => {
    setEmpleadoEditando(empleado);
  };

  // Guardar los cambios realizados en el formulario de edición
  const handleSave = (e) => {
    e.preventDefault();
    if (empleadoEditando) {
      updateEmpleado(empleadoEditando);
    }
  };

  // Cambios en los campos del formulario de edición
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditando({ ...empleadoEditando, [name]: value });
  };

  if (loading) return <p>Cargando empleados...</p>;
  if (error) return <p>{error}</p>;
  if (empls.length === 0) return <p>No hay empleados disponibles.</p>;

  return (
    <div className="container">
      <h2 className="text-center">Lista de Empleados</h2>

      {/* Mostrar el formulario de edición cuando un empleado es seleccionado */}
      {empleadoEditando && (
        <div>
          <h3>Editar Empleado</h3>
          <form onSubmit={handleSave}>
  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="nombre"
        placeholder="Nombre"
        value={empleadoEditando.nombre || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="apellido"
        placeholder="Apellido"
        value={empleadoEditando.apellido || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="dni"
        placeholder="DNI"
        value={empleadoEditando.dni || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="date"
        className="form-control"
        name="fechaNacimiento"
        value={empleadoEditando.fechaNacimiento || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="email"
        className="form-control"
        name="email"
        placeholder="Email"
        value={empleadoEditando.email || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="telefono"
        placeholder="Teléfono"
        value={empleadoEditando.telefono || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="direccion"
        placeholder="Dirección"
        value={empleadoEditando.direccion || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="ciudad"
        placeholder="Ciudad"
        value={empleadoEditando.ciudad || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="provincia"
        placeholder="Provincia"
        value={empleadoEditando.idProvincia || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="departamento"
        placeholder="Departamento"
        value={empleadoEditando.departamento || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="convenio"
        placeholder="Convenio"
        value={empleadoEditando.convenio || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="categoria"
        placeholder="Categoría"
        value={empleadoEditando.categoria || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="puesto"
        placeholder="Puesto"
        value={empleadoEditando.idPuesto || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="date"
        className="form-control"
        name="fechaInicio"
        value={empleadoEditando.fechaInicio || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="date"
        className="form-control"
        name="fechaFin"
        value={empleadoEditando.fechaFin || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="number"
        className="form-control"
        name="diasVacacionesPactadas"
        placeholder="Días de Vacaciones Pactadas"
        value={empleadoEditando.diasVacacionesPactadas || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="estadoEmpleado"
        placeholder="Estado Empleado"
        value={empleadoEditando.estadoEmpleado || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="nacionalidad"
        placeholder="Nacionalidad"
        value={empleadoEditando.nacionalidad || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="estadoCivil"
        placeholder="Estado Civil"
        value={empleadoEditando.estadoCivil || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="genero"
        placeholder="Género"
        value={empleadoEditando.genero || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="obraSocial"
        placeholder="Obra Social"
        value={empleadoEditando.obraSocial || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="cbu"
        placeholder="CBU"
        value={empleadoEditando.cbu || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="banco"
        placeholder="Banco"
        value={empleadoEditando.banco || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="tipoCuentaBancaria"
        placeholder="Tipo de Cuenta Bancaria"
        value={empleadoEditando.tipoCuentaBancaria || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <div className="row mt-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="tipoContrato"
        placeholder="Tipo de Contrato"
        value={empleadoEditando.tipoContrato || ''}
        onChange={handleChangeEdit}
      />
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        name="cuil"
        placeholder="CUIL"
        value={empleadoEditando.cuil || ''}
        onChange={handleChangeEdit}
      />
    </div>
  </div>

  <button className="btn btn-success mt-3" type="submit">
    Guardar cambios
  </button>
</form>
        </div>
      )}

      {/* Tabla de empleados */}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>CUIL</th>
            <th>Ingreso</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empls.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.apellido}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.cuil}</td>
              <td>{empleado.fechaInicio}</td>
              <td>{empleado.departamento}</td>     
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(empleado)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

