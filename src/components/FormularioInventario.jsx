import {
  UNIDADES_MEDIDA,
  UBICACIONES_SUPERMERCADO,
} from "../data/inventarioData";

/**
 * Componente modular para los datos de existencias y logística de un producto:
 * Stock Inicial, Stock Mínimo, Unidad de Medida y Ubicación en Supermercado.
 */
function FormularioInventario({ formData, onChange }) {
  return (
    <>
      <div className="col-12 col-md-4">
        <label htmlFor="stock" className="form-label fw-semibold">
          Stock Inicial <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          min="0"
          step="1"
          className="form-control"
          placeholder="Ej: 25"
          value={formData.stock}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-12 col-md-4">
        <label htmlFor="stockMinimo" className="form-label fw-semibold">
          Stock Mínimo (Alerta)
        </label>
        <input
          type="number"
          id="stockMinimo"
          name="stockMinimo"
          min="0"
          step="1"
          className="form-control"
          placeholder="Ej: 10"
          value={formData.stockMinimo}
          onChange={onChange}
        />
        <div className="form-text">Umbral para alertas de reabastecimiento.</div>
      </div>

      <div className="col-12 col-md-6">
        <label htmlFor="unidad" className="form-label fw-semibold">
          Unidad de Medida
        </label>
        <select
          id="unidad"
          name="unidad"
          className="form-select"
          value={formData.unidad}
          onChange={onChange}
        >
          {UNIDADES_MEDIDA.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-6">
        <label htmlFor="ubicacion" className="form-label fw-semibold">
          Ubicación en Supermercado
        </label>
        <select
          id="ubicacion"
          name="ubicacion"
          className="form-select"
          value={formData.ubicacion}
          onChange={onChange}
        >
          {UBICACIONES_SUPERMERCADO.map((ub) => (
            <option key={ub} value={ub}>
              {ub}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default FormularioInventario;
