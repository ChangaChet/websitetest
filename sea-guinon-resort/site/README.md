# Sea Guinon Resort

Editorial marketing site for Sea Guinon — a beachfront resort on the Philippine coast.

Built with React 19, Vite, Tailwind CSS 4, GSAP ScrollTrigger, Lenis, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The build emits a single `dist/index.html` (inlined JS/CSS) via `vite-plugin-singlefile`. That file can be dropped on GitHub Pages, Netlify, or any static host.

GitHub Pages: this app uses `HashRouter`, so routes work without a custom 404 rewrite (`/#/resort`, `/#/dining`, …).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production bundle |
| `npm run preview` | Serve the production build |

## Note

Videos and photos are loaded from Pexels. Swap the URLs in `src/data/content.ts` for your own assets when you go live.
