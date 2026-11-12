import { sectors } from '../content'
import { photos } from '../photos'
import Pic from './Pic'
import { useSection } from '../kit'

// The two sectors as the kit's feature cards (a hairline box one step off the band, the title and
// line, then a panel holding the photograph that runs to the card's foot), on the page's one
// surface band (surface-pairs). The panels are as tall as the screen allows, so the two photographs fill it.
export default function Sectors() {
  useSection('sectors')
  return (
    <section className="section ground-surface" id="sectors" aria-labelledby="sectors-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="sectors-h">
            {sectors.h2} <span className="muted">{sectors.aside}</span>
          </h2>
        </div>
        <div className="grid sectors__grid fill">
          {sectors.cards.map((card) => {
            const p = photos[card.photo]
            return (
              <article className="card card--row span-6" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.line}</p>
                <div className="panel">
                  <Pic
                    photo={p}
                    className="frame__img"
                    style={p.pos ? { objectPosition: p.pos } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
