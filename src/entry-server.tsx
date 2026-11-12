import { prerender } from 'react-dom/static'
import App from './App'
import { heroPreloads, structuredData } from './seo'

// Build-time render: scripts/prerender.mjs injects this into dist/index.html, so the shipped
// page is complete HTML before any script runs. prerender waits for the lazy sections' chunks,
// unlike renderToString, which would leave their Suspense fallbacks in the markup.
export async function render(): Promise<string> {
  const { prelude } = await prerender(<App />)
  return await new Response(prelude).text()
}

// The tags for <head> that come from the page's content: the hero's preloads and the structured data.
export function head(siteUrl: string): string {
  return heroPreloads() + '\n' + structuredData(siteUrl)
}
