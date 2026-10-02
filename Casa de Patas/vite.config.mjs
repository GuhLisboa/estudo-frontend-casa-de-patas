import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: true,

        rollupOptions: {
            input: {
                index: resolve(import.meta.dirname, "html/index.html"),
                projetos: resolve(import.meta.dirname, "html/projetos.html"),
                contato: resolve(import.meta.dirname, "html/contato.html")
            }
        }
    }
});