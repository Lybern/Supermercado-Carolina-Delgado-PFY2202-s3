import { CATEGORIAS_INVENTARIO } from "../data/inventarioData";

/**
 * Componente modular para los datos comerciales básicos de un producto:
 * SKU, Nombre, Marca, Categoría y Precio.
 */
function FormularioDatosBasicos({ formData, onChange }) {
  return (
    <>
      <div className="col-12 col-md-4">
        <label htmlFor="sku" className="form-label fw-semibold">
          Código SKU <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="sku"
          name="sku"
          className="form-control"
          placeholder="Ej: BEB-305"
          value={formData.sku}
          onChange={onChange}
          required
        />
        <div className="form-text">Identificador alfanumérico único.</div>
      </div>

      <div className="col-12 col-md-8">
        <label htmlFor="nombre" className="form-label fw-semibold">
          Nombre del Producto <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="form-control"
          placeholder="Ej: Jugo Natural Naranja 1.5L"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-12 col-md-6">
        <label htmlFor="marca" className="form-label fw-semibold">
          Marca del Producto <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="marca"
          name="marca"
          className="form-control"
          placeholder="Ej: Andina, Colun, Tucapel, Ideal..."
          value={formData.marca}
          onChange={onChange}
          required
        />
        <div className="form-text">Marca comercial fabricante del producto.</div>
      </div>

      <div className="col-12 col-md-6">
        <label htmlFor="categoria" className="form-label fw-semibold">
          Tipo de Producto (Categoría) <span className="text-danger">*</span>
        </label>
        <select
          id="categoria"
          name="categoria"
          className="form-select"
          value={formData.categoria}
          onChange={onChange}
          required
        >
          {CATEGORIAS_INVENTARIO.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label htmlFor="precio" className="form-label fw-semibold">
          Precio Unitario ($ CLP) <span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            id="precio"
            name="precio"
            min="0"
            step="1"
            className="form-control"
            placeholder="Ej: 1990"
            value={formData.precio}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </>
  );
}

export default FormularioDatosBasicos;
