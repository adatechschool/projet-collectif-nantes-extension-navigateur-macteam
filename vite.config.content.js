import { resolve } from 'path';
import { defineConfig } from 'vite';


export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            name: 'background',
            entry: resolve(__dirname, 'src/script.js'),
            formats: ['iife'],
        },
        emptyOutDir: false,
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'script.js',
                format: "iife",
            }
        },
    },
});
