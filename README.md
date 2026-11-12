# JDK Consultancy and Project Managers: website

A one-page site for JDK Consultancy and Project Managers Limited, a management consultancy in
Kampala, Uganda. It is a pitch build: the design and structure are finished, but most of the
content has not been confirmed by the firm yet (see "Before this goes live").

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/, prerendered to plain HTML
npm run preview    # serve dist/
npm run typecheck
npm run images     # re-cut the photographs from photos-src/ (only after changing one)
```

Node 22 or newer. Once the site has a domain, build with it so search engines get the full set of
tags (see "Search"):

```bash
SITE_URL=https://the-firms-domain npm run build
```

## How it is built

- Vite 7, React 19, TypeScript. `npm run build` renders the React tree once at build time
  (`scripts/prerender.mjs`), so `dist/index.html` is complete HTML before any script runs.
- Every word on the page is in `src/content.ts`. The photographs are listed in `src/photos.ts`.
- One component per section in `src/components/`: `Hero`, `Services`, `Sectors`, `Meeting` (the
  contact form), `Closing` (the close and the footer).
- The layout, type, buttons and motion come from a design kit copied into `public/assets`
  (MIT, licence in `public/assets/LICENSE`). `src/page.css` holds the few rules that are this
  page's own. `src/kit.ts` loads the kit's scripts after React has hydrated.
- `src/seo.ts` builds the structured data and the hero's preloads from the same content as the
  page; `scripts/prerender.mjs` puts them in `<head>` and writes `robots.txt` and `sitemap.xml`.

## Design

Built to share nothing with the Kibazo Advocates site that came from the same kit: cool where that
one is warm, sans where it is serif, a framed photograph instead of a full-bleed one, a dark close
instead of a photograph.

- Palette: a cool slate ground (`#a6b3bc`), near-black ink (`#1c1c1c`) and one deep olive
  (`#2c3620`) for the buttons, the hero's box and the closing screen. Slate reads as the calm of an
  office and its paperwork, for the finance clients; the olive is an earthy, grounded colour for
  the social-impact and NGO work. No gradients, no shadows.
- Type: Red Hat Display for headings, Red Hat Text for everything else, headlines at weight 400.
  A neo-grotesk that is sober enough for finance and plain enough for a startup or an NGO.
- Layout: the name in the middle of the bar with the section words on the left; the first screen
  one framed photograph with the headline in a solid olive box; every section fills its screen
  with photographs, a form or type, with no bare ground.
- Motion: the hero's words arrive once on load; the three services hold on screen while they open
  one at a time and the photograph beside them changes; the contact photograph develops like a
  print as it comes into view; buttons step and press, their arrows slide, links draw their
  underline and the nav words answer the pointer. All of it rests under `prefers-reduced-motion`.

## Where the content comes from

| Content | Source | Confirmed by the firm |
| --- | --- | --- |
| Name, Kampala | Uganda Innovation & Business Exchange listing (ibx.go.ug) | No |
| The three services, the client types, the two sectors, "Turning ideas into results" | The same listing. Its description is a template shared with other firms on that site, so treat it as a draft | No |
| Phone 0782 609 130, the email address, P.O. Box 15906 Kampala | Supplied for this site | Supplied |
| Photographs | Pexels and Wikimedia Commons (stand-ins), credited at `/credits.html` | No |

Nothing else is stated on the page: no staff, prices, clients, figures or street address. The
photographs of people are stock: the page never says they are the firm's staff or clients, and
the credits page says they are not.

## Search

In place now: a title and description written for search, Open Graph and Twitter tags with a
1200 by 630 share image (`public/share.jpg`, cut from the hero), schema.org data for the firm as a
professional service (name, the three services, the two sectors, phone, email, P.O. box, Uganda as
the area served), `robots.txt`, a favicon and a home-screen icon, alt text on every photograph,
one `h1` and a heading per section, and a fast page (0.5 s to the largest picture on the kit's
CPU-throttled test, no layout shift, under 500 KB on a phone).

Needs the domain: build with `SITE_URL` (above) and the build adds the canonical link, `og:url`,
an absolute address for the share image, the site's address in the structured data and a
`sitemap.xml` listed in `robots.txt`. Then add the site to Google Search Console and submit the
sitemap there, and create a Google Business Profile for the firm, which is what puts a Kampala
consultancy on Maps and in local results.

## Before this goes live

1. **The firm confirms the copy** in `src/content.ts`: what it does, who for, and the sectors.
2. **A logo.** The J beside the name is the kit's initial mark. Replace it in
   `src/components/Logo.tsx`, `public/favicon.svg` and `public/apple-touch-icon.png`.
3. **The firm's own photographs.** All seven are licensed stand-ins. To swap one: put the new
   master in `photos-src/`, change its row in `scripts/images.mjs` and its entry in
   `src/photos.ts`, then `npm run images`; cut a new `public/share.jpg` if the hero changes.

   | Slot | Stand-in now | Photograph to take |
   | --- | --- | --- |
   | Hero | Three colleagues at a laptop, Lagos (Ninthgrid, Pexels) | The team at work |
   | Strategic planning | A presenter at a flip chart (RDNE Stock project, Pexels) | A planning session with a client |
   | Operational support | A shopkeeper in his shop (Kalz Michael, Pexels) | A client's business the firm has supported |
   | Project management | A meeting round a table, Lagos (Ninthgrid, Pexels) | A project meeting |
   | Finance sector | Office towers on Kampala Road (Gachangi, Commons) | A finance or fintech client, with permission |
   | Social impact sector | A community meeting under a tree (Speak Media Uganda, Pexels) | An NGO project the firm has worked on |
   | Contact | Kampala across its hills (Dr. S-mon, Commons) | The office from the street, or the meeting room |

4. **A form service.** The form's action is a `mailto:` to the firm's address, so sending opens
   the visitor's own mail program. For a form that sends by itself, put the endpoint of a form
   service in `data-endpoint` on the form in `src/components/Meeting.tsx`.
5. **A domain**, then build with `SITE_URL` (see "Search").
6. **A street address**, if the firm wants visitors: the page gives the P.O. box and the city only.
