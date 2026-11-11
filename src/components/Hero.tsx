import type { CSSProperties } from 'react'
import { action, hero } from '../content'
import { photos } from '../photos'
import Pic from './Pic'
import { useSection } from '../kit'

// The dealt split hero: the words on five columns, the photograph on the right six, both whole on
// the first screen. No float card: the firm has given no live fact to put on one.
export default function Hero() {
  useSection('hero')
  const p = photos.hero
  return (
    <section className="hero hero--split" data-enter="" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            <p className="hero__kicker"><span className="dot" aria-hidden="true" />{hero.kicker}</p>
            <h1 id="hero-h">{hero.h1}</h1>
            <p className="hero__lead">{hero.lead}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={action.href}>{action.label}</a>
              <a className="btn btn--secondary" href={hero.second.href}>{hero.second.label}</a>
            </div>
          </div>
          <div className="hero__media span-6 start-7">
            <Pic
              photo={p}
              style={{ '--ly-pos': p.pos, '--ly-pos-phone': p.posPhone } as CSSProperties}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
