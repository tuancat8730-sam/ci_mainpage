import { WHY_CHOOSE_US } from '../../data/whyChooseUs'
import SectionHeader from '../ui/SectionHeader'
import ScrollReveal from '../ui/ScrollReveal'

export default function WhyChooseUs() {
  return (
    <section className="section section-light">
      <div className="container-xl">
        <ScrollReveal>
          <SectionHeader label="Why Choose Us" title="Built on Trust and Warranty" />
        </ScrollReveal>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {WHY_CHOOSE_US.map((item, i) => (
            <ScrollReveal key={item.id} delay={Math.min(i + 1, 5)}>
              <div className="col text-center">
                <h5>{item.title}</h5>
                <p className="text-muted">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
