import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html",
    },
  },
  server: {
    port: process.env.PORT || 4173, // ✅ Render needs an explicit port
    host: "0.0.0.0",
    strictPort: true,
  },
  preview: {
    port: process.env.PORT || 4173, // ✅ Ensure preview uses the correct port
    host: "0.0.0.0",
  },
});