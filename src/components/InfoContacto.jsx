/**
 * Componente modular para mostrar los canales de atención institucional.
 */
function InfoContacto() {
  return (
    <div className="card shadow-sm border-0 h-100 p-3">
      <div className="card-body">
        <h5 className="fw-bold text-success mb-3">Canales Directos</h5>

        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="fs-3">☎️</div>
          <div>
            <h6 className="fw-bold mb-1">Mesa Central</h6>
            <p className="text-secondary small mb-0">+56 2 2345 6700</p>
            <small className="text-muted">Lunes a Viernes 08:30 a 18:30 hrs.</small>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="fs-3">💬</div>
          <div>
            <h6 className="fw-bold mb-1">WhatsApp Proveedores e Inventario</h6>
            <p className="text-secondary small mb-0">+56 9 8765 4321</p>
            <small className="text-muted">Recepción de guías de despacho y órdenes</small>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="fs-3">✉️</div>
          <div>
            <h6 className="fw-bold mb-1">Correo Electrónico</h6>
            <p className="text-secondary small mb-0">contacto@superdonahorro.cl</p>
            <p className="text-secondary small mb-0">inventario@superdonahorro.cl</p>
          </div>
        </div>

        <div className="alert alert-success mt-4 mb-0 small">
          <strong>💡 Horario Bodega Central:</strong> Lunes a Sábado de 06:00 a 14:00 hrs. para recepción de camiones.
        </div>
      </div>
    </div>
  );
}

export default InfoContacto;
