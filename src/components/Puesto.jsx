import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Puesto.css';

const Puesto = () => {
  const [puestos, setPuestos] = useState([]);
  const [nuevoPuesto, setNuevoPuesto] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState(null);
  const [editingPuesto, setEditingPuesto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:8080/api/puestos';

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 204) {
          setPuestos([]);
        } else {
          setPuestos(response.data);
        }
      })
      .catch(err => setError('Error al obtener los puestos.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPuesto) {
      axios.put(`${apiUrl}/${editingPuesto.idPuesto}`, nuevoPuesto)
        .then(response => {
          if (response.status === 200) {
        
        setPuestos(puestos.map(puesto  =>
          puesto.idPuesto === editingPuesto.idPuesto ? { ...puesto, ...nuevoPuesto } : puesto
            ));
        setNuevoPuesto({ puesto: '', descripcion: '' });
        setEditingPuesto(null);
           } else {
               setError('Error al actualizar el puesto.');
           }
          })
          .catch(err => setError('Error al actualizar el puesto.'));
    } else {
      axios.post(apiUrl, nuevoPuesto)
        .then(response => {
          if (response.status === 201) {
            setPuestos([...puestos, response.data]);
            setNuevoPuesto({ nombre: '', descripcion: '' });
          } else {
            setError('Error al agregar el puesto.');
          }
        })
        .catch(err => setError('Error al agregar el puesto.'));
    }
  };

  const handleEdit = (puesto) => {
    setNuevoPuesto({ nombre: puesto.nombre, descripcion: puesto.descripcion });
    setEditingPuesto(puesto);
  };

  const filteredPuestos = puestos.filter(puesto =>
    puesto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-4">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mt-4">
        <h2>{editingPuesto ? 'Editar Puesto' : 'Agregar Puesto'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre"
                value={nuevoPuesto.nombre}
                onChange={(e) => setNuevoPuesto({ ...nuevoPuesto, nombre: e.target.value })}
                required
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Descripción"
                value={nuevoPuesto.descripcion}
                onChange={(e) => setNuevoPuesto({ ...nuevoPuesto, descripcion: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary btn-sm w-100">
                {editingPuesto ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>Lista de Puestos</h2>
      {puestos.length > 0 ? (
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
              {filteredPuestos.map(puesto => (
                <tr key={puesto.idPuesto}>
                  <td>{puesto.idPuesto}</td>
                  <td>{puesto.nombre}</td>
                  <td>{puesto.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(puesto)}
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
        <p>No hay puestos disponibles.</p>
      )}
    </div>
  );
};

export default Puesto;
