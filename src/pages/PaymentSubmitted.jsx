import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'

export default function PaymentSubmitted() {
  useEffect(() => {
    document.title = 'Thanks! | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl text-center form-success">
        <SectionHeader title="Thanks!" subtitle="Thank you for your payment. Your payment has been approved." />
      </div>
    </section>
  )
}
