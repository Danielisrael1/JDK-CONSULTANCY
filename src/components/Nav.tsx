import { action, nav } from '../content'
import Logo from './Logo'
import { useSection } from '../kit'

// nav-split: the words in the left third, the mark and the name on the page's centre line, the one
// button in the right third. system.js turns it into a sheet on a phone and runs the toggle.
export default function Nav() {
  useSection('nav')
  return (
    <header className="nav nav--split">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Skip to content</a>
        <Logo />
        <nav className="nav__links" aria-label="Main">
          {nav.map((item) => (
            <div className="nav__item" key={item.href}>
              <a className="nav__link" href={item.href}>{item.label}</a>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href={action.href}>{action.label}</a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
