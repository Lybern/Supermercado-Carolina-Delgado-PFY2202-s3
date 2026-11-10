/**
 * Tipos de acción para la gestión de inventario y carrito.
 */
export const TIPOS_ACCION = {
  AGREGAR_PRODUCTO: "AGREGAR_PRODUCTO",
  AGREGAR_AL_CARRITO: "AGREGAR_AL_CARRITO",
  DISMINUIR_CANTIDAD_CARRITO: "DISMINUIR_CANTIDAD_CARRITO",
  MODIFICAR_STOCK: "MODIFICAR_STOCK",
  VACIAR_CARRITO: "VACIAR_CARRITO",
};

const CLAVE_STORAGE = "supermercado_don_ahorro_v1";

/**
 * Función de inicialización para useReducer con soporte para persistencia localStorage.
 */
export function crearEstadoInicial(productosIniciales = []) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const guardado = window.localStorage.getItem(CLAVE_STORAGE);
      if (guardado) {
        const parseado = JSON.parse(guardado);
        if (Array.isArray(parseado.productos) && Array.isArray(parseado.carrito)) {
          return parseado;
        }
      }
    }
  } catch (e) {
    // Fallback a catálogo base si falla localStorage
  }

  return {
    productos: productosIniciales.map((p) => ({ ...p })),
    carrito: [],
  };
}

/**
 * Reducer puro para la gestión atómica de inventario y carrito.
 * Invariante: stock + unidades_en_carrito = constante.
 */
export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case TIPOS_ACCION.AGREGAR_PRODUCTO:
      return {
        ...estado,
        productos: [...estado.productos, accion.producto],
      };

    case TIPOS_ACCION.AGREGAR_AL_CARRITO: {
      const id = String(accion.productoId);
      const prod = estado.productos.find((p) => String(p.id) === id);
      if (!prod || Number(prod.stock) <= 0) return estado;

      const productosActualizados = estado.productos.map((p) =>
        String(p.id) === id ? { ...p, stock: p.stock - 1 } : p
      );

      const existe = estado.carrito.find((c) => String(c.productoId) === id);
      const carritoActualizado = existe
        ? estado.carrito.map((c) =>
            String(c.productoId) === id ? { ...c, cantidad: c.cantidad + 1 } : c
          )
        : [...estado.carrito, { productoId: accion.productoId, cantidad: 1 }];

      return {
        ...estado,
        productos: productosActualizados,
        carrito: carritoActualizado,
      };
    }

    case TIPOS_ACCION.DISMINUIR_CANTIDAD_CARRITO: {
      const id = String(accion.productoId);
      const entrada = estado.carrito.find((c) => String(c.productoId) === id);
      if (!entrada) return estado;

      const nuevaCantidad = entrada.cantidad - 1;
      const productosActualizados = estado.productos.map((p) =>
        String(p.id) === id ? { ...p, stock: p.stock + 1 } : p
      );

      const carritoActualizado = nuevaCantidad === 0
        ? estado.carrito.filter((c) => String(c.productoId) !== id)
        : estado.carrito.map((c) =>
            String(c.productoId) === id ? { ...c, cantidad: nuevaCantidad } : c
          );

      return {
        ...estado,
        productos: productosActualizados,
        carrito: carritoActualizado,
      };
    }

    case TIPOS_ACCION.MODIFICAR_STOCK:
      return {
        ...estado,
        productos: estado.productos.map((p) =>
          String(p.id) === String(accion.id)
            ? { ...p, stock: Math.max(0, p.stock + accion.delta) }
            : p
        ),
      };

    case TIPOS_ACCION.VACIAR_CARRITO:
      return {
        ...estado,
        productos: estado.productos.map((prod) => {
          const item = estado.carrito.find((c) => String(c.productoId) === String(prod.id));
          return item ? { ...prod, stock: prod.stock + item.cantidad } : prod;
        }),
        carrito: [],
      };

    default:
      return estado;
  }
}
