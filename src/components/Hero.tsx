import type { CSSProperties } from 'react'
import { action, hero } from '../content'
import { photos } from '../photos'
import Pic from './Pic'
import { useSection } from '../kit'

// The dealt film hero: one frame on the wrap's lines fills the first screen, a photograph of people
// at work in it, and the headline, the line and the two buttons stand in a solid box of the page's
// inverse ground (the olive) at its lower left. No play control: the firm has no film. Nothing is
// laid over the photograph to make the words readable; the box is solid.
export default function Hero() {
  useSection('hero')
  const p = photos.hero
  return (
    <section className="hero hero--film" data-enter="" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text hero__in">
          <div className="hero__media hero__fill">
            <Pic photo={p} style={{ '--ly-pos': p.pos } as CSSProperties} fetchPriority="high" />
            <div className="hero__over">
              <div>
                <h1 id="hero-h">{hero.h1}</h1>
                <p className="hero__lead">{hero.lead}</p>
                <div className="btn-row">
                  <a className="btn btn--primary" href={action.href}>{action.label}</a>
                  <a className="btn btn--secondary" href={hero.second.href}>{hero.second.label}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
