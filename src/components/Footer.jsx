function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-5 text-center text-slate-500 text-xs mt-auto">
      <div className="container">
        <p className="mb-1 text-slate-800 font-bold text-sm">
          🛒 Supermercado Don Ahorro &copy; {anio} &bull; Propiedad de Eri Market 🐾
        </p>
        <p className="mb-0 text-slate-500">
          Sistema de Control de Inventario y Catálogo de Productos en Línea &bull; Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
