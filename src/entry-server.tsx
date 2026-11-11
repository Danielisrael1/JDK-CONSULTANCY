import { prerender } from 'react-dom/static'
import App from './App'

// Build-time render: scripts/prerender.mjs injects this into dist/index.html, so the shipped
// page is complete HTML before any script runs. prerender waits for the lazy sections' chunks,
// unlike renderToString, which would leave their Suspense fallbacks in the markup.
export async function render(): Promise<string> {
  const { prelude } = await prerender(<App />)
  return await new Response(prelude).text()
}
