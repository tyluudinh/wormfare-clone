import react from "@vitejs/plugin-react";
import path from "path"; 
import { defineConfig } from "vite";
import swc from "vite-plugin-swc-transform";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    swc({
      swcOptions: {
        jsc: {
          target: "es2022",
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            useDefineForClassFields: false,
          },
          // externalHelpers: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src"),
    },
  },
})
