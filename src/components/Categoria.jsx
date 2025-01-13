import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Convenio.css';

const Convenio = () => {
  const [convenios, setConvenios] = useState([]);
  const [nuevoConvenio, setNuevoConvenio] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState(null);
  const [editingConvenio, setEditingConvenio] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:8080/api/convenios';

  // Obtener convenios al cargar el componente
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 204) {
          setConvenios([]);
        } else {
          setConvenios(response.data);
        }
      })
      .catch(err => setError('Error al obtener los convenios.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingConvenio) {
      // Actualizar convenio existente
      axios.put(`${apiUrl}/${editingConvenio.idConvenio}`, nuevoConvenio)
        .then(response => {
          if (response.status === 200) {
            axios.get(apiUrl)
              .then(res => setConvenios(res.data))
              .catch(err => setError('Error al obtener la lista de convenios.'));
            setNuevoConvenio({ nombre: '', descripcion: '' });
            setEditingConvenio(null);
          } else {
            setError('Error al actualizar el convenio.');
          }
        })
        .catch(err => setError('Error al actualizar el convenio.'));
    } else {
      // Agregar nuevo convenio
      axios.post(apiUrl, nuevoConvenio)
        .then(response => {
          if (response.status === 201) {
            setConvenios([...convenios, response.data]);
            setNuevoConvenio({ nombre: '', descripcion: '' });
          } else {
            setError('Error al agregar el convenio.');
          }
        })
        .catch(err => setError('Error al agregar el convenio.'));
    }
  };

  const handleEdit = (convenio) => {
    setNuevoConvenio({ nombre: convenio.nombre, descripcion: convenio.descripcion });
    setEditingConvenio(convenio);
  };

  const filteredConvenios = convenios.filter(convenio =>
    convenio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}


      {/* Formulario para agregar/editar */}
      <div className="mt-4">
        <h2>{editingConvenio ? 'Editar Convenio' : 'Agregar Convenio'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre"
                value={nuevoConvenio.nombre}
                onChange={(e) => setNuevoConvenio({ ...nuevoConvenio, nombre: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Descripción"
                value={nuevoConvenio.descripcion}
                onChange={(e) => setNuevoConvenio({ ...nuevoConvenio, descripcion: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-primary btn-sm w-100">
                {editingConvenio ? 'Actualizar' : 'Agregar'}
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

      {/* Lista de convenios */}
      <h2>Lista de Convenios</h2>
      {convenios.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredConvenios.map(convenio => (
                <tr key={convenio.idConvenio}>
                  <td>{convenio.idConvenio}</td>
                  <td>{convenio.nombre}</td>
                  <td>{convenio.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(convenio)}
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
        <p>No hay convenios disponibles.</p>
      )}
    </div>
  );
};

export default Convenio;