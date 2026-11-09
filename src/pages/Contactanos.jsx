import { useState } from "react";
import InfoContacto from "../components/InfoContacto";

function Contactanos() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    motivo: "Consulta general",
    mensaje: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  const handleReset = () => {
    setEnviado(false);
    setFormData({
      nombre: "",
      correo: "",
      motivo: "Consulta general",
      mensaje: "",
    });
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-semibold mb-2">
          Canales de Atención
        </span>
        <h1 className="h2 fw-bold text-dark">📞 Contáctanos</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: "680px" }}>
          ¿Tienes consultas sobre disponibilidad de productos en salas, reclamos o interés en ser proveedor de nuestro supermercado? Escríbenos.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-12 col-lg-5">
          <InfoContacto />
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 p-3">
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-3">Envíanos un Mensaje</h5>

              {enviado ? (
                <div className="alert alert-success py-4 text-center">
                  <h4>✅ ¡Mensaje recibido!</h4>
                  <p className="mb-0">
                    Gracias por comunicarte con Supermercado Don Ahorro Eri Market. Nuestro equipo de atención te responderá a la brevedad.
                  </p>
                  <button className="btn btn-outline-success mt-3" onClick={handleReset}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tu nombre y apellido"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Correo Electrónico *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="nombre@correo.com"
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Motivo del Contacto</label>
                    <select
                      className="form-select"
                      value={formData.motivo}
                      onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                    >
                      <option value="Consulta general">Consulta general</option>
                      <option value="Disponibilidad de stock">Disponibilidad de stock en tienda</option>
                      <option value="Propuesta de proveedor">Propuesta de proveedor de mercadería</option>
                      <option value="Felicitaciones o reclamos">Felicitaciones o sugerencias</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Mensaje *</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Escribe tu mensaje o detalle de tu consulta..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-success fw-semibold w-100 py-2">
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactanos;
