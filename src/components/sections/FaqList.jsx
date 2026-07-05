import ScrollReveal from '../ui/ScrollReveal'

export default function FaqList({ faqs }) {
  return (
    <div className="accordion" id="faqAccordion">
      {faqs.map((item, i) => (
        <ScrollReveal key={item.q} delay={Math.min(i + 1, 5)}>
          <div className="faq-item mb-4">
            <h5 className="faq-question">{item.q}</h5>
            {item.a && <p className="faq-answer">{item.a}</p>}
            {item.subsections && (
              <div className="faq-subsections">
                {item.subsections.map((sub) => (
                  <div key={sub.title} className="mb-3">
                    <h6>{sub.title}</h6>
                    <p className="text-muted">{sub.body}</p>
                  </div>
                ))}
              </div>
            )}
            {item.image && (
              <img src={item.image} alt="" className="float-md-end ms-md-4" style={{ maxWidth: 160 }} />
            )}
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
