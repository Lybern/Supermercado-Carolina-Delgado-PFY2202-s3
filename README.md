# Supermercado Don Ahorro (Eri Market) - Gestión de Inventario y Carrito 🛒🐾

Aplicación web interactiva desarrollada con **React 19**, **React Router**, **Vite** y **Bootstrap 5**, diseñada para la administración integral de existencias, catálogo de productos y simulación de reservas mediante carrito de compras.

- **Estudiante:** Carolina Delgado
- **Repositorio Oficial:** [Supermercado-Carolina-Delgado-PFY2202-s3](https://github.com/Lybern/Supermercado-Carolina-Delgado-PFY2202-s3)
- **Despliegue en GitHub Pages:** [Ver Aplicación en Vivo](https://lybern.github.io/Supermercado-Carolina-Delgado-PFY2202-s3/)

---

## 🚀 Características Principales

### 1. Gestión de Estado Global con `useReducer` y Context API
* **Transacciones Atómicas:** Unificación de `productos` (inventario) y `carrito` bajo un único gobernador de estado (`inventarioReducer.js`).
* **Ley de Conservación de Stock:** Al agregar un artículo al carrito, se descuenta de forma atómica e inmediata una unidad de sus existencias disponibles en inventario. Al devolver unidades en el carrito, el stock se reintegra en tiempo real.
* **Eliminación Automática:** Si la cantidad de un artículo en el carrito llega a cero (`0`), se remueve automáticamente de la lista con `.filter()`.
* **Persistencia en Memoria:** Estado preservado durante toda la navegación de la SPA gracias a `InventarioProvider`.

### 2. Filtrado y Búsqueda Reactiva sin Mutación
* **Cálculo Derivado:** La función pura `filtrarProductos` procesa en tiempo de render las coincidencias por texto (SKU, nombre, marca), categoría temática y alerta de stock crítico sin alterar el arreglo original de datos.
* **Componente Modular:** Interfaz de filtrado desacoplada en `FiltrosInventario.jsx` para reutilización coherente.

### 3. Ficha Técnica y Detalle Dinámico (`/producto/:id`)
* **Navegación con `useParams`:** Extracción de parámetros de ruta dinámica en React Router.
* **Control de Existencias:** Botón interactivo condicional que se deshabilita automáticamente cuando el stock del producto llega a cero (`disabled={stock === 0}`).
* **Accesibilidad:** Notificaciones y confirmaciones de estado con atributos `aria-live="polite"`.

### 4. Carrito de Compras Interactivo (`/carrito`)
* **Gestión de Unidades:** Controles para aumentar (`+`) y disminuir (`-`) cantidades por artículo.
* **Cálculo Automático:** Desglose de subtotales, conteo total de unidades reservadas y valorización final en Pesos Chilenos (CLP).
* **Contador en Navegación:** Indicadores numéricos en tiempo real en la barra superior (`Header`) y en el menú inferior (`BottomNav`).

### 5. Validaciones Robustas con Expresiones Regulares
* **SKU:** Formato alfanumérico en mayúsculas obligatorio (ej: `ABA-001`, `LAC-102`) y verificación contra duplicados.
* **Nombre y Marca:** Validación de longitud mínima/máxima y saneamiento contra inyección de caracteres especiales o código malicioso.
* **Numéricos:** Comprobación estricta de precio positivo y stock entero no negativo.

### 6. Arquitectura Modular y Código Limpio
* **Separación de Responsabilidades:** Distribución estricta en carpetas `components/`, `context/`, `data/`, `hooks/`, `pages/` y `utils/`.
* **Componentes Livianos:** Todos los archivos y vistas se mantienen por debajo de las 150 líneas de código para máxima legibilidad y facilidad de mantenimiento.

---

## 🛠️ Tecnologías Utilizadas

* **React 19:** Biblioteca base para interfaces de usuario declarativas.
* **React Router:** Enrutamiento SPA con rutas dinámicas y navegación sin recargas.
* **Bootstrap 5:** Framework CSS para maquetación adaptable, componentes responsive y paleta visual accesible.
* **Vite:** Herramienta de compilación y servidor de desarrollo ultrarrápido.

---

## 📦 Instalación y Ejecución Local

Para clonar y ejecutar este proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lybern/Supermercado-Carolina-Delgado-PFY2202-s3.git
   cd Supermercado-Carolina-Delgado-PFY2202-s3
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor local en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── BottomNav.jsx         # Menú inferior con enlace activo y contador de carrito
│   ├── FiltrosInventario.jsx # Barra modular de búsqueda y selector de categorías
│   ├── Footer.jsx            # Pie de página institucional
│   ├── Header.jsx            # Encabezado superior con botón de carrito dinámico
│   ├── ItemCarrito.jsx       # Componente modular para fila de producto en carrito
│   ├── KpiCard.jsx           # Tarjeta modular de indicador clave
│   ├── KpiResumen.jsx        # Grilla modular de métricas ejecutivas
│   ├── OrangeTabbyCat.jsx    # Mascota institucional del supermercado
│   └── TablaInventario.jsx   # Tabla modular de catálogo con acceso a detalle
├── context/
│   ├── InventarioContext.js  # Definición desacoplada del contexto global
│   ├── InventarioProvider.jsx # Proveedor global que implementa useReducer
│   └── inventarioReducer.js  # Reducer puro con transacciones atómicas
├── data/
│   └── inventarioData.js     # Catálogo inicial de productos y constantes
├── hooks/
│   └── useInventario.js      # Hook personalizado para consumo del contexto
├── pages/
│   ├── Carrito.jsx           # Pantalla de carrito de compras y resumen de pedido
│   ├── Contactanos.jsx       # Página institucional de contacto
│   ├── DetalleProducto.jsx   # Vista de detalle con useParams y botón condicional
│   ├── HomeInventario.jsx    # Panel principal de control de existencias
│   ├── ListadoInventario.jsx # Vista tabular completa del inventario
│   ├── NotFound.jsx          # Manejo de error 404 para rutas desconocidas
│   ├── NuestrasTiendas.jsx   # Información de sucursales físicas y bodegas
│   ├── NuevoProducto.jsx     # Formulario de registro con validaciones regex
│   └── QuienesSomos.jsx      # Misión, visión e historia institucional
├── utils/
│   └── inventarioUtils.js    # Funciones puras de cálculo, validación y filtros
├── App.jsx                   # Layout principal y declaración de rutas
├── main.jsx                  # Entrada raíz con BrowserRouter y basename de Vite
└── index.css                 # Estilos personalizados y utilidades de diseño
```
