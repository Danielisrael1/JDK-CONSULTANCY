// Encodes the page's photographs: npm run images.
// The masters are in photos-src/ (photo-<id>.jpg, 2400px wide, never served). Each photograph is
// cut to the ratio of the frame it sits in (the crop is a share of the master: left, top, width,
// with the height following from the ratio) and written to public/assets/img at each width as an
// AVIF and a JPEG: the page serves the AVIF and keeps the JPEG for a browser that cannot read one
// (src/components/Pic.tsx). Every file is made from the master, so running it twice gives the
// same files. To swap a photograph: put the new master in photos-src/, change its row here and
// its entry in src/photos.ts.
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const SRC = resolve('photos-src')
const OUT = resolve('public/assets/img')
const AVIF = { quality: 50, effort: 7, chromaSubsampling: '4:2:0' }
const JPEG = { quality: 76, mozjpeg: true }

// ratio is width / height of the crop; left, top and width are shares of the master
const CROPS = [
  { id: 'f117488898', ratio: 628 / 716, left: 0.02, top: 0.27, width: 0.44, widths: [500, 800, 1056] },  // hero: the towers over the plant nursery
  { id: 'f109616776', ratio: 1, left: 0.33, top: 0, width: 0.6, widths: [500, 800, 1256] },             // services: the office towers on Kampala Road
  { id: 'f117485966', ratio: 4 / 3, left: 0.0, top: 0, width: 0.885, widths: [500, 800, 1256] },        // clients: Kampala Road and its traffic
  { id: 'f117486313', ratio: 4 / 3, left: 0.16, top: 0.03, width: 0.82, widths: [500, 800, 1256] },     // clients: roofs among the trees
  { id: 'f183583405', ratio: 3 / 2, left: 0.3, top: 0, width: 0.56, widths: [500, 800, 1038] },         // contact: the city across its hills
]

const kb = (n) => `${Math.round(n / 1024)} KB`
mkdirSync(OUT, { recursive: true })
for (const c of CROPS) {
  const master = resolve(SRC, `photo-${c.id}.jpg`)
  const meta = await sharp(master).metadata()
  let w = Math.round(meta.width * c.width)
  let h = Math.round(w / c.ratio)
  const top = Math.round(meta.height * c.top)
  if (top + h > meta.height) { h = meta.height - top; w = Math.round(h * c.ratio) }
  const left = Math.min(Math.round(meta.width * c.left), meta.width - w)
  for (const width of c.widths) {
    if (width > w) throw new Error(`images: photo-${c.id} crop is ${w}px wide, narrower than ${width}`)
    const cut = () => sharp(master).rotate().extract({ left, top, width: w, height: h }).resize({ width })
    const a = await cut().avif(AVIF).toBuffer()
    const j = await cut().jpeg(JPEG).toBuffer()
    writeFileSync(resolve(OUT, `photo-${c.id}-${width}.avif`), a)
    writeFileSync(resolve(OUT, `photo-${c.id}-${width}.jpg`), j)
    console.log(`photo-${c.id}-${width}  ${width}x${Math.round(width / c.ratio)}  avif ${kb(a.length).padStart(7)}  jpeg ${kb(j.length).padStart(7)}`)
  }
}
