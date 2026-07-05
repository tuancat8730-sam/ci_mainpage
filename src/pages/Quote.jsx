import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import QuoteForm from '../components/sections/QuoteForm'

export default function Quote() {
  useEffect(() => {
    document.title = 'Request a Quote | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="Request a Quote" />
        <QuoteForm subject="New Quote request from the new Irrigation Website" />
      </div>
    </section>
  )
}
