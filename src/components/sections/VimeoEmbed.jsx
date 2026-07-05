export default function VimeoEmbed({ vimeoId, title }) {
  return (
    <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        title={title || `Testimonial video ${vimeoId}`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
