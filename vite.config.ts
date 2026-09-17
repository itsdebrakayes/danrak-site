import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    // Assets under 4kb get inlined; anything larger keeps its own cacheable URL.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor code so a copy change doesn't invalidate the whole bundle
        // and the browser can fetch these in parallel.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-swiper": ["swiper"],
          "vendor-motion": ["gsap", "framer-motion"],
          "vendor-icons": ["react-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
}));
