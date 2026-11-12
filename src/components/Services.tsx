import type { CSSProperties } from 'react'
import { services } from '../content'
import { photos } from '../photos'
import { useSection } from '../kit'

// The dealt moment, pinned-chapters (the kit's moments/pinned-chapters, mounted by system.js from
// data-moment): from 1024px on a screen 640px or taller the section holds for one screen of scroll
// while the three services open one at a time and the frame on the right changes to each one's
// photograph. Otherwise, under reduced motion and without script, every service is a row with its
// photograph beside it (under 640px, under it). The script moves each <figure> into the shared
// frame and back, and wraps each line in a span; nothing here re-renders, so React never sees it.
// The photographs are plain <img>s: the moment's styles target `.mo-pc__visual > img`.
export default function Services() {
  useSection('services')
  return (
    <section
      className="section"
      id="services"
      style={{ '--h': 2 } as CSSProperties}
      data-moment="pinned-chapters"
      aria-labelledby="services-h"
    >
      <div className="wrap mo-pc__grid">
        <div className="mo-pc__text">
          <h2 id="services-h">{services.h2}</h2>
          <ol className="mo-pc__steps">
            {services.steps.map((step) => {
              const p = photos[step.photo]
              return (
                <li className="mo-pc__step" key={step.name}>
                  <h3>{step.name}</h3>
                  <p>{step.line}</p>
                  <figure className="mo-pc__visual">
                    <img
                      src={p.src}
                      srcSet={p.srcset}
                      sizes={p.sizes}
                      width={p.width}
                      height={p.height}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      data-source="stand-in"
                      data-subject={p.subject}
                    />
                  </figure>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="mo-pc__visuals frame" />
      </div>
    </section>
  )
}
