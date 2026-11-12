import { action, firm, meeting } from '../content'
import { photos } from '../photos'
import { useSection } from '../kit'

// booking-form: the words, the P.O. box and the firm's phone and email on the left with a
// photograph of Kampala under them, so the column runs as deep as the form; the form on a panel on
// the right. The photograph is the page's second dealt moment, picture-develops (film look): it
// comes up like a print in the developer tray once, as it reaches the screen. The form's action is
// a mailto to the firm's address: sending opens the visitor's own mail program with the fields
// filled in. system.js runs the errors under their fields and the status line; it shows a success
// line only for a real form endpoint (data-endpoint).
export default function Meeting() {
  useSection('meeting')
  return (
    <section className="section g2m" id="meeting" aria-labelledby="meeting-h">
      <div className="wrap grid grid--top">
        <div className="meet__words">
          <div className="section-head">
            <h2 id="meeting-h">{meeting.h2}</h2>
            <p>{meeting.line}</p>
          </div>
          <address className="meet__where">
            <span>{firm.post}</span>
            <a className="link" href={firm.phone.href} aria-label={`${meeting.call}: ${firm.phone.label}`}>{firm.phone.label}</a>
            <a className="link" href={`mailto:${firm.email}`}>{meeting.write}</a>
          </address>
          <figure className="meet__photo" data-moment="picture-develops">
            <img
              src={photos.meeting.src}
              srcSet={photos.meeting.srcset}
              sizes={photos.meeting.sizes}
              width={photos.meeting.width}
              height={photos.meeting.height}
              alt={photos.meeting.alt}
              loading="lazy"
              decoding="async"
              data-source="stand-in"
              data-subject={photos.meeting.subject}
            />
          </figure>
        </div>
        <div className="meet__panel">
          <form className="form" action={`mailto:${firm.email}`} method="post" encType="text/plain" data-endpoint="" noValidate>
            {meeting.fields.map((f) => (
              <div className="field field--full" key={f.id}>
                <label htmlFor={`f-${f.id}`}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea id={`f-${f.id}`} name={f.id} rows={5} required aria-describedby={`f-${f.id}-err`} />
                ) : (
                  <input
                    id={`f-${f.id}`}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    inputMode={f.type === 'email' ? 'email' : undefined}
                    required
                    aria-describedby={`f-${f.id}-err`}
                  />
                )}
                <p className="field__error" id={`f-${f.id}-err`} hidden>{f.error}</p>
              </div>
            ))}
            <div className="btn-row">
              <button className="btn btn--primary" type="submit">{action.label}</button>
            </div>
            <p className="form__status" role="status" data-form-status="" />
          </form>
        </div>
      </div>
    </section>
  )
}
