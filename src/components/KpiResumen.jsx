import KpiCard from "./KpiCard";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Componente modular: Grilla de Tarjetas KPI.
 * Resuelve la oportunidad de mejora 5 dividiendo la vista en piezas pequeñas y reutilizables (<150 líneas).
 * @param {{ metricas: { totalProductos: number, stockCriticoCount: number, valorTotalInventario: number }, totalCategorias: number }} props
 */
function KpiResumen({ metricas, totalCategorias }) {
  const { totalProductos, stockCriticoCount, valorTotalInventario } = metricas;

  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-sm-6 col-xl-3">
        <KpiCard
          titulo="Total Productos"
          valor={totalProductos}
          color="primary"
          descripcion="En catálogo activo"
          icono="📦"
        />
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <KpiCard
          titulo="Stock Bajo / Crítico"
          valor={stockCriticoCount}
          color="danger"
          descripcion="Requieren reposición"
          icono="⚠️"
        />
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <KpiCard
          titulo="Valor del Inventario"
          valor={formatearMoneda(valorTotalInventario)}
          color="success"
          descripcion="Valorización estimada"
          icono="💰"
        />
      </div>
      <div className="col-12 col-sm-6 col-xl-3">
        <KpiCard
          titulo="Categorías"
          valor={totalCategorias}
          color="info"
          descripcion="Secciones habilitadas"
          icono="🏷️"
        />
      </div>
    </div>
  );
}

export default KpiResumen;
