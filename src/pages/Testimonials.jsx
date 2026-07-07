import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import VideoTestimonialSlider from '../components/sections/VideoTestimonialSlider'
import VideoLightbox from '../components/sections/VideoLightbox'
import { TESTIMONIALS_TEASER } from '../data/testimonials'

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    document.title = 'What People Say | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="What People Say" />

        <VideoTestimonialSlider videos={TESTIMONIALS_TEASER} onSelect={setActiveVideo} />

        <div className="text-center mt-5">
          <Link to="/testimonials-all/" className="btn btn-outline-primary">
            See All Testimonials
          </Link>
        </div>
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}
