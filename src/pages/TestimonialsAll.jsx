import { useEffect } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import VimeoEmbed from '../components/sections/VimeoEmbed'
import { VIDEO_TESTIMONIALS } from '../data/testimonials'

export default function TestimonialsAll() {
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
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {items.map((item) => (
                <div key={item.id} className="col">
                  <VimeoEmbed vimeoId={item.vimeoId} title={item.name || groupName} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
