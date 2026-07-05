import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import FaqList from '../components/sections/FaqList'
import CTASection from '../components/sections/CTASection'
import { STARTUP_FAQS } from '../data/faqs'

export default function SuFaqs() {
  useEffect(() => {
    document.title = 'Startup FAQs | Capital Irrigation Edmonton'
  }, [])

  return (
    <>
      <section className="section">
        <div className="container-xl">
          <SectionHeader title="Frequently Asked Questions Regarding Spring Start Ups" center={false} />
          <FaqList faqs={STARTUP_FAQS} />
        </div>
      </section>
      <CTASection />
    </>
  )
}
