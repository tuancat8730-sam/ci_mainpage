import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import ScrollReveal from '../components/ui/ScrollReveal'
import VimeoEmbed from '../components/sections/VimeoEmbed'
import { TESTIMONIALS_TEASER } from '../data/testimonials'

export default function Testimonials() {
  useEffect(() => {
    document.title = 'What People Say | Capital Irrigation Edmonton'
  }, [])

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="What People Say" />
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {TESTIMONIALS_TEASER.map((item, i) => (
            <ScrollReveal key={item.id} delay={Math.min(i + 1, 5)}>
              <div className="col">
                <h5>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h5>
                <VimeoEmbed vimeoId={item.vimeoId} title={item.title} />
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link to="/testimonials-all/" className="btn btn-outline-primary">
            See All Testimonials
          </Link>
        </div>
      </div>
    </section>
  )
}
