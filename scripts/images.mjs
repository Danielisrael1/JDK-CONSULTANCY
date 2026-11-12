// Encodes the page's photographs: npm run images.
// The masters are in photos-src/ (photo-<id>.jpg, never served): f<n> from Wikimedia Commons, p<n>
// from Pexels. Each photograph is cut to the ratio of the frame it sits in (the crop is a share of
// the master: left, top, width, with the height following from the ratio) and written to
// public/assets/img at each width as an AVIF and a JPEG: the page serves the AVIF and keeps the
// JPEG for a browser that cannot read one (src/components/Pic.tsx). The pinned chapters serve the
// JPEG alone, since the kit's moment styles its <img> directly (src/components/Services.tsx).
// Every file is made from the master, so running it twice gives the same files. A master can be
// cut twice under two names (the hero: a wide cut for desktop, a tall one for tablets and phones).
// To swap a photograph: put the new master in photos-src/, change its row here and its entry in
// src/photos.ts.
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const SRC = resolve('photos-src')
const OUT = resolve('public/assets/img')
const AVIF = { quality: 50, effort: 7, chromaSubsampling: '4:2:0' }
const JPEG = { quality: 76, mozjpeg: true }

// ratio is width / height of the crop; left, top and width are shares of the master; name is the
// output's name when it differs from the master's id; jpeg overrides the JPEG quality for one crop
const CROPS = [
  { id: 'p3894377', ratio: 1280 / 804, left: 0, top: 0.276, width: 1, widths: [800, 1280, 1920] },              // hero, desktop: the woman at her desk, the screen at the lower left under the words' box
  { id: 'p3894377', name: 'p3894377-tall', ratio: 3 / 5, left: 0.37, top: 0.28, width: 0.6, widths: [480, 720, 960] }, // hero, tablet and phone: her face in the top third, above the box
  { id: 'p7414040', ratio: 4 / 3, left: 0.111, top: 0, width: 0.889, widths: [480, 800, 1256] },               // services: strategic planning
  { id: 'p30848031', ratio: 4 / 3, left: 0, top: 0.27, width: 1, widths: [480, 800, 1256] },                    // services: operational support
  { id: 'p30688592', ratio: 4 / 3, left: 0.0555, top: 0, width: 0.889, widths: [480, 800, 1256] },             // services: project management
  { id: 'f109616776', ratio: 4 / 3, left: 0.06, top: 0.02, width: 0.92, widths: [500, 800, 1256] },            // sectors: Kampala Road (finance)
  { id: 'p27471164', ratio: 4 / 3, left: 0.0555, top: 0, width: 0.889, widths: [500, 800, 1256], jpeg: 66 }, // sectors: the community meeting (fine detail: a lower JPEG quality keeps it under 250 KB)
  { id: 'f183583405', ratio: 3 / 2, left: 0.3, top: 0, width: 0.56, widths: [500, 800, 1038] },                // contact: the city across its hills
]

const kb = (n) => `${Math.round(n / 1024)} KB`
mkdirSync(OUT, { recursive: true })
for (const c of CROPS) {
  const name = c.name ?? c.id
  const master = resolve(SRC, `photo-${c.id}.jpg`)
  const meta = await sharp(master).metadata()
  let w = Math.round(meta.width * c.width)
  let h = Math.round(w / c.ratio)
  const top = Math.round(meta.height * c.top)
  if (top + h > meta.height) { h = meta.height - top; w = Math.round(h * c.ratio) }
  const left = Math.min(Math.round(meta.width * c.left), meta.width - w)
  for (const width of c.widths) {
    if (width > w) throw new Error(`images: photo-${name} crop is ${w}px wide, narrower than ${width}`)
    const cut = () => sharp(master).rotate().extract({ left, top, width: w, height: h }).resize({ width })
    const a = await cut().avif(AVIF).toBuffer()
    const j = await cut().jpeg(c.jpeg ? { ...JPEG, quality: c.jpeg } : JPEG).toBuffer()
    writeFileSync(resolve(OUT, `photo-${name}-${width}.avif`), a)
    writeFileSync(resolve(OUT, `photo-${name}-${width}.jpg`), j)
    console.log(`photo-${name}-${width}  ${width}x${Math.round(width / c.ratio)}  avif ${kb(a.length).padStart(7)}  jpeg ${kb(j.length).padStart(7)}`)
  }
}
