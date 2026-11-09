import { useState } from "react";
import useInventario from "../hooks/useInventario";
import { CATEGORIAS_INVENTARIO } from "../data/inventarioData";
import HeroBanner from "../components/HeroBanner";
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
 * Ofrece una experiencia interactiva tipo catálogo online con opción de alternar a tabla.
 */
function HomeInventario() {
  const { productos, carrito, agregarAlCarrito, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);
  const [modoVista, setModoVista] = useState("tarjetas");

  const totalUnidadesCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  const productosFiltrados = filtrarProductos(productos, {
    busqueda,
    categoria: categoriaSeleccionada,
    soloCriticos,
  });

  const metricas = calcularMetricasInventario(productos);

  return (
    <div className="container py-4">
      <HeroBanner totalUnidadesCarrito={totalUnidadesCarrito} />

      <KpiResumen metricas={metricas} totalCategorias={CATEGORIAS_INVENTARIO.length} />

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
