import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NovedadLiquidacion.css';

const NovedadesLiquidacion = () => {
    const [novedades, setNovedades] = useState([]);
    const [nuevaNovedad, setNuevaNovedad] = useState({
        idConcepto: '',
        idEmpleado: '',
        fechaInicio: '',
        cantidad: ''
    });
    const [error, setError] = useState(null);
    const [editingNovedad, setEditingNovedad] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [conceptos, setConceptos] = useState([]);

    const apiUrl = 'http://localhost:8080/api/novedades';
    const empleadosApiUrl = 'http://localhost:8080/api/empleados';
    const conceptosApiUrl = 'http://localhost:8080/api/conceptos-salariales';

    const [loading, setLoading] = useState(true);  // Inicialmente en loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                const novedadesResponse = await axios.get(apiUrl);
                setNovedades(novedadesResponse.data || []);

                const empleadosResponse = await axios.get(empleadosApiUrl);
                setEmpleados(empleadosResponse.data || []);

                const conceptosResponse = await axios.get(conceptosApiUrl);
                setConceptos(conceptosResponse.data || []);


            } catch (error) {
                setError('Error al obtener los datos.');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNovedad) {
                // Actualizar novedad
                const response = await axios.put(`${apiUrl}/${editingNovedad.id}`, nuevaNovedad, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setNovedades(novedades.map(n => (n.id === editingNovedad.id ? response.data : n)));
                setEditingNovedad(null);
            } else {
                // Crear nueva novedad
                const response = await axios.post(apiUrl, nuevaNovedad);
                setNovedades([...novedades, response.data]);
            }

            // Limpiar formulario
            setNuevaNovedad({
                idConcepto: '',
                idEmpleado: '',
                fechaInicio: '',
                cantidad: ''
            });
            setError(null);
        } catch (error) {
            setError('Error al guardar los datos. Verifique que todos los campos sean correctos.');
        }
    };

    const handleEdit = (novedad) => {
        console.log(novedad.idConcepto);
        setNuevaNovedad({
            id: novedad.id,
            idConcepto: novedad.idConcepto,
            idEmpleado: novedad.idEmpleado,
            fechaInicio: novedad.fechaInicio,
            cantidad: novedad.cantidad
        });
        setEditingNovedad(novedad);
    };

    const formatNumber = (number) =>
        new Intl.NumberFormat('es-ES').format(number || 0);

    const filteredNovedades = novedades.filter(novedad =>
        novedad.idEmpleado.toString().includes(searchTerm)
    );

    const filteredNovedadesConDetalles = filteredNovedades.map(novedad => {
        const empleado = empleados.find(emp => emp.id === novedad.idEmpleado);
        const concepto = conceptos.find(concepto => concepto.id === novedad.idConcepto); // Asegúrate que el `idConcepto` es el que estás buscando
        return {
            ...novedad,
            nombreEmpleado: empleado ? `${empleado.nombre} ${empleado.apellido}` : 'Sin empleado',
            nombreConcepto: concepto ? concepto.nombre : 'Sin concepto' // Esto debería funcionar si los conceptos se están mapeando correctamente
        };
    });

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <h2>{editingNovedad ? 'Editar Novedad' : 'Agregar Novedad'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2">
                    <div className="col-md-2">
                        <select
                            className="form-control form-control-sm"
                            value={nuevaNovedad.idConcepto || ''}
                            onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, idConcepto: e.target.value })}
                            required
                        >
                            <option value="">Seleccione Concepto</option>
                            {conceptos.map(concepto => (
                                <option key={concepto.id} value={concepto.id}>
                                    {concepto.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-control form-control-sm"
                            value={nuevaNovedad.idEmpleado || ''}
                            onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, idEmpleado: e.target.value })}
                            required
                        >
                            <option value="">Seleccione Empleado</option>
                            {empleados.map(empleado => (
                                <option key={empleado.id} value={empleado.id}>
                                    {empleado.nombre} {empleado.apellido}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevaNovedad.fechaInicio}
                            onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, fechaInicio: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Cantidad"
                            value={nuevaNovedad.cantidad}
                            onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, cantidad: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary btn-sm w-100">
                            {editingNovedad ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </form>

            <input
                type="text"
                className="form-control form-control-sm mb-4"
                placeholder="Buscar por ID de empleado"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h2>Lista de Novedades</h2>
            {filteredNovedadesConDetalles.length > 0 ? (
                <table className="table table-striped table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>ID Empl</th>
                            <th>Empleado</th>
                            <th>Id Con</th>
                            <th>Concepto</th>
                            <th>Fecha Inicio</th>
                            <th className="text-center">Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNovedadesConDetalles.map(novedad => (
                            <tr key={novedad.id}>
                                <td>{novedad.id}</td>
                                <td>{novedad.idEmpleado}</td>
                                <td>{novedad.nombreEmpleado}</td>
                                <td>{novedad.idConcepto}</td>
                                <td>{novedad.nombreConcepto}</td>
                                <td>{novedad.fechaInicio}</td>
                                <td className="text-right">{formatNumber(novedad.cantidad)}</td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(novedad)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay novedades disponibles.</p>
            )}
        </div>
    );
};

export default NovedadesLiquidacion;