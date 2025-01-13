import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalarioExcedente.css'; // Agrega tu CSS si es necesario

const SalarioExcedente = () => {
    const [salariosExcedentes, setSalariosExcedentes] = useState([]);
    const [nuevoSalarioExcedente, setNuevoSalarioExcedente] = useState({
        idEmpleado: '',
        idConcepto: '',
        fechaInicio: '',
        fechaFin: null,
        valor: '',
        idLista: ''  // Campo adicional
    });
    const [error, setError] = useState(null);
    const [editingSalarioExcedente, setEditingSalarioExcedente] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [conceptos, setConceptos] = useState([]);

    const apiUrl = 'http://localhost:8080/api/salarios-excedentes';  
    const empleadosApiUrl = 'http://localhost:8080/api/empleados';
    const conceptosApiUrl = 'http://localhost:8080/api/conceptos-salariales';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener salarios excedentes
                const salariosResponse = await axios.get(apiUrl);
                console.log('Respuesta de Salarios Excedentes:', salariosResponse.data);
                setSalariosExcedentes(salariosResponse.data || []);

                // Obtener empleados
                const empleadosResponse = await axios.get(empleadosApiUrl);
                console.log('Respuesta de Empleados:', empleadosResponse.data);
                setEmpleados(empleadosResponse.data || []);

                // Obtener conceptos salariales
                const conceptosResponse = await axios.get(conceptosApiUrl);
                console.log('Respuesta de Conceptos Salariales:', conceptosResponse.data);
                setConceptos(conceptosResponse.data || []);
            } catch (error) {
                setError('Error al obtener los datos.');
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSalarioExcedente) {
                // Actualizar salario excedente
                const response = await axios.put(`${apiUrl}/${editingSalarioExcedente.id}`, nuevoSalarioExcedente, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setSalariosExcedentes(salariosExcedentes.map(s => (s.id === editingSalarioExcedente.id ? response.data : s)));
                setEditingSalarioExcedente(null);
            } else {
                // Crear nuevo salario excedente
                const response = await axios.post(apiUrl, nuevoSalarioExcedente);
                setSalariosExcedentes([...salariosExcedentes, response.data]);
            }

            // Limpiar formulario
            setNuevoSalarioExcedente({
                idEmpleado: '',
                idConcepto: '',
                fechaInicio: '',
                fechaFin: '',
                valor: '',
                idLista: ''  // Limpiar campo adicional
            });
            setError(null);
        } catch (error) {
            setError('Error al guardar los datos. Verifique que todos los campos sean correctos.');
        }
    };

    const handleEdit = (salarioExcedente) => {
        setNuevoSalarioExcedente({
            id: salarioExcedente.id,
            idEmpleado: salarioExcedente.idEmpleado,
            idConcepto: salarioExcedente.idConcepto,
            fechaInicio: salarioExcedente.fechaInicio,
            fechaFin: salarioExcedente.fechaFin,
            valor: salarioExcedente.valor,
            idLista: salarioExcedente.idLista || '',  // Campo adicional
        });
        setEditingSalarioExcedente(salarioExcedente);
    };

    const formatNumber = (number) =>
        new Intl.NumberFormat('es-ES').format(number || 0);

    // Filtrar los salarios excedentes por el ID de empleado
    const filteredSalariosExcedentes = salariosExcedentes.filter(salario =>
        salario.idEmpleado.toString().includes(searchTerm)
    );

    // Mapear los salarios excedentes con los nombres de los empleados y conceptos
    const filteredSalariosConNombre = filteredSalariosExcedentes.map(salario => {
        const empleado = empleados.find(emp => emp.id === salario.idEmpleado);
        const concepto = conceptos.find(con => con.id === salario.idConcepto);
        
        return {
            ...salario,
            nombreEmpleado: empleado ? `${empleado.nombre} ${empleado.apellido}` : 'Empleado no encontrado',
            nombreConcepto: concepto ? concepto.nombre : 'Concepto no encontrado'
        };
    });

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <h2>{editingSalarioExcedente ? 'Editar Salario Excedente' : 'Agregar Salario Excedente'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2">
                    <div className="col-md-2">
                        <select
                            className="form-control form-control-sm"
                            value={nuevoSalarioExcedente.idEmpleado || ''}
                            onChange={(e) => setNuevoSalarioExcedente({ ...nuevoSalarioExcedente, idEmpleado: e.target.value })}
                            required
                        >
                            <option value="">Seleccione Empleado</option>
                            {empleados.map(empleado => (
                                <option key={empleado.id} value={empleado.id}>
                                    {empleado.apellido}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select
                            className="form-control form-control-sm"
                            value={nuevoSalarioExcedente.idConcepto || ''}
                            onChange={(e) => setNuevoSalarioExcedente({ ...nuevoSalarioExcedente, idConcepto: e.target.value })}
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
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoSalarioExcedente.fechaInicio}
                            onChange={(e) => setNuevoSalarioExcedente({ ...nuevoSalarioExcedente, fechaInicio: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={nuevoSalarioExcedente.fechaFin}
                            onChange={(e) => setNuevoSalarioExcedente({ ...nuevoSalarioExcedente, fechaFin: e.target.value })}
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Valor"
                            value={nuevoSalarioExcedente.valor}
                            onChange={(e) => setNuevoSalarioExcedente({ ...nuevoSalarioExcedente, valor: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary btn-sm w-100">
                            {editingSalarioExcedente ? 'Actualizar' : 'Agregar'}
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

            <h2>Lista de Salarios Excedentes</h2>
            {filteredSalariosConNombre.length > 0 ? (
                <table className="table table-striped table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>ID Empl</th>
                            <th>Empleado</th>
                            <th>ID Conc</th>
                            <th>Concepto</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th className="text-center">Valor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalariosConNombre.map(salario => (
                            <tr key={salario.id}>
                                <td>{salario.id}</td>
                                <td>{salario.idEmpleado}</td>
                                <td>{salario.nombreEmpleado}</td>
                                <td>{salario.idConcepto}</td>
                                <td>{salario.nombreConcepto}</td>
                                <td>{salario.fechaInicio}</td>
                                <td>{salario.fechaFin}</td>
                                <td className="text-right">{formatNumber(salario.valor)}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(salario)}
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay salarios excedentes disponibles.</p>
            )}
        </div>
    );
};

export default SalarioExcedente;