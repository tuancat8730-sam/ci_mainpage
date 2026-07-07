import { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import VideoThumbnail from './VideoThumbnail'

export default function VideoTestimonialSlider({ videos, onSelect }) {
  const trackRef = useRef(null)
  const slideRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = (index) => {
    const clamped = Math.max(0, Math.min(videos.length - 1, index))
    slideRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const trackRect = track.getBoundingClientRect()
        const trackCenter = trackRect.left + trackRect.width / 2

        let closestIndex = 0
        let closestDistance = Infinity
        slideRefs.current.forEach((el, i) => {
          if (!el) return
          const rect = el.getBoundingClientRect()
          const distance = Math.abs(rect.left + rect.width / 2 - trackCenter)
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = i
          }
        })
        setActiveIndex(closestIndex)
      })
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [videos.length])

  const activeVideo = videos[activeIndex]

  return (
    <div className="video-slider">
      <button
        type="button"
        className="video-slider-arrow video-slider-arrow-left"
        onClick={() => scrollToIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        aria-label="Previous video"
      >
        <FaChevronLeft />
      </button>

      <div className="video-slider-track" ref={trackRef}>
        {videos.map((video, i) => (
          <div
            key={video.id}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            className={`video-slider-slide${i === activeIndex ? ' active' : ''}`}
          >
            <VideoThumbnail
              vimeoId={video.vimeoId}
              title={video.title}
              onClick={() => (i === activeIndex ? onSelect(video) : scrollToIndex(i))}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="video-slider-arrow video-slider-arrow-right"
        onClick={() => scrollToIndex(activeIndex + 1)}
        disabled={activeIndex === videos.length - 1}
        aria-label="Next video"
      >
        <FaChevronRight />
      </button>

      {activeVideo && <p className="video-slider-caption">{activeVideo.title}</p>}
    </div>
  )
}
