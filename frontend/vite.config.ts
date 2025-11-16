import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/auth": "http://localhost:4000",
      "/playlists": "http://localhost:4000",
      "/screens": "http://localhost:4000",
    },
  },
});
