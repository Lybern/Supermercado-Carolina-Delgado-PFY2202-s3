/**
 * Tipos de acción formales para la máquina de estados de inventario y carrito.
 * Sigue la arquitectura de useReducer enseñada por el profesor en la Semana 3.
 */
export const TIPOS_ACCION = {
  AGREGAR_PRODUCTO: "AGREGAR_PRODUCTO",
  AGREGAR_AL_CARRITO: "AGREGAR_AL_CARRITO",
  DISMINUIR_CANTIDAD_CARRITO: "DISMINUIR_CANTIDAD_CARRITO",
  MODIFICAR_STOCK: "MODIFICAR_STOCK",
};

/**
 * Función pura de inicialización para useReducer.
 * Establece el inventario con copia inmutable y el carrito vacío.
 * @param {Array} productosIniciales
 * @returns {{ productos: Array, carrito: Array }}
 */
export function crearEstadoInicial(productosIniciales = []) {
  return {
    productos: productosIniciales.map((p) => ({ ...p })),
    carrito: [],
  };
}

/**
 * Reducer puro para la gestión atómica de inventario y carrito de compras.
 * Garantiza la ley de conservación: stock disponible + unidades en carrito = total.
 * @param {{ productos: Array, carrito: Array }} estado
 * @param {{ type: string, payload?: any, producto?: any, productoId?: string|number }} accion
 * @returns {{ productos: Array, carrito: Array }}
 */
export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case TIPOS_ACCION.AGREGAR_PRODUCTO: {
      return {
        ...estado,
        productos: [...estado.productos, accion.producto],
      };
    }

    case TIPOS_ACCION.AGREGAR_AL_CARRITO: {
      const producto = estado.productos.find(
        (item) => String(item.id) === String(accion.productoId)
      );

      // Si no existe o no tiene disponibilidad, el estado no se modifica
      if (!producto || Number(producto.stock) <= 0) {
        return estado;
      }

      // 1. Transacción atómica: restar 1 unidad del stock de inventario
      const productosActualizados = estado.productos.map((item) =>
        String(item.id) === String(accion.productoId)
          ? { ...item, stock: item.stock - 1 }
          : item
      );

      // 2. Transacción atómica: sumar 1 unidad al carrito o crear la entrada
      const entradaExistente = estado.carrito.find(
        (entrada) => String(entrada.productoId) === String(accion.productoId)
      );

      const carritoActualizado = entradaExistente
        ? estado.carrito.map((entrada) =>
            String(entrada.productoId) === String(accion.productoId)
              ? { ...entrada, cantidad: entrada.cantidad + 1 }
              : entrada
          )
        : [...estado.carrito, { productoId: accion.productoId, cantidad: 1 }];

      return {
        ...estado,
        productos: productosActualizados,
        carrito: carritoActualizado,
      };
    }

    case TIPOS_ACCION.DISMINUIR_CANTIDAD_CARRITO: {
      const entrada = estado.carrito.find(
        (item) => String(item.productoId) === String(accion.productoId)
      );

      if (!entrada) {
        return estado;
      }

      const nuevaCantidad = entrada.cantidad - 1;

      // 1. Transacción atómica: reintegrar 1 unidad al stock de inventario
      const productosActualizados = estado.productos.map((item) =>
        String(item.id) === String(accion.productoId)
          ? { ...item, stock: item.stock + 1 }
          : item
      );

      // 2. Transacción atómica: restar del carrito; si llega a 0, se elimina con filter()
      const carritoActualizado =
        nuevaCantidad === 0
          ? estado.carrito.filter(
              (item) => String(item.productoId) !== String(accion.productoId)
            )
          : estado.carrito.map((item) =>
              String(item.productoId) === String(accion.productoId)
                ? { ...item, cantidad: nuevaCantidad }
                : item
            );

      return {
        ...estado,
        productos: productosActualizados,
        carrito: carritoActualizado,
      };
    }

    case TIPOS_ACCION.MODIFICAR_STOCK: {
      const productosActualizados = estado.productos.map((item) =>
        String(item.id) === String(accion.id)
          ? { ...item, stock: Math.max(0, item.stock + accion.delta) }
          : item
      );

      return {
        ...estado,
        productos: productosActualizados,
      };
    }

    default:
      return estado;
  }
}
