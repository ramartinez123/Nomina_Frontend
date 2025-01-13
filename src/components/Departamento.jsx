import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Departamento.css';

const Departamento = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [nuevoDepartamento, setNuevoDepartamento] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState(null);
  const [editingDepartamento, setEditingDepartamento] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:8080/api/departamentos';

  // Obtener todos los departamentos al cargar el componente
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 204) {
          setDepartamentos([]);
        } else {
          setDepartamentos(response.data);
        }
      })
      .catch(err => setError('Error al obtener los departamentos.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingDepartamento) {
      // Actualizar un departamento existente
      axios.put(`${apiUrl}/${editingDepartamento.idDepartamento}`, nuevoDepartamento)
        .then(response => {
          if (response.status === 200) {
            axios.get(apiUrl)
              .then(res => setDepartamentos(res.data))
              .catch(err => setError('Error al obtener la lista actualizada de departamentos.'));
            setNuevoDepartamento({ nombre: '', descripcion: '' });
            setEditingDepartamento(null);
          } else {
            setError('Error al actualizar el departamento.');
          }
        })
        .catch(err => setError('Error al actualizar el departamento.'));
    } else {
      // Crear un nuevo departamento
      axios.post(apiUrl, nuevoDepartamento)
        .then(response => {
          if (response.status === 201) {
            setDepartamentos([...departamentos, response.data]);
            setNuevoDepartamento({ nombre: '', descripcion: '' });
          } else {
            setError('Error al agregar el departamento.');
          }
        })
        .catch(err => setError('Error al agregar el departamento.'));
    }
  };

  const handleEdit = (departamento) => {
    setNuevoDepartamento({ nombre: departamento.nombre, descripcion: departamento.descripcion });
    setEditingDepartamento(departamento);
  };

  const filteredDepartamentos = departamentos.filter(departamento =>
    departamento.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}



      {/* Formulario para agregar/editar */}
      <div className="mt-4">
        <h2>{editingDepartamento ? 'Editar Departamento' : 'Agregar Departamento'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre"
                value={nuevoDepartamento.nombre}
                onChange={(e) => setNuevoDepartamento({ ...nuevoDepartamento, nombre: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Descripción"
                value={nuevoDepartamento.descripcion}
                onChange={(e) => setNuevoDepartamento({ ...nuevoDepartamento, descripcion: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-primary btn-sm w-100">
                {editingDepartamento ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Lista de departamentos */}
      <h2>Lista de Departamentos</h2>
      {departamentos.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead >
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartamentos.map(departamento => (
                <tr key={departamento.idDepartamento}>
                  <td>{departamento.idDepartamento}</td>
                  <td>{departamento.nombre}</td>
                  <td>{departamento.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(departamento)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay departamentos disponibles.</p>
      )}
    </div>
  );
};

export default Departamento;