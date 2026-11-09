import KpiCard from "./KpiCard";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Grilla de Tarjetas de Indicadores Clave (KPIs).
 * Visualiza métricas generales del catálogo y capital inmovilizado.
 */
function KpiResumen({ metricas, totalCategorias }) {
  const { totalProductos, stockCriticoCount, valorTotalInventario } = metricas;

  return (
    <div className="row g-3 mb-4">
      <KpiCard
        titulo="Total Productos"
        valor={totalProductos}
        color="primary"
        descripcion="En catálogo activo"
        icono="📦"
      />
      <KpiCard
        titulo="Stock Bajo / Crítico"
        valor={stockCriticoCount}
        color="danger"
        descripcion="Requieren reposición"
        icono="⚠️"
      />
      <KpiCard
        titulo="Valor del Inventario"
        valor={formatearMoneda(valorTotalInventario)}
        color="success"
        descripcion="Capital valorizado"
        icono="💰"
      />
      <KpiCard
        titulo="Categorías"
        valor={totalCategorias}
        color="info"
        descripcion="Secciones habilitadas"
        icono="🏷️"
      />
    </div>
  );
}

export default KpiResumen;
