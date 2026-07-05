import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'

export default function Jobs() {
  useEffect(() => {
    document.title = 'Careers | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader
          title="Want to work for Capital Irrigation?"
          subtitle="We currently do not have any openings. Check back later for openings."
        />
      </div>
    </section>
  )
}
