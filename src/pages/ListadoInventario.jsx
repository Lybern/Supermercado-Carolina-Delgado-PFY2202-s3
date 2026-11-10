import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import KpiCard from "../components/KpiCard";
import FiltrosInventario from "../components/FiltrosInventario";
import TablaInventario from "../components/TablaInventario";
import { CATEGORIAS_INVENTARIO } from "../data/inventarioData";
import {
  formatearMoneda,
  filtrarProductos,
  calcularMetricasInventario,
} from "../utils/inventarioUtils";

/**
 * Vista dedicada: Listado en Tabla del Inventario.
 * Permite buscar, filtrar y gestionar existencias de los artículos.
 */
function ListadoInventario() {
  const { productos, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);

  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  // Filtrado reactivo puro mediante utilidad centralizada
  const productosFiltrados = filtrarProductos(productos, {
    busqueda,
    categoria: categoriaSeleccionada,
    soloCriticos,
  });

  // Métricas ejecutivas derivadas de la fuente de verdad centralizada
  const {
    totalProductos,
    totalUnidades,
    stockCriticoCount,
    valorTotalInventario,
  } = calcularMetricasInventario(productos);

  return (
    <div className="container py-4">
      {/* Encabezado y Navegación contextual */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-success">
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Listado de Inventario
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h2 fw-bold text-success mb-1 d-flex align-items-center gap-2">
            <span>📋</span> Listado en Tabla de Artículos
          </h1>
          <p className="text-muted mb-0">
            Vista tabular completa del inventario sincronizada en tiempo real con existencias actualizadas.
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <Link to="/nuevo-producto" className="btn btn-success fw-semibold shadow-sm">
            ➕ Ingresar Artículo
          </Link>
        </div>
      </div>

      {/* Tarjetas KPI de Resumen */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard titulo="Total Artículos" valor={totalProductos} icono="📦" color="primary" descripcion="Artículos únicos en catálogo" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard titulo="Unidades Físicas" valor={totalUnidades.toLocaleString("es-CL")} icono="🔢" color="info" descripcion="Total unidades en almacén" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard titulo="Stock Crítico" valor={stockCriticoCount} icono="⚠️" color="danger" descripcion="Productos bajo el mínimo" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard titulo="Valor Estimado" valor={formatearMoneda(valorTotalInventario)} icono="💰" color="success" descripcion="Capital total inmovilizado" />
        </div>
      </div>

      {/* Barra Modular de Filtros y Búsqueda */}
      <FiltrosInventario
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onCategoriaChange={setCategoriaSeleccionada}
        categorias={categorias}
        soloCriticos={soloCriticos}
        onSoloCriticosChange={setSoloCriticos}
        stockCriticoCount={stockCriticoCount}
      />

      {/* Tabla Modular de Inventario */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h2 className="h6 mb-0 fw-bold text-dark">
            Mostrando {productosFiltrados.length} de {totalProductos} artículos
          </h2>
          {soloCriticos && (
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
              Filtro Activo: Stock Crítico
            </span>
          )}
        </div>
        <div className="card-body p-0">
          <TablaInventario
            productos={productosFiltrados}
            onModificarStock={modificarStock}
            mostrarLinkDetalle={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ListadoInventario;
