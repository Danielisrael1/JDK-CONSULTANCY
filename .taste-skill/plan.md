# Plan: JDK Consultancy and Project Managers (second build)

The first build (commit 98e66f3) shared too much with the Kibazo Advocates site; the user asked for
something different, then for photographs of African people from Pexels, no big blank parts,
animations and hover effects, and SEO. Everything below was dealt away from both earlier pages.

1. kind: service (a management consultancy; people are hired). page-type service, site-kind other.
2. deal: hero `film` (dealt with --has photo; no film, so no play control: a photograph of people
   at work fills the frame, the words in a solid olive box) · palette `blush-sage-slate`: a cool
   slate ground for the calm of an office and its paperwork (the finance clients) and a deep olive
   for the social-impact and NGO work, the opposite temperature of Kibazo's warm grey and oxblood ·
   type `red-hat` (Red Hat Display / Red Hat Text, sober for finance, plain for startups and NGOs) ·
   radius sharp · nav `nav-split` · footer `footer-dark` · close `close-type` · rhythm
   `surface-pairs` (one surface band: #sectors) · buttons `arrow` · mark `initial` · moments
   `pinned-chapters` in #services and `picture-develops` (film) in #meeting.
   Stack: Vite + React 19 + TypeScript, prerendered to static HTML at build; the kit in public/assets.

Voice: facts only, second person in the contact zone. Third person for the firm.
Never: virtue words, invented clients, figures, people, prices or a response-time promise; the
photographed people are never presented as the firm's staff or clients.

Main action: Request a meeting (#meeting). Secondary in the hero: See the services (#services).

| # | id       | idea                                   | picture (kind)                                                | screens |
|---|----------|----------------------------------------|---------------------------------------------------------------|---------|
| 1 | hero     | consultancy for whom, and where        | three colleagues at a laptop, Lagos (use)                     | 1 |
| 2 | services | the three services, one at a time      | pinned chapters: flip chart, a shop, a meeting (use)          | 2 live; rows at rest |
| 3 | sectors  | the two sectors (surface band)         | two cards: Kampala Road (place), a community meeting (use)    | 1 |
| 4 | meeting  | the form with the phone, email, P.O. box | Kampala across its hills, developing as it scrolls in (place) | 1 (2 on a phone, .g2m) |
| 5 | closing  | the firm's line set large, footer-dark | the big button on the olive screen                            | 1 |

A diagram section (#approach, a still bowtie) was built and dropped: the kit's diagrams lay out at
their real size, so a section-wide panel stood mostly empty.

Why it moves: the hero's entrance · pinned-chapters, the services opening as they are scrolled ·
picture-develops, the contact photograph coming up like a print · hover: buttons, arrows, links,
nav words.

Assumed facts: none. Every photograph is a stand-in (README, "Before this goes live").
