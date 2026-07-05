import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/services'
import SectionHeader from '../ui/SectionHeader'
import ScrollReveal from '../ui/ScrollReveal'

export default function ServicesGrid() {
  return (
    <section className="section">
      <div className="container-xl">
        <ScrollReveal>
          <SectionHeader
            label="What We Offer"
            title="Our Services"
            subtitle="From residential and commercial installation to full-season lawn care programs, we handle every part of a healthy, automated yard."
          />
        </ScrollReveal>

        <div className="row row-cols-1 row-cols-md-2 g-4">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={Math.min(i + 1, 5)}>
              <div className="col">
                <div className="card service-card h-100">
                  <div className="card-body p-4">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.shortDesc}</p>
                    <Link to={service.to} className="fw-semibold" style={{ color: 'var(--color-primary)' }}>
                      Learn more &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
