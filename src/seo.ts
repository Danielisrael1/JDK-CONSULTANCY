// What search engines read beyond the page itself, built from the same content as the page, so a
// changed phone number or service changes here too. scripts/prerender.mjs puts both into <head>
// of dist/index.html at build time.
//
// SITE_URL is the address the site is served from (https://example.ug, no trailing slash). Until
// the firm has a domain it is empty, and everything that needs an absolute address (the canonical
// link, og:url, the sitemap, the structured data's url and image) is left out rather than guessed.
import { closing, firm, hero, sectors, services } from './content'
import { photos } from './photos'

const description =
  'Strategic planning, operational support and project management for startups, SMEs and NGOs in Uganda, from a management consultancy based in Kampala.'

// schema.org data for the firm: a professional service in Kampala, its three services, the two
// sectors it knows, its phone, email and P.O. box. Nothing the page does not say: no street,
// founding date, staff, ratings or prices.
export function structuredData(siteUrl: string): string {
  const id = siteUrl ? `${siteUrl}/#firm` : '#firm'
  const org: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': id,
    name: firm.name,
    legalName: firm.legal,
    alternateName: firm.short,
    slogan: closing.h2,
    description,
    telephone: firm.phone.href.replace('tel:', ''),
    email: firm.email,
    address: {
      '@type': 'PostalAddress',
      postOfficeBoxNumber: '15906',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
    areaServed: { '@type': 'Country', name: 'Uganda' },
    knowsAbout: [...services.steps.map((s) => s.name), ...sectors.cards.map((c) => c.title)],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: services.h2,
      itemListElement: services.steps.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, description: s.line, provider: { '@id': id } },
      })),
    },
  }
  if (siteUrl) {
    org.url = `${siteUrl}/`
    org.image = `${siteUrl}/share.jpg`
    org.logo = `${siteUrl}/apple-touch-icon.png`
  }
  const graph: Record<string, unknown>[] = [org]
  if (siteUrl) {
    graph.push({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#site`,
      url: `${siteUrl}/`,
      name: firm.name,
      description: hero.lead,
      inLanguage: 'en',
      publisher: { '@id': id },
    })
  }
  // "<" is escaped so no text in the data can close the script element early
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

// The hero's photograph is the largest thing on the first screen (the LCP element): preload it, the
// wide cut from 1024px and the tall cut below, as AVIF. A browser that cannot read AVIF skips these
// and loads the JPEG the <picture> offers it.
export function heroPreloads(): string {
  const p = photos.hero
  const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  const link = (media: string, srcset: string) =>
    `<link rel="preload" as="image" type="image/avif" media="${media}" imagesrcset="${attr(srcset)}" imagesizes="${attr(p.sizes)}" fetchpriority="high">`
  return p.art ? link('(min-width: 1024px)', p.avif) + link(p.art.media, p.art.avif) : link('all', p.avif)
}
