/**
 * Funciones utilitarias para la gestión del inventario de supermercado.
 * Centraliza reglas de negocio, cálculo de métricas y formato.
 */

export { validarProducto } from "./validaciones";

/**
 * Determina si un producto se encuentra en stock crítico o bajo su mínimo.
 * @param {Object} producto
 * @returns {boolean}
 */
export const esStockCritico = (producto) => {
  if (!producto) return false;
  return Number(producto.stock) <= Number(producto.stockMinimo);
};

/**
 * Determina si el stock está en nivel de alerta preventiva (entre mínimo y 1.5x el mínimo).
 * @param {Object} producto
 * @returns {boolean}
 */
export const esStockAlerta = (producto) => {
  if (!producto) return false;
  const stock = Number(producto.stock);
  const stockMin = Number(producto.stockMinimo);
  return stock > stockMin && stock <= stockMin * 1.5;
};

/**
 * Devuelve la etiqueta y variante de color Bootstrap para el estado del stock.
 * Proporciona compatibilidad dual: { estado, badgeClass } y alias { texto, claseBadge }.
 * @param {Object} producto
 * @returns {{ estado: string, badgeClass: string, texto: string, claseBadge: string, nivel: 'critico'|'alerta'|'optimo'|'agotado' }}
 */
export const obtenerEstadoStock = (producto) => {
  if (!producto) {
    return {
      estado: "Desconocido",
      texto: "Desconocido",
      badgeClass: "bg-secondary",
      claseBadge: "bg-secondary",
      nivel: "desconocido",
    };
  }

  const stock = Number(producto.stock);

  let res;
  if (stock === 0) {
    res = { estado: "Agotado", badgeClass: "bg-slate-900 text-white", nivel: "agotado" };
  } else if (esStockCritico(producto)) {
    res = { estado: "Crítico", badgeClass: "bg-rose-100 text-rose-800 border border-rose-300", nivel: "critico" };
  } else if (esStockAlerta(producto)) {
    res = { estado: "Alerta", badgeClass: "bg-amber-100 text-amber-900 border border-amber-300", nivel: "alerta" };
  } else {
    res = { estado: "Óptimo", badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-300", nivel: "optimo" };
  }

  return {
    ...res,
    texto: res.estado,
    claseBadge: res.badgeClass,
  };
};

/**
 * Formatea un valor numérico a pesos chilenos (CLP).
 * @param {number} valor
 * @returns {string}
 */
export const formatearMoneda = (valor) => {
  return `$${Number(valor || 0).toLocaleString("es-CL")}`;
};

/**
 * Filtra la colección de productos de forma pura según texto, categoría y nivel de stock.
 * @param {Array} productos
 * @param {{ busqueda?: string, categoria?: string, soloCriticos?: boolean }} filtros
 * @returns {Array} Nueva colección filtrada sin mutar el arreglo original.
 */
export const filtrarProductos = (productos = [], filtros = {}) => {
  const { busqueda = "", categoria = "Todas", soloCriticos = false } = filtros;
  const textoBusqueda = busqueda.trim().toLowerCase();

  return productos.filter((p) => {
    // 1. Coincidencia por texto (nombre, SKU o marca)
    const coincideTexto =
      !textoBusqueda ||
      p.nombre.toLowerCase().includes(textoBusqueda) ||
      p.sku.toLowerCase().includes(textoBusqueda) ||
      (p.marca && p.marca.toLowerCase().includes(textoBusqueda));

    // 2. Coincidencia por categoría
    const coincideCategoria =
      categoria === "Todas" || p.categoria === categoria;

    // 3. Coincidencia por stock crítico
    const coincideCritico = soloCriticos ? esStockCritico(p) : true;

    return coincideTexto && coincideCategoria && coincideCritico;
  });
};

/**
 * Calcula las métricas ejecutivas consolidadas del inventario (KPIs).
 * @param {Array} productos
 * @returns {{ totalProductos: number, totalUnidades: number, stockCriticoCount: number, valorTotalInventario: number }}
 */
export const calcularMetricasInventario = (productos = []) => {
  const totalProductos = productos.length;
  const totalUnidades = productos.reduce(
    (acc, p) => acc + Number(p.stock || 0),
    0
  );
  const stockCriticoCount = productos.filter(esStockCritico).length;
  const valorTotalInventario = productos.reduce(
    (acc, p) => acc + Number(p.precio || 0) * Number(p.stock || 0),
    0
  );

  return {
    totalProductos,
    totalUnidades,
    stockCriticoCount,
    valorTotalInventario,
  };
};
