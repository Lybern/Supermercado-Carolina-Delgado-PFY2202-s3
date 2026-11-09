function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-4 text-center text-muted small mt-auto">
      <div className="container">
        <p className="mb-1 text-dark fw-bold">
          🛒 Supermercado Don Ahorro &copy; {anio} &bull; Propiedad de Eri Market 🐾
        </p>
        <p className="mb-0 text-secondary">
          Sistema de Control de Inventario y Catálogo de Productos en Línea &bull; Duoc UC
        </p>
      </div>
    </footer>
  );
}

export default Footer;
