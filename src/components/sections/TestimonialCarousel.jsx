import { useEffect, useState } from 'react'

export default function TestimonialCarousel({ testimonials, interval = 6000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, interval)
    return () => clearInterval(timer)
  }, [testimonials.length, interval])

  const current = testimonials[index]

  return (
    <div className="testimonial-carousel">
      <blockquote className="testimonial-card testimonial-carousel-card mx-auto" key={current.id}>
        <p>&ldquo;{current.quote}&rdquo;</p>
        <footer className="fw-semibold">
          {current.name} <span className="text-muted fw-normal">&mdash; {current.meta}</span>
        </footer>
      </blockquote>

      <div className="testimonial-carousel-dots">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={`testimonial-carousel-dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
