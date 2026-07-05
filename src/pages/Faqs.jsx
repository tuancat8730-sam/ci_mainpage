import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import FaqList from '../components/sections/FaqList'
import CTASection from '../components/sections/CTASection'
import { FAQS } from '../data/faqs'

export default function Faqs() {
  useEffect(() => {
    document.title = 'FAQs | Capital Irrigation Edmonton'
  }, [])

  return (
    <>
      <section className="section">
        <div className="container-xl">
          <SectionHeader title="Frequently Asked Questions" center={false} />
          <FaqList faqs={FAQS} />
        </div>
      </section>
      <CTASection />
    </>
  )
}
