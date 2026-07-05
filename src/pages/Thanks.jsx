import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'

export default function Thanks() {
  useEffect(() => {
    document.title = 'Request Submitted! | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl text-center form-success">
        <SectionHeader
          title="Request Submitted!"
          subtitle="Thanks for submitting a quote request. We'll be in touch in the next day or so to discuss the details of your request."
        />
      </div>
    </section>
  )
}
