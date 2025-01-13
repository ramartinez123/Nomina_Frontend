import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Banco.css';

const Banco = () => {
  const [bancos, setBancos] = useState([]); // Lista de bancos
  const [nuevoBanco, setNuevoBanco] = useState({ nombre: '', descripcion: '' }); // Datos del nuevo banco
  const [error, setError] = useState(null); // Mensaje de error
  const [editingBanco, setEditingBanco] = useState(null); // Banco en edición
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

  const apiUrl = 'http://localhost:8080/api/bancos';

  // Obtener bancos al cargar el componente
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        if (response.status === 204) {
          setBancos([]); // No hay contenido  
        } else {
          setBancos(response.data);
        }
      })
      .catch(err => setError('Error al obtener los bancos.'));
  }, []);

  // Manejo de envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBanco) {
      // Actualizar banco existente
      axios.put(`${apiUrl}/${editingBanco.idBanco}`, nuevoBanco)
        .then(response => {
          if (response.status === 200) {
            // Agregar el nuevo banco a la lista sin hacer la solicitud GET
            setBancos(bancos.map(banco =>
              banco.idBanco === editingBanco.idBanco ? { ...banco, ...nuevoBanco } : banco
            ));
            
            setNuevoBanco({ nombre: '', descripcion: '' });
            setEditingBanco(null); // Limpiar estado de edición
          } else {
            // Actualizar la lista de bancos
            /*axios.get(apiUrl)
              .then(res => {
                if (res.status === 200) {
                  setBancos(res.data);
                } else {
                  setError('Error al obtener la lista actualizada de bancos.');
                }
              })
              .catch(err => setError('Error al obtener la lista de bancos.'));
            
            setNuevoBanco({ nombre: '', descripcion: '' });
            setEditingBanco(null); // Limpiar estado de edición
          } else {*/
            setError('Error al actualizar el banco.');
          }
        })
        .catch(err => setError('Error al actualizar el banco.'));
    } else {
      // Agregar nuevo banco
      axios.post(apiUrl, nuevoBanco)
        .then(response => {
          if (response.status === 201) {
            setBancos([...bancos, response.data]); // Agregar nuevo banco
            setNuevoBanco({ nombre: '', descripcion: '' }); // Limpiar formulario
          } else {
            setError('Error al agregar el banco.');
          }
        })
        .catch(err => setError('Error al agregar el banco.'));
    }
  };

  // Manejar la edición de un banco
  const handleEdit = (banco) => {
    setNuevoBanco({ nombre: banco.nombre, descripcion: banco.descripcion });
    setEditingBanco(banco); // Establecer banco para edición
  };

  // Filtrar bancos por nombre
  const filteredBancos = bancos.filter(banco =>
    banco.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulario para agregar o editar un banco */}
      <div className="mt-4">
        <h2>{editingBanco ? 'Editar Banco' : 'Agregar Banco'}</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre"
                value={nuevoBanco.nombre}
                onChange={(e) => setNuevoBanco({ ...nuevoBanco, nombre: e.target.value })}
                required
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Descripción"
                value={nuevoBanco.descripcion}
                onChange={(e) => setNuevoBanco({ ...nuevoBanco, descripcion: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary btn-sm w-100">
                {editingBanco ? 'Actualizar' : 'Agregar'}
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

      {/* Lista de bancos */}
      <h2>Lista de Bancos</h2>
      {filteredBancos.length > 0 ? (
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
            {filteredBancos.map(banco => (
              <tr key={banco.idBanco}>
                <td>{banco.idBanco}</td>
                <td>{banco.nombre}</td>
                <td>{banco.descripcion}</td>
                <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(banco)}>
                   <i className="bi bi-pencil"></i> Editar
                </button>
                 {/* <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(banco)}
                  >
                    Editar
                  </button>*/}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay bancos disponibles.</p>
      )}
    </div>
  );
};

export default Banco;