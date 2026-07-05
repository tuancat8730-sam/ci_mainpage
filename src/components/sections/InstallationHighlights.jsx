import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

export default function InstallationHighlights() {
  return (
    <>
      <section className="section">
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <ScrollReveal direction="left" className="col-lg-6">
              <img src="/static/img/house_beauty.jpg" alt="Residential irrigation installation" className="img-fluid rounded-4 shadow" />
            </ScrollReveal>
            <ScrollReveal direction="right" className="col-lg-6">
              <h2 className="section-title">Residential Installations</h2>
              <p className="section-subtitle">
                Stop fighting with the hose and start enjoying your yard. Bring your yard to life with a fully
                automatic, custom designed irrigation system.
              </p>
              <Link to="/installation/" className="btn btn-outline-primary">
                Learn More
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <ScrollReveal direction="left" className="col-lg-6 order-lg-2">
              <img src="/static/img/sidewalk.jpg" alt="Commercial irrigation installation" className="img-fluid rounded-4 shadow" />
            </ScrollReveal>
            <ScrollReveal direction="right" className="col-lg-6 order-lg-1">
              <h2 className="section-title">Commercial Installations</h2>
              <p className="section-subtitle">
                We understand the unique challenges a commercial project brings. We work with the project manager
                and other trades on site to ensure a smooth and expedient installation experience.
              </p>
              <Link to="/installation/" className="btn btn-outline-primary">
                Learn More
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
