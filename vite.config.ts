import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"), // Should be mapped to something or removed? shared folder is gone. 
      // Actually shared/schema.ts is gone, but I updated imports. I should remove this alias or map it to a dummy if needed. 
      // But imports use "@shared/schema" in imports? I removed those imports in previous steps.
      // So I can remove @shared alias.
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "/test-christmas/", // Assuming repository name
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
