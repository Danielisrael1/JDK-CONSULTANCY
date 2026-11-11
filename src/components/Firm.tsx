import { statement } from '../content'
import { useSection } from '../kit'

// The firm in one statement, on the page's one cobalt band. The kit's word-highlight moment (system.js mounts it from
// data-moment) turns it from half ink to full ink word by word as it crosses the middle of the
// screen; without script, or under reduced motion, every word is ink.
export default function Firm() {
  useSection('firm')
  return (
    <section className="section statement ground-inverse" id="firm" data-moment="word-highlight" aria-label={statement.label}>
      <div className="wrap">
        <p className="t-label">{statement.label}</p>
        <p className="mo-wh__text">
          {statement.before}<strong>{statement.strong}</strong>{statement.after}
        </p>
      </div>
    </section>
  )
}
