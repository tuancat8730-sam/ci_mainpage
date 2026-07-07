import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import VimeoEmbed from './VimeoEmbed'

export default function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    if (!video) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [video, onClose])

  if (!video) return null

  return (
    <div className="video-lightbox-backdrop" onClick={onClose}>
      <div className="video-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="video-lightbox-close" onClick={onClose} aria-label="Close video">
          <FaTimes />
        </button>
        <VimeoEmbed vimeoId={video.vimeoId} title={video.title} />
      </div>
    </div>
  )
}
