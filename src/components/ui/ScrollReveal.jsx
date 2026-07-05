import { useInView } from 'react-intersection-observer'

export default function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  const dirClass = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal'
  const delayClass = delay ? `reveal-delay-${delay}` : ''

  return (
    <div ref={ref} className={`${dirClass} ${delayClass} ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  )
}
