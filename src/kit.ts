import { useEffect } from 'react'

// The design kit (nav sheet, form, hover layer, hero entrance, the dealt moment) is plain JS that
// reads the DOM once. It is loaded only after every section has committed, so hydration never
// sees the kit's DOM changes: the below-the-fold sections are lazy chunks, and a kit mutation
// inside a boundary React had not hydrated yet would be undone when it did. The scripts load in
// document order, since motion.js and layout.js build on system.js.
const KIT = ['/assets/system.js', '/assets/motion/motion.js', '/assets/layout/layout.js']
const SECTIONS = ['nav', 'hero', 'services', 'firm', 'clients', 'meeting', 'closing'] as const
export type Section = (typeof SECTIONS)[number]

const committed = new Set<Section>()
let loaded = false

// The nav link of the section crossing the upper third of the screen carries aria-current, which
// page.css draws as a line under the word.
function markCurrent(): void {
  const pairs = [...document.querySelectorAll<HTMLAnchorElement>('.nav__link[href^="#"]')].flatMap((a) => {
    const target = document.getElementById(a.hash.slice(1))
    return target ? [{ a, target }] : []
  })
  if (!pairs.length) return
  let queued = false
  const mark = () => {
    queued = false
    const line = innerHeight * 0.34
    for (const { a, target } of pairs) {
      const r = target.getBoundingClientRect()
      if (r.top <= line && r.bottom > line) a.setAttribute('aria-current', 'location')
      else a.removeAttribute('aria-current')
    }
  }
  const queue = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(mark)
  }
  addEventListener('scroll', queue, { passive: true })
  addEventListener('resize', queue, { passive: true })
  mark()
}

function loadKit(): void {
  if (loaded) return
  loaded = true
  markCurrent()
  for (const src of KIT) {
    if (document.querySelector(`script[src="${src}"]`)) continue
    const s = document.createElement('script')
    s.type = 'module'
    s.src = src
    s.async = false
    document.body.appendChild(s)
  }
}

// Every section calls this once; the kit loads when the last of them has committed.
export function useSection(name: Section): void {
  useEffect(() => {
    committed.add(name)
    if (SECTIONS.every((s) => committed.has(s))) loadKit()
  }, [name])
}
