import { BUSINESS_INFO } from "../data/designsData";

export default function ServicesView({ onNavigate, onOpenConsultation }) {
  const services = [
    {
      id: "srv-1",
      number: "01",
      title: "Turnkey Residential Interiors",
      tag: "100% Comprehensive",
      icon: "🏛️",
      lead: "From bare builder concrete shell to fully furnished move-in masterpiece.",
      details: "We take total responsibility for design, electrical, plumbing, masonry, false ceiling, painting, modular woodwork, and custom loose furniture.",
      highlights: ["Single point of contact", "Guaranteed 45-day handover", "10-year comprehensive warranty"]
    },
    {
      id: "srv-2",
      number: "02",
      title: "German Modular Kitchen Architecture",
      tag: "BWP 710 Marine Grade",
      icon: "🍳",
      lead: "Precision joinery built to endure high-heat, moisture, and Indian culinary traditions.",
      details: "Crafted exclusively with boiling waterproof BWP 710 marine plywood, Blum servo-drive motorized drawers, anti-fingerprint acrylic finishes, and 40mm quartz waterfall counters.",
      highlights: ["Zero swelling or warping guarantee", "Lifetime warranty on German hardware", "Ergonomic triangle workflow"]
    },
    {
      id: "srv-3",
      number: "03",
      title: "Bespoke Wardrobes & Dressing Salons",
      tag: "Italian Profile Joinery",
      icon: "🚪",
      lead: "Floor-to-ceiling elegance with custom storage organization.",
      details: "Italian slim bronze aluminum profile glass wardrobes with motion-sensor vertical LED illumination, pull-out trouser racks, velvet jewelry drawers, and island display cases.",
      highlights: ["Smoked & fluted safety glass", "Dust-proof soft-close dampers", "Custom internal compartments"]
    },
    {
      id: "srv-4",
      number: "04",
      title: "Architectural 3D CAD & VR Walkthroughs",
      tag: "Zero-Surprise Guarantee",
      icon: "👓",
      lead: "Walk through your residence in photorealistic 3D before execution begins.",
      details: "Our principal architects draft millimeter-accurate CAD plans and photorealistic 3D renders so you can inspect lighting, circulation, and material textures with total confidence.",
      highlights: ["Real material tactile samples", "Millimeter-accurate elevations", "Instant layout revisions"]
    },
    {
      id: "srv-5",
      number: "05",
      title: "False Ceiling & High-CRI Lighting Design",
      tag: "Architectural Ambiance",
      icon: "💡",
      lead: "Layered lighting scenes that elevate spatial mood and aesthetics.",
      details: "Multilevel Saint-Gobain Gyproc false ceilings with negative reveals, 2700K indirect cove light channels, and magnetic DC48V track rails with glare-free optical lenses.",
      highlights: ["CRI 90+ true-color illumination", "Smart home scene automation", "Acoustic sound dampening"]
    },
    {
      id: "srv-6",
      number: "06",
      title: "Luxury Villa & Duplex Architecture",
      tag: "Ultra-High-Net-Worth",
      icon: "🏰",
      lead: "Bespoke architectural estates and double-height living sanctuaries.",
      details: "Dedicated architectural solutions for independent villas and duplexes, including Italian travertine clad staircases, private elevators, and home cinema acoustic suites.",
      highlights: ["Custom architectural detailing", "Imported Italian marble selection", "Executive on-site supervision"]
    }
  ];

  return (
    <div className="services-page-container">
      {/* Page Header */}
      <header className="services-page-header">
        <div className="services-header-content">
          <div className="services-badge">
            <span className="badge-sparkle">✦</span>
            <span>END-TO-END TURNKEY ARCHITECTURE</span>
          </div>
          <h1>
            Our Architectural <span className="gold-text-gradient">Services</span>
          </h1>
          <p>
            We merge European precision factory engineering with on-ground architectural mastery.
            Every service is backed by written guarantees, transparent pricing, and our 45-day move-in commitment.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="services-list-section">
        <div className="services-cards-grid">
          {services.map((srv) => (
            <div key={srv.id} className="service-feature-card">
              <div className="card-top-row">
                <span className="service-number">{srv.number}</span>
                <span className="service-tag">{srv.tag}</span>
              </div>
              <div className="service-icon-box">{srv.icon}</div>
              <h3>{srv.title}</h3>
              <p className="service-lead">{srv.lead}</p>
              <p className="service-details">{srv.details}</p>
              <ul className="service-highlights-list">
                {srv.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="check-gold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <button
                className="btn-enquire-service"
                onClick={onOpenConsultation}
              >
                Enquire for This Service ›
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="services-cta-banner">
        <div className="cta-banner-container">
          <h2>Ready to Begin Your Home Transformation?</h2>
          <p>Visit our 4,500 sq.ft Guntur Flagship Studio or book a free consultation with our principal architect.</p>
          <div className="banner-buttons-row">
            <button className="btn-gold-primary" onClick={onOpenConsultation}>
              Book Free Design Consultation ›
            </button>
            {onNavigate && (
              <button className="btn-outline-gold" onClick={() => onNavigate("designs")}>
                Explore Design Ideas ›
              </button>
            )}
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20know%20more%20about%20your%20turnkey%20services.`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-white"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
