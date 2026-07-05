import { Link } from 'react-router-dom'
import { TESTIMONIALS } from '../../data/testimonials'
import SectionHeader from '../ui/SectionHeader'
import ScrollReveal from '../ui/ScrollReveal'

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container-xl">
        <ScrollReveal>
          <SectionHeader label="Testimonials" title="What People Say" />
        </ScrollReveal>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.id} delay={Math.min(i + 1, 5)}>
              <blockquote className="testimonial-card h-100">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer className="fw-semibold">
                  {t.name} <span className="text-muted fw-normal">&mdash; {t.meta}</span>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/testimonials/" className="btn btn-outline-primary">
            See All Testimonials
          </Link>
        </div>
      </div>
    </section>
  )
}
