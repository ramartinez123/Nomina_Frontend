import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-nav">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">MiApp</Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto"> {/* ms-auto para alinear al extremo derecho */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>

            {/* Dropdown Empleado */}

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown"> Empleados</Link>
              <ul className="dropdown-menu">
                <Link className="dropdown-item" to="/empleadoAlta">Alta Empleado</Link>
                <Link className="dropdown-item" to="/empleadoLista">Lista Empleados</Link>
                <Link className="dropdown-item" to="/salarioExcedente">Salario Excedente</Link>
                <Link className="dropdown-item" to="/familiares">Familiares</Link>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbardrop" data-toggle="dropdown"> Liquidacion</Link>
              <ul className="dropdown-menu">
                <Link className="dropdown-item" to="/novedadLiquidacion">Novedad Liquidacion</Link>
                <Link className="dropdown-item" to="/haberes">Haberes</Link>
                <Link className="dropdown-item" to="/retenciones">Retenciones</Link>
                  <Link className="dropdown-item" to="/cargasSociales"> Cargas Sociales</Link>
                <Link className="dropdown-item" to="/asientoContable"> Asiento Contable</Link>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown"> Listados</Link>
              <ul className="dropdown-menu">
                <Link className="dropdown-item" to="/liquidacionResultado">Resultado</Link>
                <Link className="dropdown-item" to="/neto">Neto</Link>
                <Link className="dropdown-item" to="/empleadoAgrupadoList"> Neto Banco</Link>
                <Link className="dropdown-item" to="/liquidacionResultado">Resultado</Link>
              </ul>
            </li>

            <li className="dropdown">
              <Link className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown"> Configuracion</Link>
              <ul className="dropdown-menu">
                <Link className="dropdown-item" to="/banco">Bancos</Link>
                <Link className="dropdown-item" to="/categoria">Categoria</Link>
                <Link className="dropdown-item" to="/convenio">Convenio</Link>
                <Link className="dropdown-item" to="/departamento">Departamento</Link>
                <Link className="dropdown-item" to="/obraSocial">Obra Social</Link>
                <Link className="dropdown-item" to="/puesto">Puesto</Link>
                <Link className="dropdown-item" to="/valoresCategoria">Valores Categoria</Link>
                <Link className="dropdown-item" to="/conceptosSalariales">Conceptos Salariales</Link>
              </ul>
            </li>
          </ul>
          {/* Buscador con lupa */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i> {/* Ícono de lupa */}
            </button>
          </form>
        </div>
      </div>
    </nav>   
  );
}