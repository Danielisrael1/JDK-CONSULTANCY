import { firm } from '../content'

// The dealt mark (initial: the name's first letter on a small accent tile) beside the short name,
// the name as plain text after it, as the kit's markup has it.
// The firm's own logo replaces the mark when it arrives. `big` is the footer's version, the name
// set large (footer-dark).
export default function Logo({ big = false }: { big?: boolean }) {
  return (
    <a className={big ? 'footer__mark' : 'nav__logo'} href="#top" aria-label={firm.name}>
      <span className="mark mark--initial" aria-hidden="true">{firm.initial}</span>
      {firm.short}
    </a>
  )
}
