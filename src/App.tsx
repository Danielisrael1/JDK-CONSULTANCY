import { Suspense, lazy } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'

// The sections below the fold are their own chunks: the first paint needs only the nav and the
// hero's code. The build prerenders them all (react-dom/static waits for lazy modules), so the
// shipped HTML is complete; the client hydrates each as its chunk arrives. main.tsx starts
// those downloads at once, so hydration never waits on a chain of imports.
export const below = {
  Services: () => import('./components/Services'),
  Firm: () => import('./components/Firm'),
  Clients: () => import('./components/Clients'),
  Meeting: () => import('./components/Meeting'),
  Closing: () => import('./components/Closing'),
}

const Services = lazy(below.Services)
const Firm = lazy(below.Firm)
const Clients = lazy(below.Clients)
const Meeting = lazy(below.Meeting)
const Closing = lazy(below.Closing)

// header.nav, main and footer.closing are the body's direct children, as the design kit expects.
export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Suspense fallback={null}><Services /></Suspense>
        <Suspense fallback={null}><Firm /></Suspense>
        <Suspense fallback={null}><Clients /></Suspense>
        <Suspense fallback={null}><Meeting /></Suspense>
      </main>
      <Suspense fallback={null}><Closing /></Suspense>
    </>
  )
}
