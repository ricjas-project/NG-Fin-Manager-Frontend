import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ Ensure base path is correct
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./index.html", // ✅ Fix path issue
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});