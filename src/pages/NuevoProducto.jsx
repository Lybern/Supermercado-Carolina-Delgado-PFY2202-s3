import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useInventario from "../hooks/useInventario";
import { ESTADO_INICIAL_PRODUCTO } from "../data/inventarioData";
import FormularioProducto from "../components/FormularioProducto";

/**
 * Página para el ingreso y registro de artículos al inventario.
 * Permite registrar nuevos productos en el estado global (Context API)
 * con validaciones y retroalimentación accesible.
 */
function NuevoProducto() {
  const navigate = useNavigate();
  const { agregarProducto } = useInventario();

  const [formData, setFormData] = useState(ESTADO_INICIAL_PRODUCTO);
  const [feedback, setFeedback] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLimpiar = () => {
    setFormData(ESTADO_INICIAL_PRODUCTO);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);
    setEnviando(true);

    const resultado = agregarProducto(formData);
    setEnviando(false);

    if (!resultado.exito) {
      setFeedback({
        tipo: "danger",
        mensaje: resultado.mensaje,
      });
      return;
    }

    setFeedback({
      tipo: "success",
      mensaje: `¡Producto "${resultado.producto.nombre}" (${resultado.producto.marca}) registrado con éxito!`,
      producto: resultado.producto,
    });

    setFormData(ESTADO_INICIAL_PRODUCTO);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-success">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/inventario" className="text-decoration-none text-success">Inventario</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Ingresar Artículo</li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h2 fw-bold text-success mb-1 d-flex align-items-center gap-2">
            <span>📝</span> Ingresar Nuevo Artículo
          </h1>
          <p className="text-muted mb-0">
            Formulario para incorporar productos al inventario general del supermercado.
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <Link to="/inventario" className="btn btn-outline-secondary">
            ← Ver Listado en Tabla
          </Link>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          {feedback && (
            <div
              className={`alert alert-${feedback.tipo} alert-dismissible fade show shadow-sm d-flex align-items-center justify-content-between`}
              role="alert"
            >
              <div>
                <strong>{feedback.tipo === "success" ? "✓ Operación Exitosa:" : "⚠️ Atención:"}</strong>{" "}
                {feedback.mensaje}
              </div>
              {feedback.tipo === "success" && (
                <button
                  type="button"
                  className="btn btn-sm btn-success ms-3"
                  onClick={() => navigate("/inventario")}
                >
                  Ir a la Tabla →
                </button>
              )}
            </div>
          )}

          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-success text-white py-3">
              <h2 className="h5 mb-0 fw-semibold">Datos del Producto</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <FormularioProducto
                  formData={formData}
                  onChange={handleChange}
                  onLimpiar={handleLimpiar}
                  enviando={enviando}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoProducto;
