import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html", // ✅ Ensure this points to the correct file
    },
  },
});