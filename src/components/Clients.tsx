import type { CSSProperties } from 'react'
import { clients } from '../content'
import { photos } from '../photos'
import Pic from './Pic'
import { useSection } from '../kit'

// photo-pair: the heading and its lines, then two photographs of one ratio. Nothing under them.
export default function Clients() {
  useSection('clients')
  return (
    <section className="section" id="clients" aria-labelledby="clients-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="clients-h">{clients.h2}</h2>
          <p>{clients.line}</p>
        </div>
        <div className="grid pair">
          {[photos.pairA, photos.pairB].map((p) => (
            <div className="frame frame--photo span-6 pair__photo" key={p.subject}>
              <Pic
                photo={p}
                className="frame__img"
                style={p.pos ? ({ objectPosition: p.pos } as CSSProperties) : undefined}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
