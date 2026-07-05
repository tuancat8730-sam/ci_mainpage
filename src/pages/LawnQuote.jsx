import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import QuoteForm from '../components/sections/QuoteForm'

export default function LawnQuote() {
  useEffect(() => {
    document.title = 'Request a Lawn Care Quote | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="Request a Lawn Care Quote" />
        <QuoteForm subject="New Quote request from the Lawn Website" />
      </div>
    </section>
  )
}
