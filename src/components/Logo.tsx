import { firm } from '../content'

// The dealt mark (stack) beside the short name; the firm's own SVG replaces the span when it arrives.
export default function Logo() {
  return (
    <a className="nav__logo" href="#top" aria-label={firm.name}>
      <span className="mark" data-mark="stack" aria-hidden="true" />
      <span className="nav__name">{firm.short}</span>
    </a>
  )
}
