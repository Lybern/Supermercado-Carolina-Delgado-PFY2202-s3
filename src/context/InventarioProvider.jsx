import { useState } from "react";
import InventarioContext from "./InventarioContext";
import { productosIniciales } from "../data/inventarioData";
import { validarProducto } from "../utils/inventarioUtils";

/**
 * Inicializador de estado que realiza una copia superficial inmutable de los datos base.
 */
function construirEstadoInicial() {
  return productosIniciales.map((p) => ({ ...p }));
}

/**
 * Proveedor de Context API para gestión global del inventario.
 * Mantiene la persistencia en memoria durante la navegación de la SPA.
 */
export function InventarioProvider({ children }) {
  const [productos, setProductos] = useState(construirEstadoInicial);

  /**
   * Agrega un nuevo producto al estado global de manera inmutable.
   * Realiza validaciones de obligatoriedad, tipos de datos y SKU único.
   */
  const agregarProducto = (nuevo) => {
    // 1. Validar producto con expresiones regulares y reglas de negocio
    const validacion = validarProducto(nuevo, productos);
    if (!validacion.esValido) {
      return {
        exito: false,
        mensaje: validacion.errores.join(" "),
      };
    }

    const precioNum = Number(nuevo.precio);
    const stockNum = Number(nuevo.stock);
    const stockMinNum = Number(nuevo.stockMinimo) || 0;

    // 4. Construir objeto inmutable con ID único seguro
    const nuevoItem = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      sku: nuevo.sku.trim().toUpperCase(),
      nombre: nuevo.nombre.trim(),
      marca: nuevo.marca.trim(),
      categoria: nuevo.categoria || "Abarrotes",
      precio: precioNum,
      stock: stockNum,
      stockMinimo: stockMinNum,
      unidad: nuevo.unidad || "Unidad",
      ubicacion: nuevo.ubicacion?.trim() || "Bodega Central",
    };

    // 5. Actualización inmutable del estado global
    setProductos((previos) => [...previos, nuevoItem]);

    return { exito: true, producto: nuevoItem };
  };

  /**
   * Modifica el stock de un producto existente de forma inmutable.
   * Evita stocks negativos utilizando Math.max(0, ...).
   */
  const modificarStock = (id, delta) => {
    setProductos((previos) =>
      previos.map((item) => {
        if (item.id === id) {
          const nuevoStock = Math.max(0, item.stock + delta);
          return { ...item, stock: nuevoStock };
        }
        return item;
      })
    );
  };

  const value = {
    productos,
    agregarProducto,
    modificarStock,
  };

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
}

export default InventarioProvider;
