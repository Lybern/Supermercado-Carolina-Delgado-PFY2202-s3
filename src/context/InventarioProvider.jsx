import { useReducer, useEffect } from "react";
import InventarioContext from "./InventarioContext";
import { productosIniciales } from "../data/inventarioData";
import { validarProducto } from "../utils/inventarioUtils";
import {
  crearEstadoInicial,
  inventarioReducer,
  TIPOS_ACCION,
} from "./inventarioReducer";

const CLAVE_STORAGE = "supermercado_don_ahorro_v1";

/**
 * Proveedor de Context API para gestión global del inventario y carrito.
 * Utiliza useReducer para garantizar transacciones atómicas y sincroniza con localStorage.
 */
export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(
    inventarioReducer,
    productosIniciales,
    crearEstadoInicial
  );

  // Sincronización persistente con localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado));
      }
    } catch (e) {
      // Manejo silencioso en caso de bloqueo de almacenamiento
    }
  }, [estado]);

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

  const agregarAlCarrito = (productoId) => {
    dispatch({
      type: TIPOS_ACCION.AGREGAR_AL_CARRITO,
      productoId,
    });
  };

  const disminuirCantidadCarrito = (productoId) => {
    dispatch({
      type: TIPOS_ACCION.DISMINUIR_CANTIDAD_CARRITO,
      productoId,
    });
  };

  const modificarStock = (id, delta) => {
    dispatch({
      type: TIPOS_ACCION.MODIFICAR_STOCK,
      id,
      delta,
    });
  };

  const vaciarCarrito = () => {
    dispatch({
      type: TIPOS_ACCION.VACIAR_CARRITO,
    });
  };

  const value = {
    productos: estado.productos,
    carrito: estado.carrito,
    agregarProducto,
    agregarAlCarrito,
    disminuirCantidadCarrito,
    modificarStock,
    vaciarCarrito,
  };

  return (
    <InventarioContext.Provider value={value}>
      {children}
    </InventarioContext.Provider>
  );
}

export default InventarioProvider;
