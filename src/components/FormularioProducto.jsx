import FormularioDatosBasicos from "./FormularioDatosBasicos";
import FormularioInventario from "./FormularioInventario";

/**
 * Componente integrador modular para el formulario completo de producto.
 */
function FormularioProducto({ formData, onChange, onLimpiar, enviando }) {
  return (
    <div className="row g-3">
      <FormularioDatosBasicos formData={formData} onChange={onChange} />
      <FormularioInventario formData={formData} onChange={onChange} />

      <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-4 pt-3 border-top">
        <button
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={onLimpiar}
          disabled={enviando}
        >
          Limpiar Campos
        </button>
        <button
          type="submit"
          className="btn btn-success px-4 fw-semibold"
          disabled={enviando}
        >
          {enviando ? "Guardando..." : "✓ Guardar en Inventario Global"}
        </button>
      </div>
    </div>
  );
}

export default FormularioProducto;
