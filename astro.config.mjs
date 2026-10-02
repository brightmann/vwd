import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
// Fully static site (no on-demand routes). React islands are rendered at build
// time + hydrated client-side. Deployed to Cloudflare Workers.
export default defineConfig({
    site: 'https://vwd.luckypoem.workers.dev',
    // Match Next's default (no trailing slash). `format: 'directory'` emits
    // <route>/index.html so route output merges with same-named public/ asset dirs
    // (e.g. /blog route + /blog/*.png images).
    trailingSlash: 'never',
    build: {
        format: 'directory',
    },
    adapter: cloudflare(),
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
        // Never inline assets as data: URIs — the CSP (securityHeaders.mjs) is
        // 'self'-only, so inlined woff fallbacks trigger console CSP errors.
        build: {
            assetsInlineLimit: 0,
        },
    },
})
