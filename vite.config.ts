import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target older browsers for broader compatibility (iOS Safari 14.5+, Chrome 87+, Firefox 78+, Edge 88+)
    target: ["es2020", "safari14", "chrome87", "firefox78", "edge88"],
    // Improve CSS compatibility
    cssTarget: ["safari14", "chrome87", "firefox78", "edge88"],
    // Generate sourcemaps for debugging production issues
    sourcemap: false,
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          "framer-motion": ["framer-motion"],
          router: ["react-router-dom"],
        },
      },
    },
  },
}));
