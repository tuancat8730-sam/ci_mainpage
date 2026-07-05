import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl text-center">
        <SectionHeader title="404" subtitle="Page not found." />
      </div>
    </section>
  )
}
