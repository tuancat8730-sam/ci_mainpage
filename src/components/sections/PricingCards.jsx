import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

export default function PricingCards({ packages, to = '/lawn-quote/' }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {packages.map((pkg, i) => (
        <ScrollReveal key={pkg.id} delay={Math.min(i + 1, 5)}>
          <div className="col">
            <div className="card pricing-card h-100">
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="card-title">{pkg.title}</h5>
                <p className="pricing-price">
                  <span className="fs-3 fw-bold">{pkg.price}</span>
                  <span className="text-muted">{pkg.unit}</span>
                </p>
                <ul className="pricing-features flex-grow-1">
                  {pkg.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link to={to} className="btn btn-primary mt-3">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
