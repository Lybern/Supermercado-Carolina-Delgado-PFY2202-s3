/**
 * Tarjeta individual para métricas e indicadores de inventario (KPI).
 * Diseñada con efectos interactivos al pasar el mouse.
 */
function KpiCard({ titulo, valor, color = "primary", descripcion, icono }) {
  return (
    <div className={`card h-100 border-0 shadow-sm kpi-card kpi-card-${color} p-3`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span
          className="text-secondary small fw-bold text-uppercase text-truncate"
          style={{ letterSpacing: "0.5px" }}
          title={titulo}
        >
          {titulo}
        </span>
        <span className="kpi-icon fs-3">{icono}</span>
      </div>
      <div className="my-1">
        <span className="kpi-valor fw-black fs-2 text-dark">{valor}</span>
      </div>
      {descripcion && (
        <span className="text-muted small mt-auto text-truncate" title={descripcion}>
          {descripcion}
        </span>
      )}
    </div>
  );
}

export default KpiCard;
