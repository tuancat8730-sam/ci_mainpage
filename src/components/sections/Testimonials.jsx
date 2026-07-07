import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TESTIMONIALS, TESTIMONIALS_TEASER } from '../../data/testimonials'
import SectionHeader from '../ui/SectionHeader'
import ScrollReveal from '../ui/ScrollReveal'
import TestimonialCarousel from './TestimonialCarousel'
import VideoTestimonialSlider from './VideoTestimonialSlider'
import VideoLightbox from './VideoLightbox'

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section className="section">
      <div className="container-xl">
        <ScrollReveal>
          <SectionHeader label="Testimonials" title="What People Say" />
        </ScrollReveal>

        <ScrollReveal>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <VideoTestimonialSlider videos={TESTIMONIALS_TEASER} onSelect={setActiveVideo} />
        </ScrollReveal>

        <div className="text-center mt-4">
          <Link to="/testimonials/" className="btn btn-outline-primary">
            See All Testimonials
          </Link>
        </div>
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}
