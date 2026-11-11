// Runs after `vite build` and the SSR build: renders the React tree once and writes it into
// dist/index.html, so the shipped page is complete HTML (readable by search engines and the
// kit's static checks) before any script runs. Vite hoists the entry script into <head>, so
// the body holds only the rendered header, main and footer; the resource hints React emits at
// the top of its output (a preload for the hero's photograph) are moved into <head> too.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const { render } = await import(pathToFileURL(resolve(dist, '.server/entry-server.js')).href)
const page = resolve(dist, 'index.html')
const html = readFileSync(page, 'utf8')
let body = await render()
const hints = body.match(/^(?:<link [^>]*>)+/)?.[0] ?? ''
body = body.slice(hints.length)
let out = html.replace(/<body([^>]*)>\s*<\/body>/, (_, attrs) => `<body${attrs}>${body}</body>`)
if (out === html) throw new Error('prerender: no empty <body> in dist/index.html')
if (hints) out = out.replace('</head>', `${hints}\n</head>`)
writeFileSync(page, out)
rmSync(resolve(dist, '.server'), { recursive: true, force: true })
console.log(`prerender: dist/index.html written${hints ? ' (resource hints moved to <head>)' : ''}`)
