/**
 * Funciones utilitarias para la gestión del inventario de supermercado.
 * Centraliza reglas de negocio, validaciones y formato para asegurar consistencia.
 */

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
    res = { estado: "Agotado", badgeClass: "bg-dark", nivel: "agotado" };
  } else if (esStockCritico(producto)) {
    res = { estado: "Crítico", badgeClass: "bg-danger", nivel: "critico" };
  } else if (esStockAlerta(producto)) {
    res = { estado: "Alerta", badgeClass: "bg-warning text-dark", nivel: "alerta" };
  } else {
    res = { estado: "Óptimo", badgeClass: "bg-success", nivel: "optimo" };
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
 * Valida los datos de un artículo mediante expresiones regulares y reglas de negocio.
 * Resuelve la oportunidad de mejora 1 de la pauta formativa.
 * @param {Object} producto
 * @param {Array} productosExistentes
 * @returns {{ esValido: boolean, errores: string[] }}
 */
export const validarProducto = (producto, productosExistentes = []) => {
  const errores = [];

  if (!producto) {
    return { esValido: false, errores: ["Los datos del producto son obligatorios."] };
  }

  const sku = producto.sku ? String(producto.sku).trim().toUpperCase() : "";
  const nombre = producto.nombre ? String(producto.nombre).trim() : "";
  const marca = producto.marca ? String(producto.marca).trim() : "";

  // 1. Validación de SKU con Regex (formato alfanumérico en mayúsculas, ej: ABA-001, LAC-102)
  if (!sku) {
    errores.push("El código SKU es obligatorio.");
  } else if (!/^[A-Z0-9]{2,8}(-[A-Z0-9]{2,6})?$/.test(sku)) {
    errores.push("El SKU debe tener formato alfanumérico en mayúsculas (ej: ABA-001 o BEB-10).");
  } else if (
    productosExistentes.some(
      (p) => String(p.sku).trim().toUpperCase() === sku && p.id !== producto.id
    )
  ) {
    errores.push(`El código SKU "${sku}" ya está registrado en el inventario.`);
  }

  // 2. Validación de Nombre con Regex (letras, números, espacios y acentos, sanitización XSS)
  if (!nombre) {
    errores.push("El nombre del producto es obligatorio.");
  } else if (nombre.length < 3 || nombre.length > 80) {
    errores.push("El nombre debe tener entre 3 y 80 caracteres.");
  } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,°()\-#%+]+$/.test(nombre)) {
    errores.push("El nombre contiene caracteres no permitidos.");
  }

  // 3. Validación de Marca con Regex
  if (!marca) {
    errores.push("La marca del producto es obligatoria.");
  } else if (marca.length < 2 || marca.length > 50) {
    errores.push("La marca debe tener entre 2 y 50 caracteres.");
  } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.&'\-]+$/.test(marca)) {
    errores.push("La marca contiene caracteres no permitidos.");
  }

  // 4. Validación de campos numéricos (precio y stock)
  const precio = Number(producto.precio);
  const stock = Number(producto.stock);
  const stockMinimo = Number(producto.stockMinimo) || 0;

  if (producto.precio === "" || producto.precio === null || isNaN(precio) || precio <= 0) {
    errores.push("El precio debe ser un número mayor a cero.");
  }
  if (
    producto.stock === "" ||
    producto.stock === null ||
    isNaN(stock) ||
    stock < 0 ||
    !Number.isInteger(stock)
  ) {
    errores.push("El stock debe ser un número entero mayor o igual a cero.");
  }
  if (isNaN(stockMinimo) || stockMinimo < 0 || !Number.isInteger(stockMinimo)) {
    errores.push("El stock mínimo debe ser un número entero mayor o igual a cero.");
  }

  return {
    esValido: errores.length === 0,
    errores,
  };
};
