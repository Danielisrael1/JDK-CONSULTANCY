// Every word on the page, in one place, so the firm can change it without touching markup.
//
// Where the words come from: the firm's listing on the Uganda Innovation & Business Exchange
// (ibx.go.ug), which is the only public description of it. That listing gives the name, Kampala,
// the three services, the three kinds of client, the two sectors and the line "Turning ideas into
// results". The firm has confirmed none of it yet: see the README's "Before this goes live" list.
// The phone number, the email address and the P.O. box were supplied for this site. Nothing else is stated: no
// people, prices, street, clients or figures.

export const firm = {
  // the short name beside the mark; the registered name is used in the hero, the statement and the legal row
  short: 'JDK Consultancy',
  name: 'JDK Consultancy and Project Managers',
  legal: 'JDK Consultancy and Project Managers Limited',
  place: 'Kampala, Uganda',
  // the firm's own contacts, as supplied
  email: 'ssenyondo.abdulkhareem@gmail.com',
  phone: { label: '0782 609 130', href: 'tel:+256782609130' },
  year: 2026,
}

export const action = { label: 'Request a meeting', href: '#meeting' }

// in the order the sections come down the page
export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Firm', href: '#firm' },
  { label: 'Clients', href: '#clients' },
]

export const hero = {
  kicker: 'Kampala, Uganda',
  h1: 'Consultancy for startups, SMEs and NGOs',
  lead: 'JDK Consultancy and Project Managers plans strategy, supports operations and manages projects for growing businesses and nonprofits.',
  second: { label: 'See the services', href: '#services' },
}

export const services = {
  h2: 'Advisory services',
  line: 'Management and strategy advice in three kinds of work.',
  rows: [
    { name: 'Strategic planning', line: 'Setting where the organisation is going and the steps that get it there.' },
    { name: 'Operational support', line: 'Refining workflows and internal processes as operations scale.' },
    { name: 'Project management', line: 'Planning a project and running it from the first idea to the result.' },
  ],
  link: { label: 'See the clients', href: '#clients' },
}

export const statement = {
  label: 'The firm',
  // one statement of 12 to 40 words; the strong part is the last to light up
  before: 'JDK Consultancy and Project Managers works with startups, SMEs and NGOs in Kampala to build capacity, improve internal processes and reach ',
  strong: 'sustainable growth',
  after: '.',
}

export const clients = {
  h2: 'The consultancy\u2019s clients',
  line: 'Startups, small and medium enterprises and NGOs. The work is primarily in finance, banking and fintech, and in social impact, civic tech and nonprofit organisations.',
}

export const meeting = {
  h2: 'Contact the firm',
  line: 'Write what your organisation does and what you want to work on. Your request goes to the firm by email.',
  where: 'P.O. Box 15906, Kampala, Uganda',
  call: 'Call the firm',
  write: 'Email the firm',
  fields: [
    { id: 'name', label: 'Name', type: 'text', autoComplete: 'name', error: 'Write your name.' },
    { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', error: 'Write an email address with an @, like name@example.com.' },
    { id: 'organisation', label: 'Organisation', type: 'text', autoComplete: 'organization', error: 'Write the name of your business or organisation.' },
    { id: 'work', label: 'What you want to work on', type: 'textarea', autoComplete: 'off', error: 'Write a line on what you want to work on.' },
  ],
}

export const closing = {
  // the firm's own line: the page's one brand line, with the facts under it
  h2: 'Turning ideas into results',
  line: 'Strategic planning, operational support and project management, from Kampala.',
  lede: 'Management consultants in Kampala, Uganda.',
  columns: [
    { head: 'Services', links: [{ label: 'Advisory services', href: '#services' }] },
    { head: 'Firm', links: [{ label: 'The firm', href: '#firm' }] },
    { head: 'Clients', links: [{ label: 'Clients and sectors', href: '#clients' }] },
  ],
  contact: 'Contact',
  credits: { label: 'Photographs via Wikimedia Commons', href: '/credits.html' },
}
