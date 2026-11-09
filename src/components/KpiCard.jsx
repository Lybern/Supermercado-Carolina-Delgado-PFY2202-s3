/**
 * Tarjeta individual para métricas e indicadores de inventario (KPI).
 */
function KpiCard({ titulo, valor, color = "primary", descripcion, icono }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className={`card shadow-sm border-0 border-start border-4 border-${color} h-100 bg-white`}>
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-secondary small fw-bold text-uppercase" style={{ letterSpacing: "0.5px" }}>
              {titulo}
            </span>
            {icono && <span className="fs-4">{icono}</span>}
          </div>
          <div className={`fs-3 fw-bold text-${color} my-1`}>{valor}</div>
          {descripcion && <div className="text-muted small">{descripcion}</div>}
        </div>
      </div>
    </div>
  );
}

export default KpiCard;
