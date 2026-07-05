import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import PricingCards from '../components/sections/PricingCards'
import { LAWN_PACKAGES } from '../data/pricing'

export default function Lawn() {
  useEffect(() => {
    document.title = 'Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="Our Lawn Care Services" />
        <PricingCards packages={LAWN_PACKAGES} />
      </div>
    </section>
  )
}
