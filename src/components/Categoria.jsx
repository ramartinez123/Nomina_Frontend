import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Categoria.css';

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '', descripcion: '' });
  const [error, setError] = useState(null);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:8080/api/categorias';

  // Obtener categorías al cargar el componente
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 204) {
          setCategorias([]);
        } else {
          setCategorias(response.data);
        }
      })
      .catch(err => setError('Error al obtener las categorías.'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategoria) {
      // Actualizar categoría existente
      axios.put(`${apiUrl}/${editingCategoria.idCategoria}`, nuevaCategoria)
        .then(response => {
          if (response.status === 200) {
            axios.get(apiUrl)
              .then(res => setCategorias(res.data))
              .catch(err => setError('Error al obtener la lista de categorías.'));
            setNuevaCategoria({ nombre: '', descripcion: '' });
            setEditingCategoria(null);
          } else {
            setError('Error al actualizar la categoría.');
          }
        })
        .catch(err => setError('Error al actualizar la categoría.'));
    } else {
      // Agregar nueva categoría
      axios.post(apiUrl, nuevaCategoria)
        .then(response => {
          if (response.status === 201) {
            setCategorias([...categorias, response.data]);
            setNuevaCategoria({ nombre: '', descripcion: '' });
          } else {
            setError('Error al agregar la categoría.');
          }
        })
        .catch(err => setError('Error al agregar la categoría.'));
    }
  };

  const handleEdit = (categoria) => {
    setNuevaCategoria({ nombre: categoria.nombre, descripcion: categoria.descripcion });
    setEditingCategoria(categoria);
  };

  const filteredCategorias = categorias.filter(categoria =>
    categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulario para agregar/editar */}
      <div className="mt-4">
        <h2>{editingCategoria ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre"
                value={nuevaCategoria.nombre}
                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Descripción"
                value={nuevaCategoria.descripcion}
                onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-primary btn-sm w-100">
                {editingCategoria ? 'Actualizar' : 'Agregar'}
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

      {/* Lista de categorías */}
      <h2>Lista de Categorías</h2>
      {categorias.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategorias.map(categoria => (
                <tr key={categoria.idCategoria}>
                  <td>{categoria.idCategoria}</td>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(categoria)}
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
        <p>No hay categorías disponibles.</p>
      )}
    </div>
  );
};

export default Categoria;