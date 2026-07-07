import { Link } from 'react-router-dom'
import { FaArrowRight, FaPhone, FaShieldAlt, FaAward, FaTint } from 'react-icons/fa'
import { BUSINESS } from '../../data/constants'

const TRUST_BADGES = [
  { icon: <FaShieldAlt />, label: '5-Year Warranty' },
  { icon: <FaAward />, label: 'Certified Irrigation Contractor' },
  { icon: <FaTint />, label: 'Top of the Line Rainbird Equipment' },
]

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container-xl hero-content">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className="hero-title">Bring your yard to life</h1>
            <p className="hero-subtitle">
              With a custom built, fully automatic irrigation system from {BUSINESS.name}.
            </p>

            <div className="hero-cta-group">
              <Link to="/quote/" className="btn-hero-primary">
                Request a Quote <FaArrowRight />
              </Link>
              <a href={BUSINESS.phoneTel} className="btn-hero-secondary">
                <FaPhone size={14} /> Call {BUSINESS.phone}
              </a>
            </div>

            <div className="hero-trust-row">
              {TRUST_BADGES.map((badge) => (
                <div className="trust-badge" key={badge.label}>
                  <span className="trust-icon">{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
