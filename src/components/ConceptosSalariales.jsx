import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ConceptosSalariales.css';

const ConceptosSalariales = () => {
    const [conceptos, setConceptos] = useState([]);
    const [nuevoConcepto, setNuevoConcepto] = useState({
        nombre: '',
        tipo: '',
        cuentaContable: ''
    });
    const [error, setError] = useState(null);
    const [editingConcepto, setEditingConcepto] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const apiUrl = 'http://localhost:8080/api/conceptos-salariales';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setConceptos(response.data || []);
            } catch (error) {
                setError('Error al obtener los conceptos salariales.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingConcepto) {
                // Actualizar concepto salarial
                const response = await axios.put(`${apiUrl}/${editingConcepto.id}`, nuevoConcepto, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setConceptos(conceptos.map(c => (c.id === editingConcepto.id ? response.data : c)));
                setEditingConcepto(null);
            } else {
                // Crear nuevo concepto salarial
                const response = await axios.post(apiUrl, nuevoConcepto, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setConceptos([...conceptos, response.data]);
            }

            // Limpiar formulario
            setNuevoConcepto({
                nombre: '',
                tipo: '',
                cuentaContable: ''
            });
            setError(null);
        } catch (error) {
            setError('Error al guardar el concepto salarial. Verifique que todos los campos sean correctos.');
        }
    };

    const handleEdit = (concepto) => {
        setNuevoConcepto({
            id: concepto.id,
            nombre: concepto.nombre,
            tipo: concepto.tipo,
            cuentaContable: concepto.cuentaContable
        });
        setEditingConcepto(concepto);
    };

    const formatNumber = (number) =>
        new Intl.NumberFormat('es-ES').format(number || 0);

    const filteredConceptos = conceptos.filter(concepto =>
        concepto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <h2>{editingConcepto ? 'Editar Concepto Salarial' : 'Agregar Concepto Salarial'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2">
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Nombre del concepto"
                            value={nuevoConcepto.nombre}
                            onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, nombre: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Tipo"
                            value={nuevoConcepto.tipo}
                            onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, tipo: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Cuenta Contable"
                            value={nuevoConcepto.cuentaContable}
                            onChange={(e) => setNuevoConcepto({ ...nuevoConcepto, cuentaContable: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary btn-sm w-100">
                            {editingConcepto ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </form>

            <input
                type="text"
                className="form-control form-control-sm mb-4"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2>Lista de Conceptos Salariales</h2>
            {filteredConceptos.length > 0 ? (
                <table className="table table-striped table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Cuenta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConceptos.map(concepto => (
                            <tr key={concepto.id}>
                                <td>{concepto.id}</td>
                                <td>{concepto.nombre}</td>
                                <td>{concepto.tipo}</td>
                                <td>{concepto.cuentaContable}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(concepto)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay conceptos salariales disponibles.</p>
            )}
        </div>
    );
};

export default ConceptosSalariales;