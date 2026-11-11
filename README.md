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

Node 22 or newer.

## How it is built

- Vite 7, React 19, TypeScript. `npm run build` renders the React tree once at build time
  (`scripts/prerender.mjs`), so `dist/index.html` is complete HTML before any script runs.
- Every word on the page is in `src/content.ts`. The photographs are listed in `src/photos.ts`.
- One component per section in `src/components/`: `Hero`, `Services`, `Firm`, `Clients`,
  `Meeting` (the contact form), `Closing` (the close and the footer).
- The layout, type, buttons and motion come from a design kit copied into `public/assets`
  (MIT, licence in `public/assets/LICENSE`). `src/page.css` holds the few rules that are this
  page's own. `src/kit.ts` loads the kit's scripts after React has hydrated.

## Design

- Palette: a sand ground (`#e6dbc7`) with one cobalt ink (`#062b8a`) for text, buttons and the
  one full-width band. Two colours, no gradients, no shadows.
- Type: Hanken Grotesk for everything, headlines at weight 400 with tight tracking.
- Motion: the hero's words arrive once on load, the firm's statement lights up word by word as it
  is scrolled through, and links, buttons and nav words answer the pointer. Nothing else moves, and
  all of it rests under `prefers-reduced-motion`.

## Where the content comes from

| Content | Source | Confirmed by the firm |
| --- | --- | --- |
| Name, Kampala | Uganda Innovation & Business Exchange listing (ibx.go.ug) | No |
| The three services, the client types, the two sectors, "Turning ideas into results" | The same listing. Its description is a template shared with other firms on that site, so treat it as a draft | No |
| Phone 0782 609 130, the email address, P.O. Box 15906 Kampala | Supplied for this site | Supplied |
| Photographs | Wikimedia Commons, all taken in Kampala (stand-ins) | No |

Nothing else is stated on the page: no people, prices, clients, figures or street address.

## Before this goes live

1. **The firm confirms the copy** in `src/content.ts`: what it does, who for, and the sectors.
2. **A logo.** The mark beside the name is a generic one from the kit. Replace it in
   `src/components/Logo.tsx` and `public/favicon.svg`.
3. **The firm's own photographs.** All five are licensed stand-ins of Kampala, credited at
   `/credits.html`. To swap one: put the new master in `photos-src/`, change its row in
   `scripts/images.mjs` and its entry in `src/photos.ts`, then `npm run images`.

   | Slot | Stand-in now | Photograph to take |
   | --- | --- | --- |
   | Hero | Office towers across a plant nursery | The team at work, or the office |
   | Services | Office towers on Kampala Road | A planning session or a workshop with a client |
   | Clients, left | Kampala Road and its traffic | A client's business the firm has worked with |
   | Clients, right | Roofs among trees | An NGO project the firm has worked with |
   | Contact | The city across its hills | The office from the street, or the meeting room |

4. **A form service.** The form's action is a `mailto:` to the firm's address, so sending opens
   the visitor's own mail program. For a form that sends by itself, put the endpoint of a form
   service in `data-endpoint` on the form in `src/components/Meeting.tsx`.
5. **A domain.** Then fill in the `canonical` link that is commented out in `index.html`, and make
   `og:image` an absolute URL.
6. **A street address**, if the firm wants visitors: the page gives the P.O. box and the city only.
