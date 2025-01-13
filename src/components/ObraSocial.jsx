import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ObraSocial = () => {
  const [obrasSociales, setObrasSociales] = useState([]);
  const [nuevaObraSocial, setNuevaObraSocial] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState(null);
  const [editingObraSocial, setEditingObraSocial] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = 'http://localhost:8080/api/obras-sociales';

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 204) {
          setObrasSociales([]);
        } else {
          setObrasSociales(response.data);
        }
      })
      .catch(() => setError('Error al obtener las obras sociales.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingObraSocial) {
      axios.put(`${apiUrl}/${editingObraSocial.idObraSocial}`, nuevaObraSocial)
        .then(response => {
          if (response.status === 200) {
            setObrasSociales(obrasSociales.map(obraSocial =>
              obraSocial.idObraSocial === editingObraSocial.idObraSocial ? { ...obraSocial, ...nuevaObraSocial } : obraSocial
            ));
            setNuevaObraSocial({ nombre: '', descripcion: '' });
            setEditingObraSocial(null);
          } else {
            setError('Error al actualizar la obra social.');
          }
        })
        .catch(err => setError('Error al actualizar la Obra Social.'));
    } else {
      axios.post(apiUrl, nuevaObraSocial)
        .then(response => {
          if (response.status === 201) {
            setObrasSociales([...obrasSociales, response.data]);
            setNuevaObraSocial({ nombre: '', descripcion: '' });
          }
        })
        .catch(() => setError('Error al agregar la obra social.'));
    }
  };

  const handleEdit = (obraSocial) => {
    setNuevaObraSocial({ nombre: obraSocial.nombre, descripcion: obraSocial.descripcion });
    setEditingObraSocial(obraSocial);
  };

  const filteredObrasSociales = obrasSociales.filter((obraSocial) =>
    obraSocial.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>{editingObraSocial ? 'Editar Obra Social' : 'Agregar Obra Social'}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Nombre"
              value={nuevaObraSocial.nombre}
              onChange={(e) => setNuevaObraSocial({ ...nuevaObraSocial, nombre: e.target.value })}
              required
            />
          </div>
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Descripción"
              value={nuevaObraSocial.descripcion}
              onChange={(e) => setNuevaObraSocial({ ...nuevaObraSocial, descripcion: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary btn-sm w-100">
              {editingObraSocial ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </div>
      </form>

      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>Lista de Obras Sociales</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {filteredObrasSociales.length > 0 ? (
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
              {filteredObrasSociales.map((obraSocial) => (
                <tr key={obraSocial.idObraSocial}>
                  <td>{obraSocial.idObraSocial}</td>
                  <td>{obraSocial.nombre}</td>
                  <td>{obraSocial.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(obraSocial)}
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
        <p>No hay obras sociales disponibles.</p>
      )}
    </div>
  );
};

export default ObraSocial;