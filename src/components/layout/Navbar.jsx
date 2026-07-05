import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa'
import { BUSINESS, EXTERNAL_LINKS } from '../../data/constants'

const NAV_LINKS = [
  { label: 'Lawn Care', to: EXTERNAL_LINKS.lawnCare, external: true, badge: 'New!' },
  { label: 'Snow Removal', to: EXTERNAL_LINKS.snowRemoval, external: true, badge: 'New!' },
  { label: 'What People Say', to: '/testimonials/' },
  { label: 'Installation', to: '/installation/' },
  { label: 'Pay your Invoice', to: '/payment/' },
  { label: 'Careers', to: '/careers/' },
  { label: 'Contact', to: '/contact/' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-ci sticky-top">
      <div className="container-xl">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img src={BUSINESS.logo} alt={BUSINESS.name} height="40" />
          <span className="brand-text">
            CAPITAL<br />IRRIGATION
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`}>
          <ul className="navbar-nav mx-auto gap-1">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <li key={link.label} className="nav-item">
                  <a className="nav-link" href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    {link.badge && <span className="badge bg-success ms-1">{link.badge}</span>}
                  </a>
                </li>
              ) : (
                <li key={link.label} className="nav-item">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <div className="navbar-right-group d-flex align-items-center gap-2">
            <a href={BUSINESS.phoneTel} className="navbar-phone d-flex align-items-center gap-1">
              <FaPhone size={13} />
              {BUSINESS.phone}
            </a>
            <Link to="/quote/" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
