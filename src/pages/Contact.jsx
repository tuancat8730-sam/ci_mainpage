import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import { BUSINESS } from '../data/constants'

export default function Contact() {
  useEffect(() => {
    document.title = "We'd love to hear from you! | Capital Irrigation Edmonton"
  }, [])

  return (
    <section className="section">
      <div className="container-xl text-center">
        <SectionHeader
          title="We'd love to hear from you!"
          subtitle="Questions about getting irrigation? Need a technician to check on your system? Whatever the reason, we'd be happy to chat!"
        />
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <p className="mb-1">{BUSINESS.hours}</p>
            <p className="text-muted small mb-4">
              If you get our voicemail during office hours, be sure to leave a message as we are always checking,
              and responding to, voicemail.
            </p>
            <p className="mb-1">
              <a href={BUSINESS.phoneTel}>{BUSINESS.phone}</a>
            </p>
            <p className="mb-4">
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </p>
            <p className="mb-0">
              {BUSINESS.name}
              <br />
              {BUSINESS.addressLine1}
              <br />
              {BUSINESS.addressLine2}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
