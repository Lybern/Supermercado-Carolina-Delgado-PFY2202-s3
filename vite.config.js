import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite con base path para despliegue en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/Supermercado-Carolina-Delgado-PFY2202-s3/",
});
