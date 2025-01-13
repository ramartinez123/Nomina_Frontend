import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from '../layouts/Layout';
import Empleado from '../components/Empleado';
import Banco from '../components/Banco';
import Categoria from '../components/Categoria';
import EmpleadoLista from '../components/EmpleadoLista';
import LiquidacionResultado from '../components/LiquidacionResultado';
import Neto from '../components/Neto';
import EmpleadoAgrupadoList from '../components/EmpleadoAgrupadoList';
import AsientoContable from '../components/AsientoContable';
import Convenio from '../components/Convenio';
import Departamento from '../components/Departamento';
import ObraSocial from '../components/ObraSocial';
import Puesto from '../components/Puesto';
import LiquidacionHaberes from '../components/LiquidacionHaberes';
import LiquidacionRetenciones from '../components/LiquidacionRetenciones';
import CargasSociales from '../components/CargasSociales';
import ValoresCategoria from '../components/ValoresCategoria';
import NovedadLiquidacion from '../components/NovedadLiquidacion';
import ConceptosSalariales from '../components/ConceptosSalariales';
import SalarioExcedente from '../components/SalarioExcedente';
import Familiares from '../components/Familiares';

export const routes = [
    { path: '/', element: <h1>Contacto</h1> },
    { path: '/empleadoAlta', element: <Empleado /> },
    { path: '/empleadoLista', element: <EmpleadoLista /> },
    { path: '/liquidacionResultado', element: <LiquidacionResultado /> },
    { path: '/banco', element: <Banco /> },
    { path: '/neto', element: <Neto /> },
    { path: '/categoria', element: <Categoria /> },
    { path: '/empleadoAgrupadoList', element: <EmpleadoAgrupadoList /> },
    { path: '/asientoContable', element: <AsientoContable /> },
    { path: '/convenio', element: <Convenio /> },
    { path: '/departamento', element: <Departamento /> },
    { path: '/obraSocial', element: <ObraSocial /> },
    { path: '/puesto', element: <Puesto /> },
    { path: '/haberes', element: <LiquidacionHaberes /> },
    { path: '/retenciones', element: <LiquidacionRetenciones /> },
    { path: '/cargasSociales', element: <CargasSociales /> },
    { path: '/valoresCategoria', element: <ValoresCategoria /> },
    { path: '/novedadLiquidacion', element: <NovedadLiquidacion /> },
    { path: '/conceptosSalariales', element: <ConceptosSalariales /> },
    { path: '/salarioExcedente', element: <SalarioExcedente /> },
    { path: '/familiares', element: <Familiares /> }
  ];