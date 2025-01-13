// vite.config.background.js

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            name: 'background',
            entry: resolve(__dirname, 'src/background.js'),
            formats: ['iife'],
        },
        emptyOutDir: false,
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'background.js',
                format: "iife",
            }
        },
    },
});