// The seven photographs, every one a licensed stand-in until the firm supplies its own (credits in
// the footer line and /credits.html; the README lists each with the photograph to take in its
// place). Five are from Pexels: two meetings in Lagos offices (Ninthgrid), a shopkeeper (Kalz
// Michael, a Kampala photographer), a presenter at a flip chart (RDNE Stock project) and a community
// meeting (Speak Media Uganda). Two are from Wikimedia Commons, both taken in Kampala. Alt text is written new and says what is in the frame, never who the people are: the
// page does not present them as the firm's staff or clients. scripts/images.mjs cuts every file
// from the masters in photos-src/.
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
  // a second cut for narrow screens, served by <source media> ahead of the main one
  art?: { media: string; srcset: string; avif: string }
}

// a photograph served as a plain <img> with a JPEG srcset (the pinned chapters: the kit's moment
// styles `.mo-pc__visual > img`, so no <picture> may stand between them)
export type Plain = Omit<Photo, 'avif' | 'art'>

const img = (file: string) => `/assets/img/${file}`
const set = (id: string, ext: 'jpg' | 'avif', widths: number[]) => widths.map((w) => `${img(`photo-${id}-${w}.${ext}`)} ${w}w`).join(', ')
const photo = (id: string, ratio: number, rest: Pick<Photo, 'alt' | 'subject' | 'sizes' | 'pos' | 'art'>, widths = [500, 800, 1256]): Photo => ({
  src: img(`photo-${id}-800.jpg`),
  srcset: set(id, 'jpg', widths),
  avif: set(id, 'avif', widths),
  width: 800,
  height: Math.round(800 / ratio),
  ...rest,
})
const plain = (
  id: string,
  rest: Pick<Plain, 'alt' | 'subject'> & { ratio?: number; widths?: number[]; sizes?: string },
): Plain => {
  const { ratio = 4 / 3, widths = [480, 800, 1256], sizes, ...words } = rest
  return {
    src: img(`photo-${id}-800.jpg`),
    srcset: set(id, 'jpg', widths),
    // by default the chapters' frame: half the 1280 wrap from 640 (live or in rows), the full width
    // on a phone
    sizes: sizes ?? '(max-width: 639px) calc(100vw - 48px), (max-width: 1439px) 46vw, 628px',
    width: 800,
    height: Math.round(800 / ratio),
    ...words,
  }
}

// a card's panel in a pair: full width on a phone; on a tablet the panel stands far taller than the
// file's 4:3 (the pair fills a tall screen), so it asks for a wider file there and the cover crop
// never blows one up; half the wrap from 1024
const HALF = '(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 140vw, (max-width: 1439px) 46vw, 628px'

export const photos = {
  // the film frame: 1280 x 804 at 1440, the whole wrap less the words' box; under 1024 it stands
  // taller than wide, so the tall cut of the same photograph takes over there
  hero: photo('p30689114', 1280 / 804, {
    alt: 'Three colleagues standing together in an office in Lagos, looking at a laptop one of them holds',
    subject: 'team-at-laptop',
    sizes: '(max-width: 1023px) calc(100vw - 32px), (max-width: 1439px) calc(100vw - 160px), 1280px',
    pos: '50% 40%',
    art: {
      media: '(max-width: 1023px)',
      srcset: set('p30689114-tall', 'jpg', [480, 720, 960]),
      avif: set('p30689114-tall', 'avif', [480, 720, 960]),
    },
  }, [800, 1280, 1920]),
  strategy: plain('p7414040', {
    alt: 'A woman in a navy blazer pointing to a mind map on a flip chart, with budget at its centre',
    subject: 'planning-session',
  }),
  operations: plain('p30848031', {
    alt: 'A shopkeeper standing in his shop among shelves of goods and strings of packets',
    subject: 'small-shop',
  }),
  projects: plain('p30688592', {
    alt: 'Five people in a meeting round a white table in a bright office in Lagos, with laptops and water bottles',
    subject: 'project-meeting',
  }),
  finance: photo('f109616776', 4 / 3, {
    alt: 'Office towers on Kampala Road in sunlight, with traffic and a cyclist passing below',
    subject: 'kampala-road-offices',
    sizes: HALF,
    pos: '50% 50%',
  }),
  social: photo('p27471164', 4 / 3, {
    alt: 'A community meeting outdoors: adults and children seated on the ground under a large tree, listening to a speaker',
    subject: 'community-meeting',
    sizes: HALF,
    pos: '50% 50%',
  }),
  // the contact section's photograph develops as it comes on screen (the kit's picture-develops,
  // which styles `[data-moment] > img`: a plain <img> again)
  meeting: plain('f183583405', {
    alt: 'Kampala seen across its hills, roofs and trees under a wide sky',
    subject: 'kampala-hills',
    ratio: 3 / 2,
    widths: [500, 800, 1038],
    // the frame stands taller than the file's 3:2 on a phone and a tablet (it runs down to the
    // form's foot), so those widths ask for a wider file and the cover crop never blows one up
    sizes: '(max-width: 639px) 160vw, (max-width: 1023px) 110vw, (max-width: 1439px) 46vw, 628px',
  }),
} satisfies Record<string, Photo | Plain>
