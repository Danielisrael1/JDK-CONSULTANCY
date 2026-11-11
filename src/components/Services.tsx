import type { CSSProperties } from 'react'
import { services } from '../content'
import { photos } from '../photos'
import Pic from './Pic'
import { useSection } from '../kit'

// services-list: the three services as ruled rows beside one photograph. No prices: the firm has
// given none, so the rows carry a name and a line only.
export default function Services() {
  useSection('services')
  const p = photos.services
  return (
    <section className="section g2m" id="services" aria-labelledby="services-h">
      <div className="wrap grid grid--top">
        <div className="span-5">
          <div className="section-head">
            <h2 id="services-h">{services.h2}</h2>
            <p>{services.line}</p>
          </div>
          <ul className="rows">
            {services.rows.map((row) => (
              <li key={row.name}>
                <span className="rows__name">{row.name}</span>
                <p>{row.line}</p>
              </li>
            ))}
          </ul>
          <p className="svc__more"><a className="link" href={services.link.href}>{services.link.label}</a></p>
        </div>
        <div className="frame frame--photo span-6 start-7 svc__photo">
          <Pic
            photo={p}
            className="frame__img"
            style={p.pos ? ({ objectPosition: p.pos } as CSSProperties) : undefined}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
