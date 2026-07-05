import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import FaqList from '../components/sections/FaqList'
import CTASection from '../components/sections/CTASection'
import { SHUTDOWN_FAQS } from '../data/faqs'

export default function BdFaqs() {
  useEffect(() => {
    document.title = 'Shut Down FAQs | Capital Irrigation Edmonton'
  }, [])

  return (
    <>
      <section className="section">
        <div className="container-xl">
          <SectionHeader title="Frequently Asked Questions Regarding Fall Shut Downs" center={false} />
          <FaqList faqs={SHUTDOWN_FAQS} />
        </div>
      </section>
      <CTASection />
    </>
  )
}
