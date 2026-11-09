import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import { CATEGORIAS_INVENTARIO } from "../data/inventarioData";
import KpiResumen from "../components/KpiResumen";
import FiltrosInventario from "../components/FiltrosInventario";
import TarjetaProducto from "../components/TarjetaProducto";
import TablaInventario from "../components/TablaInventario";
import {
  filtrarProductos,
  calcularMetricasInventario,
} from "../utils/inventarioUtils";

/**
 * Vista Principal del Supermercado.
 * Ofrece una experiencia amigable tipo catálogo online con opción de alternar a tabla.
 */
function HomeInventario() {
  const { productos, agregarAlCarrito, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);
  const [modoVista, setModoVista] = useState("tarjetas"); // 'tarjetas' o 'tabla'

  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  // Filtrado reactivo puro y métricas centralizadas
  const productosFiltrados = filtrarProductos(productos, {
    busqueda,
    categoria: categoriaSeleccionada,
    soloCriticos,
  });

  const metricas = calcularMetricasInventario(productos);

  return (
    <div className="container py-4">
      {/* Banner de Bienvenida Cálido y Amigable */}
      <div className="hero-banner p-4 p-md-5 mb-4 rounded-4 shadow-sm text-white">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <span className="badge bg-warning text-dark fw-bold px-3 py-1 mb-2">
              🐾 Eri Market
            </span>
            <h1 className="display-6 fw-bold mb-2">Supermercado Don Ahorro</h1>
            <p className="lead mb-3 text-white-50">
              Tu tienda de confianza con productos de calidad, precios convenientes y stock en tiempo real.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/carrito" className="btn btn-warning text-dark fw-bold px-3 shadow-sm">
                🛒 Ver Mi Carrito
              </Link>
              <Link to="/nuevo-producto" className="btn btn-outline-light fw-semibold px-3">
                ➕ Ingresar Artículo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Generales del Negocio */}
      <KpiResumen metricas={metricas} totalCategorias={CATEGORIAS_INVENTARIO.length} />

      {/* Barra de Filtros y Búsqueda */}
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

      {/* Barra de Control de Vista (Tarjetas vs Tabla) */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="h5 fw-bold text-dark mb-0">
          Catálogo de Productos ({productosFiltrados.length} artículos)
        </h2>
        <div className="btn-group btn-group-sm shadow-sm" role="group">
          <button
            type="button"
            className={`btn ${modoVista === "tarjetas" ? "btn-success fw-bold" : "btn-outline-secondary"}`}
            onClick={() => setModoVista("tarjetas")}
          >
            🛍️ Vista Tarjetas
          </button>
          <button
            type="button"
            className={`btn ${modoVista === "tabla" ? "btn-success fw-bold" : "btn-outline-secondary"}`}
            onClick={() => setModoVista("tabla")}
          >
            📋 Vista Tabla
          </button>
        </div>
      </div>

      {/* Renderizado dinámico según la vista elegida */}
      {productosFiltrados.length === 0 ? (
        <div className="card shadow-sm border-0 text-center py-5">
          <span className="fs-1 d-block mb-2">🔍</span>
          <p className="text-muted fw-semibold mb-0">
            No se encontraron productos coincidentes con los filtros seleccionados.
          </p>
        </div>
      ) : modoVista === "tarjetas" ? (
        <div className="row g-3">
          {productosFiltrados.map((item) => (
            <TarjetaProducto
              key={item.id}
              producto={item}
              onAgregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <TablaInventario
              productos={productosFiltrados}
              onModificarStock={modificarStock}
              mostrarLinkDetalle={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeInventario;
