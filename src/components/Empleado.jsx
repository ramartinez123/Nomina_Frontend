/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EMPLEADO_BASE_REST_API_URL = 'http://localhost:8080/api/empleados';

export default function Empleado() {
  const [empls, setEmpls] = useState([]); // Inicializar como arreglo vacío
  const [error, setError] = useState(null); // Manejo de errores opcional

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get(EMPLEADO_BASE_REST_API_URL);
      setEmpls(response.data); // Guardar el arreglo de empleados
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      setError('No se pudo obtener la lista de empleados.');
    }
  };

  const deleteEmpleado = async (id) => {
    try {
      await axios.delete(`${EMPLEADO_BASE_REST_API_URL}/${id}`);
      setEmpls(empls.filter(empleado => empleado.id !== id)); // Eliminar localmente el empleado
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      setError('No se pudo eliminar el empleado.');
    }
  };

  if (error) return <p>{error}</p>;
  if (empls.length === 0) return <p>No hay empleados disponibles.</p>;

  return (
    <div className="container">
      <h2 className="text-center">Lista de Empleados</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Apellido</th>
            <th scope="col">Nombre</th>
            <th scope="col">Departamento</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empls.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.apellido}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.idDepartamento}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmpleado(empleado.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
    
const EMPLEADO_BASE_REST_API_URL = 'http://localhost:8080/api/empleados';
const DEPARTAMENTO_API_URL = 'http://localhost:8080/api/departamentos';
const CONVENIO_API_URL = 'http://localhost:8080/api/convenios';
const CATEGORIA_API_URL = 'http://localhost:8080/api/categorias';
const PROVINCIA_API_URL = 'http://localhost:8080/api/provincias';
const PUESTO_API_URL = 'http://localhost:8080/api/puestos';
const BANCO_API_URL = 'http://localhost:8080/api/bancos';
const OBRA_SOCIAL_API_URL = 'http://localhost:8080/api/obras-sociales';
const ESTADO_CIVIL_API_URL = 'http://localhost:8080/api/enumes/estado-civil';
const GENERO_API_URL = 'http://localhost:8080/api/enumes/genero';
const CUENTA_BANCARIA_API_URL = 'http://localhost:8080/api/enumes/cuenta-bancaria';
const ESTADO_EMPLEADO_API_URL = 'http://localhost:8080/api/enumes/estado-empleado';
const TIPO_CONTRATO_API_URL = 'http://localhost:8080/api/enumes/contrato';

export default function EmpleadoForm() {
  const [empleado, setEmpleado] = useState({
    nombre: '',
    apellido: '', 
    dni: '',
    cuil: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    idProvincia: '',
    idDepartamento: '',
    idConvenio: '',
    idCategoria: '',
    idPuesto: '',
    idBanco: '',
    idObraSocial: '',
    estadoEmpleado: '',
    estadoCivil: '',
    genero: '',
    tipoContrato: '',
    tipoCuentaBancaria: '',
    fechaNacimiento: '',
    fechaInicio: '',
    fechaFin: '',
    diasVacacionesPactadas: 0,
    cbu: '',
    nacionalidad: '',
  });
  const [departamentos, setDepartamentos] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [estadosCivil, setEstadosCivil] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [puestos, setPuestos] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [tiposCuentasBancarias, setTiposCuentasBancarias] = useState([]);
  const [tipoContratos, setTipoContratos] = useState([]);
  const [estadoEmpleados, setEstadoEmpleados] = useState([]);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(null);


  // Cargar listas
  useEffect(() => {
    fetchData(DEPARTAMENTO_API_URL, setDepartamentos);
    fetchData(CONVENIO_API_URL, setConvenios);
    fetchData(CATEGORIA_API_URL, setCategorias);
    fetchData(PROVINCIA_API_URL, setProvincias);
    fetchData(PUESTO_API_URL, setPuestos);
    fetchData(BANCO_API_URL, setBancos);
    fetchData(OBRA_SOCIAL_API_URL, setObrasSociales);
    fetchData(ESTADO_CIVIL_API_URL, setEstadosCivil);
    fetchData(GENERO_API_URL, setGeneros);
    fetchData(CUENTA_BANCARIA_API_URL, setTiposCuentasBancarias);
    fetchData(ESTADO_EMPLEADO_API_URL, setEstadoEmpleados);
    fetchData(TIPO_CONTRATO_API_URL, setTipoContratos);
  }, []);

  const fetchData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({ ...empleado, [name]: value });
  };

 /* const validarFormulario = () => {
    const nuevosErrores = {};
    if (!empleado.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!empleado.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.';
    if (!empleado.cuil.trim()) nuevosErrores.cuil = 'El CUIL es obligatorio.';
    if (!empleado.email.trim()) nuevosErrores.email = 'El email es obligatorio.';
    if (!empleado.idDepartamento) nuevosErrores.idDepartamento = 'El departamento es obligatorio.';
    if (!empleado.idConvenio) nuevosErrores.idConvenio = 'El convenio es obligatorio.';
    if (!empleado.idCategoria) nuevosErrores.idCategoria = 'La categoría es obligatoria.';
    if (!empleado.idProvincia) nuevosErrores.idProvincia = 'La provincia es obligatoria.';
    if (!empleado.idPuesto) nuevosErrores.idPuesto = 'El puesto es obligatorio.';
    if (!empleado.idBanco) nuevosErrores.idBanco = 'El banco es obligatorio.';
    if (!empleado.idObraSocial) nuevosErrores.idObraSocial = 'La obra social es obligatoria.';
    if (!empleado.idEstadoCivil) nuevosErrores.idEstadoCivil = 'El estado Civil es obligatorio.';
    if (!empleado.idGenero) nuevosErrores.idGenero = 'El genero es obligatorio.';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (!validarFormulario()) return;

      
    console.log(empleado); // Ver los datos del empleado antes de enviarlos

    try {
      await axios.post(EMPLEADO_BASE_REST_API_URL, empleado);
      setMensaje('Empleado creado exitosamente.');
      setEmpleado({
        nombre: '',
          apellido: '',
          dni: '',
          cuil: '',
          email: '',
          telefono: '',
          direccion: '',
          ciudad: '',
          idProvincia: '',
          idDepartamento: '',
          idConvenio: '',
          idCategoria: '',
          idPuesto: '',
          idBanco: '',
          idObraSocial: '',
          estadoEmpleado: '',
          estadoCivil: '',
          genero: '',
          tipoContrato: '',
          tipoCuentaBancaria: '',
          fechaNacimiento: '',
          fechaInicio: '',
          fechaFin: '',
          diasVacacionesPactadas: 0,
          cbu: '',
          nacionalidad: '',
      });
    } catch (error) {
      console.error('Error al crear empleado:', error.response ? error.response.data : error.message);  
      setError('No se pudo crear el empleado.');
    }
  };

  return (
    <div className="container">
      <h2>Crear Empleado</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Campos Básicos */}
        <div className="row mt-3">
          <div className="col-md-2">
            <input
              type="text"
              className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
              name="apellido"
              placeholder="Apellido"
              value={empleado.apellido}
              onChange={handleChange}
            />
            {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              name="nombre"
              placeholder="Nombre"
              value={empleado.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.fechaNacimiento ? 'is-invalid' : ''}`}
              name="fechaNacimiento"
              placeholder="Fecha de Nac"
              value={empleado.fechaNacimiento}
              onChange={handleChange}
              onFocus={(e) => (e.target.type = 'date')} // Cambia a selector de fecha al enfocar
              onBlur={(e) => (e.target.type = 'text')} // Vuelve a texto al desenfocar
            />
            {errores.fechaNacimiento && (
              <div className="invalid-feedback">{errores.fechaNacimiento}</div>
            )}
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className={`form-control ${errores.dni ? 'is-invalid' : ''}`}
              name="dni"
              placeholder="DNI"
              value={empleado.dni}
              onChange={handleChange}
            />
            {errores.dni && <div className="invalid-feedback">{errores.dni}</div>}
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className={`form-control ${errores.cuil ? 'is-invalid' : ''}`}
              name="cuil"
              placeholder="CUIL"
              value={empleado.cuil}
              onChange={handleChange}
            />
            {errores.cuil && <div className="invalid-feedback">{errores.cuil}</div>}
          </div>

        </div>

        <div className="row mt-3">
          <div className="col-md-3">
             <input
              type="email"
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              name="email"
              placeholder="email"
              value={empleado.email}
              onChange={handleChange}
            />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
              name="direccion"
              placeholder="Direccion"
              value={empleado.direccion}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.ciudad ? 'is-invalid' : ''}`}
              name="ciudad"
              placeholder="Ciudad"
              value={empleado.ciudad}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
              name="telefono"
              placeholder="Telefono"
              value={empleado.telefono}
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Datos de ubicación */}
        <div className="row mt-3">
          <div className="col-md-3">
            <select
              className={`form-control ${errores.idProvincia ? 'is-invalid' : ''}`}
              name="idProvincia"
              value={empleado.idProvincia}
              onChange={handleChange}
            >
              <option value="">Provincia </option>
              {provincias.map((provincia) => (
                <option key={provincia.idProvincia} value={provincia.idProvincia}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
            {errores.idProvincia && <div className="invalid-feedback">{errores.idProvincia}</div>}
          </div>

          <div className="col-md-2">
            <select
              className={`form-control ${errores.estadoCivil ? 'is-invalid' : ''}`}
              name="estadoCivil"
              value={empleado.estadoCivil}
              onChange={handleChange}
            >
              <option value="">Estado Civil</option>
              {estadosCivil.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <select
              className={`form-control ${errores.genero ? 'is-invalid' : ''}`}
              name="genero"
              value={empleado.genero}
              onChange={handleChange}
            >
              <option value="">Genero</option>
              {generos.map((gene) => (
                <option key={gene} value={gene}>
                  {gene}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="text"
              className={`form-control ${errores.nacionalidad ? 'is-invalid' : ''}`}
              name="nacionalidad"
              placeholder="Nacionalidad"
              value={empleado.nacionalidad}
              onChange={handleChange}
            />
          </div>

          
          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.fechaInicio ? 'is-invalid' : ''}`}
              name="fechaInicio"
              placeholder="Fecha Ingreso"
              value={empleado.fechaIngreso}
              onChange={handleChange}
              onFocus={(e) => (e.target.type = 'date')} // Cambia a selector de fecha al enfocar
              onBlur={(e) => (e.target.type = 'text')} // Vuelve a texto al desenfocar
            />
            {errores.fechaIngreso && (
              <div className="invalid-feedback">{errores.fechaIngreso}</div>
            )}
          </div>
        </div>


        <div className="row mt-3">
          <div className="col-md-3">
            <select
              className={`form-control ${errores.idDepartamento ? 'is-invalid' : ''}`}
              name="idDepartamento"
              value={empleado.idDepartamento}
              onChange={handleChange}
            >
              <option value="">Departamento</option>
              {departamentos.map((dept) => (
                <option key={dept.idDepartamento} value={dept.idDepartamento}>
                  {dept.nombre}
                </option>
              ))}
            </select>
            {errores.idDepartamento && <div className="invalid-feedback">{errores.idDepartamento}</div>}
          </div>

          <div className="col-md-3">
            <select
              className={`form-control ${errores.idCategoria ? 'is-invalid' : ''}`}
              name="idCategoria"
              value={empleado.idCategoria}
              onChange={handleChange}
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            {errores.idCategoria && <div className="invalid-feedback">{errores.idCategoria}</div>}
          </div>

          <div className="col-md-3">
            <select
              className={`form-control ${errores.idConvenio ? 'is-invalid' : ''}`}
              name="idConvenio"
              value={empleado.idConvenio}
              onChange={handleChange}
            >
              <option value="">Convenio</option>
              {convenios.map((conv) => (
                <option key={conv.idConvenio} value={conv.idConvenio}>
                  {conv.nombre}
                </option>
              ))}
            </select>
            {errores.idConvenio && <div className="invalid-feedback">{errores.idConvenio}</div>}
          </div>

          <div className="col-md-3">
            <select
              className={`form-control ${errores.idObraSocial ? 'is-invalid' : ''}`}
              name="idObraSocial"
              value={empleado.idObraSocial}
              onChange={handleChange}
            >
              <option value="">Obra Social</option>
              {obrasSociales.map((obra) => (
                <option key={obra.idObraSocial} value={obra.idObraSocial}>
                  {obra.nombre}
                </option>
              ))}
            </select>
            {errores.idObraSocial && <div className="invalid-feedback">{errores.idObraSocial}</div>}
          </div>
        </div>

        {/* Más campos... */}
        <div className="row mt-3">
          <div className="col-md-3  ">
            <select
              className={`form-control ${errores.idPuesto ? 'is-invalid' : ''}`}
              name="idPuesto"
              value={empleado.idPuesto}
              onChange={handleChange}
            >
              <option value="">Puesto</option>
              {puestos.map((pues) => (
                <option key={pues.idPuesto} value={pues.idPuesto}>
                  {pues.nombre}
                </option>
              ))}
            </select>
            {errores.idPuesto && <div className="invalid-feedback">{errores.idPuesto}</div>}
          </div>

          <div className="col-md-3  ">
            <select
              className={`form-control ${errores.idBanco ? 'is-invalid' : ''}`}
              name="idBanco"
              value={empleado.idBanco}
              onChange={handleChange}
            >
              <option value="">Banco</option>
              {bancos.map((ban) => (
                <option key={ban.idBnco} value={ban.idBanco}>
                  {ban.nombre}
                </option>
              ))}
            </select>
            {errores.idBanco && <div className="invalid-feedback">{errores.idBanco}</div>}
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.cbu ? 'is-invalid' : ''}`}
              name="cbu"
              placeholder="CBU"
              value={empleado.cbu}
              onChange={handleChange}
            />
            {errores.cbu && <div className="invalid-feedback">{errores.cbu}</div>}
          </div>

          <div className="col-md-3">
            <select
              className={`form-control ${errores.tiposCuentaBancaria ? 'is-invalid' : ''}`}
              name="tipoCuentaBancaria"
              value={empleado.tipoCuentaBancaria}
              onChange={handleChange}
            >
              <option value="">Cuenta Bancaria</option>
              {tiposCuentasBancarias.map((cta) => (
                <option key={cta} value={cta}>
                  {cta}
                </option>
              ))}
            </select>
          </div>

          {/* Continúa agregando los demás campos aquí (Convenio, Categoría, Puesto, Banco, Obra Social, Estado Civil, etc.) */}
        </div>

        <div className="row mt-4">
            <div className="col-md-3">
              <select
                className={`form-control ${errores.tipoContrato ? 'is-invalid' : ''}`}
                name="tipoContrato"
                value={empleado.tipoContrato}
                onChange={handleChange}
              >
                <option value="">Tipo Contrato </option>
                {tipoContratos.map((contra) => (
                  <option key={contra} value={contra}>
                    {contra}
                  </option>
                ))}
              </select>
            </div>


          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.estadoEmpleado ? 'is-invalid' : ''}`}
              name="estadoEmpleado"
              placeholder="Estado Emp"
              value={empleado.estadoEmpleado}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className={`form-control ${errores.diasVacacionesPactadas ? 'is-invalid' : ''}`}
              name="diasVacacionesPactadas"
              placeholder="Vacaciones"
              value={empleado.diasVacacionesPactadas || ''} 
              onChange={handleChange}
              onFocus={(e) => (e.target.type = 'number')} // Cambia a selector de fecha al enfocar
              onBlur={(e) => (e.target.type = 'text')} // Vuelve a texto al desenfocar
            />
            {errores.diasVacacionesPactadas && <div className="invalid-feedback">{errores.diasVacacionesPactadas}</div>}
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className={`form-control ${errores.fechaFin ? 'is-invalid' : ''}`}
              name="fechaFin"
              placeholder="Fecha Fin"
              value={empleado.fechaFin}
              onChange={handleChange}
              disabled
              onFocus={(e) => (e.target.type = 'date')} // Cambia a selector de fecha al enfocar
              onBlur={(e) => (e.target.type = 'text')} // Vuelve a texto al desenfocar
            />
            {errores.fechaFin && (
              <div className="invalid-feedback">{errores.fechaFin}</div>
            )}
          </div>


          {/* Continúa agregando los demás campos aquí (Convenio, Categoría, Puesto, Banco, Obra Social, Estado Civil, etc.) */}
        </div>

        {/* Botón de envío */}
        <div className="row mt-3">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary">
              Crear Empleado
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}