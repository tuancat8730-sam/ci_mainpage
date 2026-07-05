import { Link } from 'react-router-dom'
import { BUSINESS } from '../../data/constants'

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container-xl">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="hero-title">Bring your yard to life</h1>
            <p className="hero-subtitle">
              With a custom built, fully automatic irrigation system from {BUSINESS.name}.
            </p>
            <Link to="/quote/" className="btn btn-primary btn-lg">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
