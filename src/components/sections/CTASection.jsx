import { Link } from 'react-router-dom'

export default function CTASection({
  title = 'Ready to bring your yard to life?',
  subtitle = "Get your quote today!",
  to = '/quote/',
  buttonLabel = 'Request a Quote',
}) {
  return (
    <section className="cta-section">
      <div className="container-xl">
        <h2 className="mb-2">{title}</h2>
        <p className="mb-4">{subtitle}</p>
        <Link to={to} className="btn btn-lg">
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
