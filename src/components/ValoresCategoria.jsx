import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ValoresCategoria.css';

const ValoresCategoria = () => {
    const [historicos, setHistoricos] = useState([]);
    const [nuevoHistorico, setNuevoHistorico] = useState({
        idCategoria: '',
        fechaInicio: '',
        fechaBaja: null,
        salario: '',
        almuerzo: ''
    });
    const [error, setError] = useState(null);
    const [editingHistorico, setEditingHistorico] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categorias, setCategorias] = useState([]);

    const apiUrl = 'http://localhost:8080/api/historico-valores-categoria';
    const categoriasApiUrl = 'http://localhost:8080/api/categorias';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const historicosResponse = await axios.get(apiUrl);
                setHistoricos(historicosResponse.data || []);

                const categoriasResponse = await axios.get(categoriasApiUrl);
                setCategorias(categoriasResponse.data || []);
            } catch (error) {
                setError('Error al obtener los datos.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingHistorico) {
                // Actualizar histórico
                const response = await axios.put(`${apiUrl}/${editingHistorico.id}`, nuevoHistorico, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setHistoricos(historicos.map(h => (h.id === editingHistorico.id ? response.data : h)));
                setEditingHistorico(null);
            } else {
                // Crear nuevo histórico
                const response = await axios.post(apiUrl, nuevoHistorico);
                setHistoricos([...historicos, response.data]);
            }

            // Limpiar formulario
            setNuevoHistorico({
                idCategoria: '',
                fechaInicio: '',
                fechaBaja: '',
                salario: '',
                almuerzo: ''
            });
            setError(null);
        } catch (error) {
            setError('Error al guardar los datos. Verifique que todos los campos sean correctos.');
        }
    };

    const handleEdit = (historico) => {
        setNuevoHistorico({
            id: historico.id,
            idCategoria: historico.idCategoria,
            fechaInicio: historico.fechaInicio,
            fechaBaja: historico.fechaBaja,
            salario: historico.salario,
            almuerzo: historico.almuerzo
        });
        setEditingHistorico(historico);
    };

    const formatNumber = (number) =>
        new Intl.NumberFormat('es-ES').format(number || 0);

    const filteredHistoricos = historicos.filter(historico =>
        historico.idCategoria.toString().includes(searchTerm)
    );

    const filteredHistoricosConNombre = filteredHistoricos.map(historico => {
        const categoria = categorias.find(cat => cat.idCategoria === historico.idCategoria);
        return { ...historico, nombreCategoria: categoria ? categoria.nombre : 'Sin categoría' };
    });

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <h2>{editingHistorico ? 'Editar Histórico' : 'Agregar Histórico'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2">
                    <div className="col-md-2">
                        <select
                            className="form-control form-control-sm"
                            value={nuevoHistorico.idCategoria || ''}
                            onChange={(e) => setNuevoHistorico({ ...nuevoHistorico, idCategoria: e.target.value })}
                            required
                        >
                            <option value="">Seleccione Categoría</option>
                            {categorias.map(categoria => (
                                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoHistorico.fechaInicio}
                            onChange={(e) => setNuevoHistorico({ ...nuevoHistorico, fechaInicio: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoHistorico.fechaBaja}
                            onChange={(e) => setNuevoHistorico({ ...nuevoHistorico, fechaBaja: e.target.value })}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Salario"
                            value={nuevoHistorico.salario}
                            onChange={(e) => setNuevoHistorico({ ...nuevoHistorico, salario: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Almuerzo"
                            value={nuevoHistorico.almuerzo}
                            onChange={(e) => setNuevoHistorico({ ...nuevoHistorico, almuerzo: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary btn-sm w-100">
                            {editingHistorico ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </form>

            <input
                type="text"
                className="form-control form-control-sm mb-4"
                placeholder="Buscar por ID de categoría"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2>Lista de Históricos</h2>
            {filteredHistoricosConNombre.length > 0 ? (
                <table className="table table-striped table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Categoría</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Baja</th>
                            <th className='text-center'>Salario</th>
                            <th className='text-center'>Almuerzo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistoricosConNombre.map(historico => (
                            <tr key={historico.id}>
                                <td>{historico.id}</td>
                                <td>{historico.nombreCategoria}</td>
                                <td>{historico.fechaInicio}</td>
                                <td>{historico.fechaBaja}</td>
                                <td className='text-right'>{formatNumber(historico.salario)}</td>
                                <td className='text-right'>{formatNumber(historico.almuerzo)}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        className="btn btn-warning btn-sm me-2 "
                                        onClick={() => handleEdit(historico)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay históricos disponibles.</p>
            )}
        </div>
    );
};

export default ValoresCategoria;