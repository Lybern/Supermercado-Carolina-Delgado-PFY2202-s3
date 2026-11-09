import { Routes, Route } from "react-router";
import InventarioProvider from "./context/InventarioProvider";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";

// Vistas / Páginas
import HomeInventario from "./pages/HomeInventario";
import ListadoInventario from "./pages/ListadoInventario";
import NuevoProducto from "./pages/NuevoProducto";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import NuestrasTiendas from "./pages/NuestrasTiendas";
import QuienesSomos from "./pages/QuienesSomos";
import Contactanos from "./pages/Contactanos";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <InventarioProvider>
      <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
        {/* Encabezado Superior con Identidad Institucional */}
        <Header />

        {/* Contenido Principal enrutado dinámicamente con React Router */}
        <main className="flex-grow-1 pb-4">
          <Routes>
            {/* Panel Principal */}
            <Route path="/" element={<HomeInventario />} />

            {/* Gestión de Inventario y Catálogo */}
            <Route path="/inventario" element={<ListadoInventario />} />
            <Route path="/nuevo-producto" element={<NuevoProducto />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />

            {/* Rutas institucionales adicionales */}
            <Route path="/tiendas" element={<NuestrasTiendas />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contactanos" element={<Contactanos />} />

            {/* Manejo explícito de rutas desconocidas (Error 404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Menú Inferior de Navegación */}
        <BottomNav />

        {/* Pie de página institucional */}
        <Footer />
      </div>
    </InventarioProvider>
  );
}

export default App;
