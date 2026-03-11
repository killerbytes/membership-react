import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    ...(fs.existsSync(".env.local") && {
      https: {
        key: fs.readFileSync("./localhost+2-key.pem"),
        cert: fs.readFileSync("./localhost+2.pem"),
      },
    }),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
