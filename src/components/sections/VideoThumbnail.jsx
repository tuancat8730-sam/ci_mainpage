import { FaPlay } from 'react-icons/fa'

export default function VideoThumbnail({ vimeoId, title, onClick }) {
  return (
    <button
      type="button"
      className="video-thumbnail ratio ratio-16x9"
      style={{ backgroundImage: `url(https://vumbnail.com/${vimeoId}.jpg)` }}
      onClick={onClick}
      aria-label={`Play video: ${title || vimeoId}`}
    >
      <span className="video-thumbnail-play">
        <FaPlay />
      </span>
    </button>
  )
}
