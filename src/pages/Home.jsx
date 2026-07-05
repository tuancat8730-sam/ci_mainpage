import { useEffect } from 'react'
import Hero from '../components/sections/Hero'
import ServicesGrid from '../components/sections/ServicesGrid'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import InstallationHighlights from '../components/sections/InstallationHighlights'
import Testimonials from '../components/sections/Testimonials'
import ServiceArea from '../components/sections/ServiceArea'
import CTASection from '../components/sections/CTASection'

export default function Home() {
  useEffect(() => {
    document.title = 'Capital Irrigation Edmonton'
  }, [])

  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyChooseUs />
      <InstallationHighlights />
      <Testimonials />
      <ServiceArea />
      <CTASection />
    </>
  )
}
