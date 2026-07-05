import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'

export default function Team() {
  useEffect(() => {
    document.title = 'Our Team | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="Meet the Team" subtitle="Team profiles coming soon." />
      </div>
    </section>
  )
}
