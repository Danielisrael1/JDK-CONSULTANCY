// Every word on the page, in one place, so the firm can change it without touching markup.
//
// Where the words come from: the firm's listing on the Uganda Innovation & Business Exchange
// (ibx.go.ug), which is the only public description of it. That listing gives the name, Kampala,
// the three services, the three kinds of client, the two sectors and the line "Turning ideas into
// results". The firm has confirmed none of it yet: see the README's "Before this goes live" list.
// The phone number, the email address and the P.O. box were supplied for this site. Nothing else
// is stated: no people, prices, street, clients or figures.

export const firm = {
  // the short name beside the mark; the registered name is used in the lead and the legal row
  short: 'JDK Consultancy',
  initial: 'J',
  name: 'JDK Consultancy and Project Managers',
  legal: 'JDK Consultancy and Project Managers Limited',
  // the firm's own contacts, as supplied
  email: 'ssenyondo.abdulkhareem@gmail.com',
  phone: { label: '0782 609 130', href: 'tel:+256782609130' },
  post: 'P.O. Box 15906, Kampala, Uganda',
  year: 2026,
}

export const action = { label: 'Request a meeting', href: '#meeting' }

// in the order the sections come down the page
export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Contact', href: '#meeting' },
]

export const hero = {
  h1: 'Consultancy for startups, SMEs and NGOs',
  lead: 'Strategic planning, operational support and project management for growing businesses and nonprofits, from Kampala.',
  second: { label: 'See the services', href: '#services' },
}

// the three services, opened one at a time beside one frame as the page is scrolled
export const services = {
  h2: 'Three advisory services',
  steps: [
    {
      name: 'Strategic planning',
      line: 'Setting out where the organisation is going and the steps that get it there.',
      photo: 'strategy',
    },
    {
      name: 'Operational support',
      line: 'Refining the workflows and internal processes a team runs every day, as operations grow.',
      photo: 'operations',
    },
    {
      name: 'Project management',
      line: 'Planning a project, then running it from the first idea to the finished result.',
      photo: 'projects',
    },
  ],
} as const

export const sectors = {
  h2: 'Services for two sectors.',
  // the grey second half of the heading: its own sentence
  aside: 'Most of the work is in finance and in social impact.',
  cards: [
    {
      title: 'Finance, banking and fintech',
      line: 'For banks, financial firms and the startups building financial technology.',
      photo: 'finance',
    },
    {
      title: 'Social impact, civic tech and nonprofits',
      line: 'For NGOs, nonprofit organisations and civic technology projects.',
      photo: 'social',
    },
  ],
} as const

export const meeting = {
  h2: 'Contact the firm',
  line: 'Write what your organisation does and what you want to work on. Your request goes to the firm by email.',
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
  // the firm's own line, from its listing, set large on the last screen
  h2: 'Turning ideas into results',
  line: 'Talk through your idea with the firm.',
  lede: 'Management consultancy in Kampala, Uganda.',
  columns: [
    {
      head: 'Services',
      links: [
        { label: 'Strategic planning', href: '#services' },
        { label: 'Operational support', href: '#services' },
        { label: 'Project management', href: '#services' },
      ],
    },
    {
      head: 'Sectors',
      links: [
        { label: 'Finance and fintech', href: '#sectors' },
        { label: 'Social impact and NGOs', href: '#sectors' },
      ],
    },
  ],
  contact: 'Contact',
  credits: { label: 'Photographs via Pexels and Wikimedia Commons', href: '/credits.html' },
}
