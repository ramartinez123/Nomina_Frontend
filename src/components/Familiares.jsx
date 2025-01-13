import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Familiares.css';

const Familiares = () => {
    const [familiares, setFamiliares] = useState([]);
    const [nuevoFamiliar, setNuevoFamiliar] = useState({
        idParentesco: '',
        apellidoNombre: '',
        fechaNacimiento: '',
        fechaInicio: '',
        fechaFin: '',
        aCargo: false,
        aCargoOSocial: false,
        tieneDiscapacidad: false
    });
    const [error, setError] = useState(null);
    const [editingFamiliar, setEditingFamiliar] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const apiUrl = 'http://localhost:8080/api/familiares';

    const [loading, setLoading] = useState(true);  // Inicialmente en loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                const familiaresResponse = await axios.get(apiUrl);
                setFamiliares(familiaresResponse.data || []);
            } catch (error) {
                setError('Error al obtener los datos.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingFamiliar) {
                // Actualizar familiar
                const response = await axios.put(`${apiUrl}/${editingFamiliar.id}`, nuevoFamiliar, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setFamiliares(familiares.map(f => (f.id === editingFamiliar.id ? response.data : f)));
                setEditingFamiliar(null);
            } else {
                // Crear nuevo familiar
                const response = await axios.post(apiUrl, nuevoFamiliar);
                setFamiliares([...familiares, response.data]);
            }

            // Limpiar formulario
            setNuevoFamiliar({
                idParentesco: '',
                apellidoNombre: '',
                fechaNacimiento: '',
                fechaInicio: '',
                fechaFin: '',
                aCargo: false,
                aCargoOSocial: false,
                tieneDiscapacidad: false
            });
            setError(null);
        } catch (error) {
            setError('Error al guardar los datos. Verifique que todos los campos sean correctos.');
        }
    };

    const handleEdit = (familiar) => {
        setNuevoFamiliar({
            id: familiar.id,
            idParentesco: familiar.idParentesco,
            idEmpleado: familiar.idEmpleado,
            apellidoNombre: familiar.apellidoNombre,
            fechaNacimiento: familiar.fechaNacimiento,
            fechaInicio: familiar.fechaInicio,
            fechaFin: familiar.fechaFin,
            aCargo: familiar.aCargo,
            aCargoOSocial: familiar.aCargoOSocial,
            tieneDiscapacidad: familiar.tieneDiscapacidad
        });
        setEditingFamiliar(familiar);
    };

    const filteredFamiliares = familiares.filter(familiar =>
        familiar.apellidoNombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <h2>{editingFamiliar ? 'Editar Familiar' : 'Agregar Familiar'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2">
                    <div className="col-md-1">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={nuevoFamiliar.idParentesco}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, idParentesco: e.target.value })}
                            placeholder="Parentesco"
                            required
                        />
                    </div>
                    <div className="col-md-1">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={nuevoFamiliar.idEmpleado}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, idEmpleado: e.target.value })}
                            placeholder="Empl"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={nuevoFamiliar.apellidoNombre}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, apellidoNombre: e.target.value })}
                            placeholder="Apellido y Nombre"
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoFamiliar.fechaNacimiento}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, fechaNacimiento: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoFamiliar.fechaInicio}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, fechaInicio: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoFamiliar.fechaFin}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, fechaFin: e.target.value })}
                        />
                    </div>
                </div>

                <div className="row g-2 mt-4">
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <input
                            type="checkbox"
                            checked={nuevoFamiliar.aCargo}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, aCargo: e.target.checked })}
                            className="form-check-input"
                        />
                    </div>
                    <div className="col-md-1">
                        <input
                            type="checkbox"
                            checked={nuevoFamiliar.aCargoOSocial}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, aCargoOSocial: e.target.checked })}
                            className="form-check-input"
                        />
                    </div>
                    <div className="col-md-1">
                        <input
                            type="checkbox"
                            checked={nuevoFamiliar.tieneDiscapacidad}
                            onChange={(e) => setNuevoFamiliar({ ...nuevoFamiliar, tieneDiscapacidad: e.target.checked })}
                            className="form-check-input"
                        />
                    </div>

                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary btn-sm w-100">
                            {editingFamiliar ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </form>

            <input
                type="text"
                className="form-control form-control-sm mb-4"
                placeholder="Buscar por Apellido"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2>Lista de Familiares</h2>
            {filteredFamiliares.length > 0 ? (
                <table className="table table-striped table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Parent</th>
                            <th>Id Empl</th>
                            <th>Empleado</th>
                            <th>Apellido y Nombre</th>
                            <th>Fecha Nacimiento</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>A Cargo</th>
                            <th>A Cargo OSocial</th>
                            <th>Discapac</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFamiliares.map(familiar => (
                            <tr key={familiar.id}>
                                <td>{familiar.id}</td>
                                <td>{familiar.idParentesco}</td>
                                <td>{familiar.idEmpleado}</td>
                                <td>{familiar.apellidoEm}</td>
                                <td>{familiar.apellidoNombre}</td>
                                <td>{familiar.fechaNacimiento}</td>
                                <td>{familiar.fechaInicio}</td>
                                <td>{familiar.fechaFin}</td>
                                <td>{familiar.aCargo ? 'Sí' : 'No'}</td>
                                <td>{familiar.aCargoOSocial ? 'Sí' : 'No'}</td>
                                <td>{familiar.tieneDiscapacidad ? 'Sí' : 'No'}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleEdit(familiar)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay familiares disponibles.</p>
            )}
        </div>
    );
};

export default Familiares;