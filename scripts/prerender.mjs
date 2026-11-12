// Runs after `vite build` and the SSR build: renders the React tree once and writes it into
// dist/index.html, so the shipped page is complete HTML (readable by search engines and the
// kit's static checks) before any script runs. Vite hoists the entry script into <head>, so
// the body holds only the rendered header, main and footer. Any resource hints React emits at the
// top of its output are moved into <head>, with the hero's preloads and the structured data
// (src/seo.ts).
//
// SITE_URL (the address the site is served from, e.g. SITE_URL=https://jdkconsultancy.co.ug npm run
// build) fills in what needs an absolute address: the canonical link, og:url, the share image's
// address, the sitemap and the robots.txt line that points to it. Without it they are left out,
// never guessed.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const site = (process.env.SITE_URL ?? '').trim().replace(/\/+$/, '')
if (site && !/^https:\/\/[^/\s]+$/.test(site)) throw new Error(`prerender: SITE_URL must be https://domain with no path, got "${site}"`)

const { render, head } = await import(pathToFileURL(resolve(dist, '.server/entry-server.js')).href)
const page = resolve(dist, 'index.html')
const html = readFileSync(page, 'utf8')
let body = await render()
const hints = body.match(/^(?:<link [^>]*>)+/)?.[0] ?? ''
body = body.slice(hints.length)
let out = html.replace(/<body([^>]*)>\s*<\/body>/, (_, attrs) => `<body${attrs}>${body}</body>`)
if (out === html) throw new Error('prerender: no empty <body> in dist/index.html')

let extra = `${hints}\n${head(site)}`
if (site) {
  out = out.replace(/\s*<!-- <link rel="canonical"[\s\S]*?-->/, '')
  out = out.replace('<meta property="og:image" content="/share.jpg">', `<meta property="og:image" content="${site}/share.jpg">`)
  extra = `<link rel="canonical" href="${site}/">\n<meta property="og:url" content="${site}/">\n${extra}`
}
out = out.replace('</head>', `${extra}\n</head>`)
writeFileSync(page, out)

// robots.txt: everything may be crawled (the credits page keeps itself out of the index with its
// own robots meta); the sitemap line only when the address is known
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${site}/sitemap.xml\n` : ''}`)
if (site) {
  const day = new Date().toISOString().slice(0, 10)
  writeFileSync(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${site}/</loc><lastmod>${day}</lastmod></url>\n</urlset>\n`,
  )
} else {
  rmSync(resolve(dist, 'sitemap.xml'), { force: true })
}

rmSync(resolve(dist, '.server'), { recursive: true, force: true })
console.log(`prerender: dist/index.html written${site ? `, canonical ${site}/, sitemap.xml` : ' (no SITE_URL: no canonical link or sitemap)'}, robots.txt`)
