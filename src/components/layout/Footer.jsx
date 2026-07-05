import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope } from 'react-icons/fa'
import { BUSINESS } from '../../data/constants'

const SITE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'What People Say', to: '/testimonials/' },
  { label: 'Irrigation Installation', to: '/installation/' },
  { label: 'Quote', to: '/quote/' },
  { label: 'Pay Your Invoice', to: '/payment/' },
  { label: 'Careers', to: '/careers/' },
  { label: 'Contact Us', to: '/contact/' },
  { label: 'FAQs', to: '/faqs/' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-xl">
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="footer-brand d-flex align-items-center gap-2">
              <img src={BUSINESS.logo} alt={BUSINESS.name} height="35" />
              <span>
                {BUSINESS.name}
                <br />
                {BUSINESS.addressLine1}
                <br />
                {BUSINESS.addressLine2}
              </span>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Site Links</h6>
            <ul className="footer-links">
              {SITE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Contact Us</h6>
            <div className="footer-contact-item">
              <FaPhone />
              <a href={BUSINESS.phoneTel}>{BUSINESS.phone}</a>
            </div>
            <div className="footer-contact-item">
              <FaEnvelope />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <span>&copy; {new Date().getFullYear()} {BUSINESS.name}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}
