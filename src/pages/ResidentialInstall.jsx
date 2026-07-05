import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import ScrollReveal from '../components/ui/ScrollReveal'
import { INSTALLATION_STEPS, WHAT_YOU_GET } from '../data/installationFeatures'
import { TESTIMONIALS } from '../data/testimonials'

export default function ResidentialInstall() {
  useEffect(() => {
    document.title = 'Benefits of Irrigation | Capital Irrigation Edmonton'
  }, [])

  const rejBoutin = TESTIMONIALS.find((t) => t.id === 'rej-boutin')
  const jasonJobs = TESTIMONIALS.find((t) => t.id === 'jason-jobs')

  return (
    <>
      <section className="hero-section">
        <div className="container-xl text-center">
          <h1 className="hero-title">Irrigation Installation</h1>
          <Link to="/quote/" className="btn btn-primary btn-lg">
            Request a Quote
          </Link>
        </div>
      </section>

      {rejBoutin && (
        <section className="section">
          <div className="container-xl">
            <blockquote className="testimonial-card mx-auto" style={{ maxWidth: 720 }}>
              <p>&ldquo;{rejBoutin.quote}&rdquo;</p>
              <footer className="fw-semibold">
                {rejBoutin.name} <span className="text-muted fw-normal">&mdash; {rejBoutin.meta}</span>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      <section className="section section-light">
        <div className="container-xl">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {INSTALLATION_STEPS.map((step, i) => (
              <ScrollReveal key={step.id} delay={Math.min(i + 1, 5)}>
                <div className="col">
                  <h5>{step.title}</h5>
                  <p className="text-muted">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <ScrollReveal direction="left" className="col-lg-6">
              <img src="/static/img/estate.jpg" alt="Irrigation system components" className="img-fluid rounded-4 shadow" />
            </ScrollReveal>
            <ScrollReveal direction="right" className="col-lg-6">
              <SectionHeader title="What You Get" center={false} />
              <ul className="list-unstyled">
                {WHAT_YOU_GET.map((item) => (
                  <li key={item.text} className="mb-2">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.text}
                      </a>
                    ) : (
                      item.text
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/quote/" className="btn btn-primary">
                Request Quote
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {jasonJobs && (
        <section className="section section-light">
          <div className="container-xl">
            <blockquote className="testimonial-card mx-auto" style={{ maxWidth: 720 }}>
              <p>&ldquo;{jasonJobs.quote}&rdquo;</p>
              <footer className="fw-semibold">
                {jasonJobs.name} <span className="text-muted fw-normal">&mdash; {jasonJobs.meta}</span>
              </footer>
            </blockquote>
          </div>
        </section>
      )}
    </>
  )
}
