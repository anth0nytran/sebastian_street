import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [react()],
    resolve: {
        alias: { "@": path.resolve(__dirname, "./src") },
    },
    server: {
        port: Number(process.env.PORT) || 3001,
        host: "0.0.0.0",
        proxy: {
            /**
             * Forward lead submissions to the Express server in local dev; in
             * production these are Vercel serverless functions under /api.
             *
             * The API port is separate from the dev-server port on purpose.
             * They used to both default to 3001, so running the dev server
             * there made Vite proxy /api straight back to itself and every
             * form submission 404'd.
             */
            "/api": {
                target: `http://localhost:${process.env.SERVER_PORT || 3002}`,
                changeOrigin: true,
                secure: false,
            },
        },
    },
    ssr: {
        // react-helmet-async ships a CJS build whose named exports don't
        // resolve cleanly under Node ESM, so bundle it. react-router-dom must
        // stay external: bundling it rewrites its `react-router/dom` import
        // into a default import, which that ESM-only module doesn't provide.
        noExternal: ["react-helmet-async"],
    },
    build: {
        // Sourcemaps ship so a production stack trace is readable; they cost
        // nothing to the user since browsers only fetch them when devtools open.
        sourcemap: true,
        rollupOptions: {
            output: {
                /**
                 * Route components are imported eagerly (see src/App.tsx for
                 * why), so splitting happens at the vendor level instead —
                 * which is where the weight actually is. These three change on
                 * a different cadence than app code, so isolating them keeps
                 * them cached across content deploys.
                 *
                 * Client build only: in the SSR build these packages are
                 * externalised, and Rollup refuses to chunk an external.
                 */
                ...(isSsrBuild
                    ? {}
                    : {
                          manualChunks: {
                              react: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
                              motion: ["framer-motion"],
                              icons: ["lucide-react"],
                          },
                      }),
            },
        },
    },
}));
