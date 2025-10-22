import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(process.env.VITE_DEV_SERVER_PORT || 5173)
    },
    preview: {
        port: Number(process.env.VITE_PREVIEW_PORT || 4173)
    }
});
