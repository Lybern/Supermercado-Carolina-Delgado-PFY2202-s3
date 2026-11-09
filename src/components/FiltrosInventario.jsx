/**
 * Barra de Búsqueda y Filtros de Inventario.
 * Filtra de manera reactiva por texto, categoría y nivel de stock.
 */
function FiltrosInventario({
  busqueda,
  onBusquedaChange,
  categoriaSeleccionada,
  onCategoriaChange,
  categorias,
  soloCriticos,
  onSoloCriticosChange,
  stockCriticoCount,
}) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-3">
        <div className="row g-3 align-items-center">
          {/* Búsqueda por texto (SKU, nombre, marca) */}
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white">🔍</span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre, marca o SKU..."
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
              />
              {busqueda && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => onBusquedaChange("")}
                  title="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Selector de categoría */}
          <div className="col-12 col-sm-6 col-md-4">
            <select
              className="form-select"
              value={categoriaSeleccionada}
              onChange={(e) => onCategoriaChange(e.target.value)}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "Todas" ? "Todas las Categorías" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Switch de filtro para stock crítico */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="switchFiltroCritico"
                checked={soloCriticos}
                onChange={(e) => onSoloCriticosChange(e.target.checked)}
              />
              <label className="form-check-label fw-semibold" htmlFor="switchFiltroCritico">
                Solo Stock Crítico {stockCriticoCount !== undefined ? `(${stockCriticoCount})` : ""}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltrosInventario;
