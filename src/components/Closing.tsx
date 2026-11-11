import { action, closing, firm, meeting } from '../content'
import Arrow from './Arrow'
import Logo from './Logo'
import { useSection } from '../kit'

// footer.closing: row 1 the dealt close (close-type: the firm's own line and the one big button),
// row 2 the columns and the legal row.
export default function Closing() {
  useSection('closing')
  return (
    <footer className="footer closing" id="contact" aria-labelledby="close-h">
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
              <Logo />
              <p className="footer__lede">{closing.lede}</p>
            </div>
            {closing.columns.map((col) => (
              <div className="span-2 footer__col" key={col.head}>
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
