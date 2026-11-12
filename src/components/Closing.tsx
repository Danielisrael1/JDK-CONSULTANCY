import { action, closing, firm, meeting } from '../content'
import Arrow from './Arrow'
import Logo from './Logo'
import { useSection } from '../kit'

// footer.closing on the page's inverse ground (footer-dark: the deep olive), one last screen.
// Row 1 is the dealt close (close-type: the firm's own line set large, a line, the one big
// button); row 2 the name set large on the left, three link columns on the right, then the legal row.
export default function Closing() {
  useSection('closing')
  return (
    <footer className="footer closing footer--dark ground-inverse" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">{closing.h2}</h2>
            <p className="t-lead">{closing.line}</p>
          </div>
          <a className="btn btn--primary btn--xl" href={action.href}>{action.label}<Arrow /></a>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <Logo big />
              <p className="footer__lede">{closing.lede}</p>
            </div>
            {closing.columns.map((col, i) => (
              <div className={`span-2 footer__col${i === 0 ? ' start-7' : ''}`} key={col.head}>
                <h3>{col.head}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="span-2 footer__col">
              <h3>{closing.contact}</h3>
              <ul>
                <li><a href={firm.phone.href}>{firm.phone.label}</a></li>
                <li><a href={`mailto:${firm.email}`}>{meeting.write}</a></li>
                <li>{firm.post}</li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>© {firm.year} {firm.legal}</span>
            <a className="credits" href={closing.credits.href}>{closing.credits.label}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
