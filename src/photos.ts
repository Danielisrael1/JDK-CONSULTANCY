// The five photographs. Every one is a licensed stand-in from Wikimedia Commons, taken in Kampala
// (credits in the footer line and /credits.html), until the firm supplies its own; the README
// lists each with the photograph to shoot in its place. Alt text is written new: the files' own
// titles name other things. Each is served as AVIF, with the JPEG kept for a browser that cannot
// read one (scripts/images.mjs cuts both from the masters in photos-src/).
export type Photo = {
  src: string
  srcset: string
  avif: string
  sizes: string
  width: number
  height: number
  alt: string
  subject: string
  pos?: string
  posPhone?: string
}

const img = (file: string) => `/assets/img/${file}`
const set = (id: string, ext: 'jpg' | 'avif', widths: number[]) => widths.map((w) => `${img(`photo-${id}-${w}.${ext}`)} ${w}w`).join(', ')
const photo = (id: string, ratio: number, rest: Pick<Photo, 'alt' | 'subject' | 'sizes' | 'pos' | 'posPhone'>, widths = [500, 800, 1256]): Photo => ({
  src: img(`photo-${id}-800.jpg`),
  srcset: set(id, 'jpg', widths),
  avif: set(id, 'avif', widths),
  width: 800,
  height: Math.round(800 / ratio),
  ...rest,
})

// a column of the 12-column grid at each width: full width until 1024, then half the 1280 wrap
const HALF = '(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 96px), (max-width: 1439px) 46vw, 628px'

export const photos = {
  hero: photo('f117488898', 628 / 716, {
    alt: "Office towers of Kampala's business district under a blue sky, seen across a plant nursery in flower",
    subject: 'kampala-towers',
    sizes: HALF,
    pos: '50% 50%',
    posPhone: '50% 42%',
  }, [500, 800, 1056]),
  services: photo('f109616776', 1, {
    alt: 'Office towers on Kampala Road in sunlight, with traffic passing below',
    subject: 'kampala-road-offices',
    sizes: HALF,
    pos: '50% 40%',
  }),
  pairA: photo('f117485966', 4 / 3, {
    alt: "Minibuses and a bus on Kampala Road, between the shops and offices of the city's commercial centre",
    subject: 'kampala-commercial-centre',
    sizes: HALF,
    pos: '50% 60%',
  }),
  pairB: photo('f117486313', 4 / 3, {
    alt: 'Red tiled roofs and apartment blocks among the trees of a Kampala neighbourhood',
    subject: 'kampala-neighbourhood',
    sizes: HALF,
    pos: '50% 70%',
  }),
  meeting: photo('f183583405', 3 / 2, {
    alt: 'Kampala seen across its hills, roofs and trees under a wide sky',
    subject: 'kampala-hills',
    sizes: '(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 40vw, 519px',
    pos: '50% 60%',
  }, [500, 800, 1038]),
} satisfies Record<string, Photo>
