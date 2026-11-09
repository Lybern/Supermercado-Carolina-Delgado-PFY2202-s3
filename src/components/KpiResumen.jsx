import KpiCard from "./KpiCard";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Grilla de Tarjetas de Indicadores Clave (KPIs).
 * Visualiza métricas generales del catálogo con distribución uniforme responsive.
 */
function KpiResumen({ metricas, totalCategorias }) {
  const { totalProductos, stockCriticoCount, valorTotalInventario } = metricas;

  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-sm-6 col-lg-3">
        <KpiCard
          titulo="Total Productos"
          valor={totalProductos}
          color="primary"
          descripcion="En catálogo activo"
          icono="📦"
        />
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
        <KpiCard
          titulo="Stock Crítico"
          valor={stockCriticoCount}
          color="danger"
          descripcion="Requieren reposición"
          icono="⚠️"
        />
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
        <KpiCard
          titulo="Valor Estimado"
          valor={formatearMoneda(valorTotalInventario)}
          color="success"
          descripcion="Capital valorizado"
          icono="💰"
        />
      </div>
      <div className="col-12 col-sm-6 col-lg-3">
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
