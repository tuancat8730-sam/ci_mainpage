import ScrollReveal from '../ui/ScrollReveal'
import SectionHeader from '../ui/SectionHeader'
import { BUSINESS } from '../../data/constants'

export default function ServiceArea() {
  return (
    <section className="section section-light">
      <div className="container-xl text-center">
        <ScrollReveal>
          <SectionHeader
            label="Where We Work"
            title="Proudly Serving Edmonton and Area"
            subtitle={`Based in Edmonton at ${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}.`}
          />
        </ScrollReveal>
      </div>
    </section>
  )
}
