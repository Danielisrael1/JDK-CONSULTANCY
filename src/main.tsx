import { createRoot, hydrateRoot } from 'react-dom/client'
import App, { below } from './App'
import './page.css'

// The production page is prerendered (scripts/prerender.mjs) with header.nav, main and
// footer.closing as the body's direct children, which the design kit expects, so React
// hydrates the body itself. The dev server has no prerender and renders from scratch.
const prerendered = document.body.querySelector(':scope > header.nav') !== null
if (prerendered) hydrateRoot(document.body, <App />)
else createRoot(document.body).render(<App />)

// Fetch the lazy sections' chunks now, in parallel, rather than one by one as React reaches them.
for (const load of Object.values(below)) void load()
