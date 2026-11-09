import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import { CATEGORIAS_INVENTARIO } from "../data/inventarioData";
import KpiResumen from "../components/KpiResumen";
import FiltrosInventario from "../components/FiltrosInventario";
import TablaInventario from "../components/TablaInventario";
import {
  filtrarProductos,
  calcularMetricasInventario,
} from "../utils/inventarioUtils";

/**
 * Panel Principal de Control de Inventario.
 * Gestiona métricas ejecutivas, filtros y vista rápida del catálogo.
 */
function HomeInventario() {
  const { productos, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);

  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  // Filtrado reactivo puro y métricas consolidadas
  const productosFiltrados = filtrarProductos(productos, {
    busqueda,
    categoria: categoriaSeleccionada,
    soloCriticos,
  });

  const metricas = calcularMetricasInventario(productos);

  return (
    <div className="container py-4">
      {/* Encabezado y Accesos Directos */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">
            📦 Panel de Control de Inventario
          </h1>
          <p className="text-secondary mb-0">
            Administración centralizada de existencias y reposición para Supermercado Don Ahorro Eri Market.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/nuevo-producto" className="btn btn-success fw-semibold shadow-sm">
            ➕ Ingresar Artículo
          </Link>
          <Link to="/inventario" className="btn btn-outline-success fw-semibold">
            📋 Ver Listado en Tabla
          </Link>
        </div>
      </div>

      {/* Componente Modular de KPIs */}
      <KpiResumen metricas={metricas} totalCategorias={CATEGORIAS_INVENTARIO.length} />

      {/* Componente Modular de Filtros y Búsqueda */}
      <FiltrosInventario
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onCategoriaChange={setCategoriaSeleccionada}
        categorias={categorias}
        soloCriticos={soloCriticos}
        onSoloCriticosChange={setSoloCriticos}
        stockCriticoCount={metricas.stockCriticoCount}
      />

      {/* Tabla Modular de Productos */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h2 className="h6 mb-0 fw-bold text-dark">
            Catálogo en Tiempo Real ({productosFiltrados.length} artículos visibles)
          </h2>
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

export default HomeInventario;
