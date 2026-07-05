export default function SectionHeader({ label, title, subtitle, center = true, light = false }) {
  return (
    <div className={`section-header ${center ? 'text-center mx-auto' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title" style={light ? { color: '#fff' } : {}}>
        {title}
      </h2>
      {subtitle && (
        <p
          className="section-subtitle"
          style={{ margin: center ? '0 auto' : '0', ...(light ? { color: 'rgba(255,255,255,0.85)' } : {}) }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
