import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/visual-experience/",
  server: {
    proxy: {
      "/upload": "http://localhost:3000",
    },
  },
});
