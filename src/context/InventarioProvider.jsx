import { useReducer } from "react";
import InventarioContext from "./InventarioContext";
import { productosIniciales } from "../data/inventarioData";
import { validarProducto } from "../utils/inventarioUtils";
import {
  crearEstadoInicial,
  inventarioReducer,
  TIPOS_ACCION,
} from "./inventarioReducer";

/**
 * Proveedor de Context API para gestión global del inventario y carrito.
 * Utiliza useReducer para garantizar transacciones atómicas e inmutabilidad en memoria.
 */
export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(
    inventarioReducer,
    productosIniciales,
    crearEstadoInicial
  );

  /**
   * Agrega un nuevo producto validado al catálogo global mediante dispatch.
   */
  const agregarProducto = (nuevo) => {
    const validacion = validarProducto(nuevo, estado.productos);
    if (!validacion.esValido) {
      return {
        exito: false,
        mensaje: validacion.errores.join(" "),
      };
    }

    const nuevoItem = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      sku: nuevo.sku.trim().toUpperCase(),
      nombre: nuevo.nombre.trim(),
      marca: nuevo.marca.trim(),
      categoria: nuevo.categoria || "Abarrotes",
      precio: Number(nuevo.precio),
      stock: Number(nuevo.stock),
      stockMinimo: Number(nuevo.stockMinimo) || 0,
      unidad: nuevo.unidad || "Unidad",
      ubicacion: nuevo.ubicacion?.trim() || "Bodega Central",
    };

    dispatch({
      type: TIPOS_ACCION.AGREGAR_PRODUCTO,
      producto: nuevoItem,
    });

    return { exito: true, producto: nuevoItem };
  };

  /**
   * Despacha la orden atómica de agregar al carrito (descuenta stock del inventario).
   */
  const agregarAlCarrito = (productoId) => {
    dispatch({
      type: TIPOS_ACCION.AGREGAR_AL_CARRITO,
      productoId,
    });
  };

  /**
   * Despacha la orden atómica de disminuir cantidad del carrito (reintegra stock al inventario).
   */
  const disminuirCantidadCarrito = (productoId) => {
    dispatch({
      type: TIPOS_ACCION.DISMINUIR_CANTIDAD_CARRITO,
      productoId,
    });
  };

  /**
   * Ajuste directo de existencias en tabla (+1 / -1) manteniendo consistencia.
   */
  const modificarStock = (id, delta) => {
    dispatch({
      type: TIPOS_ACCION.MODIFICAR_STOCK,
      id,
      delta,
    });
  };

  const value = {
    productos: estado.productos,
    carrito: estado.carrito,
    agregarProducto,
    agregarAlCarrito,
    disminuirCantidadCarrito,
    modificarStock,
  };

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
}

export default InventarioProvider;
