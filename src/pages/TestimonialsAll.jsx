import { useEffect, useState } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import VideoThumbnail from '../components/sections/VideoThumbnail'
import VideoLightbox from '../components/sections/VideoLightbox'
import { VIDEO_TESTIMONIALS } from '../data/testimonials'

export default function TestimonialsAll() {
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    document.title = 'What People Say | Capital Irrigation Edmonton'
  }, [])

  const groups = VIDEO_TESTIMONIALS.reduce((acc, item) => {
    acc[item.group] = acc[item.group] || []
    acc[item.group].push(item)
    return acc
  }, {})

  return (
    <section className="section">
      <div className="container-xl">
        <SectionHeader title="What People Say" />
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName} className="mb-5">
            <h4 className="mb-3">
              {items[0].link ? (
                <a href={items[0].link} target="_blank" rel="noopener noreferrer">
                  {groupName}
                </a>
              ) : (
                groupName
              )}
            </h4>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {items.map((item) => (
                <div key={item.id} className="col">
                  <VideoThumbnail
                    vimeoId={item.vimeoId}
                    title={item.name || groupName}
                    onClick={() => setActiveVideo(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  )
}
