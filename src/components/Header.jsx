import { Link, NavLink } from "react-router";
import useInventario from "../hooks/useInventario";
import OrangeTabbyCat from "./OrangeTabbyCat";

/**
 * Encabezado institucional con identidad del supermercado,
 * menú superior de navegación y botón de carrito posicionado en el extremo superior.
 */
function Header() {
  const { carrito } = useInventario();
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const getTopNavLinkClass = ({ isActive }) =>
    `px-3 py-1.5 font-semibold text-sm rounded-xl transition no-underline ${
      isActive
        ? "bg-white text-emerald-700 shadow-sm"
        : "text-white/85 hover:text-white hover:bg-white/10"
    }`;

  return (
    <header className="navbar bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 shadow-md py-3 text-white">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        {/* Identidad institucional a la izquierda */}
        <Link to="/" className="flex items-center gap-3 text-white no-underline group">
          <span className="text-3xl p-1 bg-white/10 rounded-2xl shadow-inner">🛒</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Supermercado Don Ahorro
              </span>
              <OrangeTabbyCat size={32} className="rounded-full bg-white p-0.5 shadow-sm" />
              <span className="bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
                Eri Market
              </span>
            </div>
            <span className="text-xs text-emerald-100 font-medium tracking-wide">
              🐾 Propiedad de Eri Market
            </span>
          </div>
        </Link>

        {/* Navegación y Botón de Carrito a la derecha, con amplio espaciado */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación superior">
            <NavLink to="/" className={getTopNavLinkClass} end>
              Inicio
            </NavLink>
            <NavLink to="/inventario" className={getTopNavLinkClass}>
              📋 Tabla Inventario
            </NavLink>
            <NavLink to="/nuevo-producto" className={getTopNavLinkClass}>
              ➕ Ingresar Artículo
            </NavLink>
            <NavLink to="/tiendas" className={getTopNavLinkClass}>
              Tiendas
            </NavLink>
            <NavLink to="/quienes-somos" className={getTopNavLinkClass}>
              Nosotros
            </NavLink>
          </nav>

          <Link
            to="/carrito"
            className="btn bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold px-3.5 py-2 rounded-xl shadow flex items-center gap-2 transition active:scale-95 border-0"
            title="Ir al carrito de compras"
          >
            <span className="text-lg">🛒</span>
            <span className="text-sm">Carrito</span>
            {totalUnidades > 0 && (
              <span className="bg-rose-600 text-white text-xs font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                {totalUnidades}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
