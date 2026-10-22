import { CLIENT_TESTIMONIALS } from "../data/designsData";

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-header">
        <span className="section-eyebrow">VERIFIED HOMEOWNER EXPERIENCES</span>
        <h2 className="section-title">
          Stories of <span className="gold-text-gradient">Cherished Homes.</span>
        </h2>
        <p className="section-description">
          Read what esteemed homeowners across Guntur, Amaravati, and Vijayawada have to say about their
          architectural journeys with ICON INTERIORS.
        </p>
      </div>

      <div className="testimonials-grid">
        {CLIENT_TESTIMONIALS.map((t) => (
          <div key={t.id} className="testimonial-card">
            <div className="t-rating">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>

            <p className="t-quote">"{t.quote}"</p>

            <div className="t-author-row">
              <img src={t.avatar} alt={t.name} className="t-avatar" />
              <div className="t-author-meta">
                <h4>{t.name}</h4>
                <span className="t-location">{t.location}</span>
                <small className="t-project">{t.project}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
