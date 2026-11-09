const ICONOS_CATEGORIA = {
  Todas: "🛒",
  Abarrotes: "🍚",
  Lácteos: "🥛",
  "Frutas y Verduras": "🍎",
  Carnicería: "🥩",
  Limpieza: "🧼",
  Panadería: "🥖",
  Bebidas: "🧃",
};

/**
 * Barra de Búsqueda y Filtros Interactivos.
 * Incluye chips de categoría seleccionables con efectos al pasar el mouse.
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
    <div className="card shadow-sm border-0 mb-4 filters-panel p-3">
      {/* Barra de Búsqueda Principal y Switch de Stock */}
      <div className="row g-3 align-items-center mb-3">
        <div className="col-12 col-md-7">
          <div className="input-group search-input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0 text-success fs-5">🔍</span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Buscar productos por nombre, marca o SKU..."
              value={busqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
            />
            {busqueda && (
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={() => onBusquedaChange("")}
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="col-12 col-md-5 d-flex justify-content-md-end align-items-center">
          <div className="form-check form-switch custom-switch p-2 px-3 bg-white rounded-pill shadow-sm border">
            <input
              className="form-check-input ms-0 me-2"
              type="checkbox"
              id="switchFiltroCritico"
              checked={soloCriticos}
              onChange={(e) => onSoloCriticosChange(e.target.checked)}
            />
            <label className="form-check-label fw-bold text-dark small" htmlFor="switchFiltroCritico">
              ⚠️ Solo Stock Crítico {stockCriticoCount !== undefined ? `(${stockCriticoCount})` : ""}
            </label>
          </div>
        </div>
      </div>

      {/* Chips de Categorías Interactivos con Efecto Hover */}
      <div className="category-chips-container d-flex flex-wrap gap-2 pt-2 border-top">
        {categorias.map((cat) => {
          const estaActiva = categoriaSeleccionada === cat;
          const icono = ICONOS_CATEGORIA[cat] || "🏷️";

          return (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm category-chip d-flex align-items-center gap-1 ${
                estaActiva
                  ? "btn-success shadow-sm fw-bold active-chip"
                  : "btn-outline-secondary border-0 bg-light text-dark"
              }`}
              onClick={() => onCategoriaChange(cat)}
            >
              <span>{icono}</span>
              <span>{cat === "Todas" ? "Todas las Categorías" : cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FiltrosInventario;
