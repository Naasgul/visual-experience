import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    environment: "jsdom",
  },
});
