import { useState } from "react";

export default function HowItWorksView({ onNavigate, selectedCity = "Guntur, AP" }) {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "3 BHK Apartment",
    location: selectedCity || "Guntur, AP",
    budget: "₹10L - ₹15L"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Hello ICON INTERIORS! I submitted a consultation form on your website:\n- Name: ${formData.name}\n- Phone: ${formData.phone}\n- Home: ${formData.propertyType}\n- City: ${formData.location}\n- Budget: ${formData.budget}`;
    window.open(`https://wa.me/919885001008?text=${encodeURIComponent(text)}`, "_blank");
  };

  const stepsList = [
    { num: 1, title: "Meet Designer", icon: "🤝" },
    { num: 2, title: "Book Icon Interiors", icon: "📋" },
    { num: 3, title: "Execution begins", icon: "⚙️" },
    { num: 4, title: "Final installations", icon: "🔨" },
    { num: 5, title: "Move in", icon: "🏡" }
  ];

  return (
    <div className="how-it-works-view-container">
      {/* Header matching Image 5 */}
      <header className="how-it-works-header">
        <div className="hiw-title-wrap">
          <span className="accent-vertical-bar" />
          <h1 className="hiw-main-heading">Your dream home in 5 steps!</h1>
        </div>
        <p className="hiw-subheading">
          Looking to design your home interiors? Here's how you can get started.
        </p>
      </header>

      {/* 5-Step Process Timeline Chain (Image 5 style) */}
      <div className="hiw-steps-timeline-wrap">
        <div className="hiw-timeline-track">
          {stepsList.map((st, idx) => (
            <div key={st.num} className="hiw-timeline-node">
              <div className="hiw-circle-graphic">
                <span className="hiw-circle-num">{st.num}</span>
                <span className="hiw-circle-icon">{st.icon}</span>
              </div>
              <span className="hiw-circle-title">{st.title}</span>
              {idx < stepsList.length - 1 && <div className="hiw-step-connector" />}
            </div>
          ))}
        </div>

        {/* Big Start Project CTA Button (Image 5 style) */}
        <div className="hiw-start-cta-wrap">
          <button
            className="hiw-start-project-btn"
            onClick={() => setFormOpen(true)}
          >
            START YOUR PROJECT NOW
          </button>
        </div>
      </div>

      {/* Inline Consultation Modal / Form popup */}
      {formOpen && (
        <div className="hiw-form-modal-backdrop" onClick={() => setFormOpen(false)}>
          <div className="hiw-form-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="hiw-form-header">
              <h3>Start Your Dream Home Project</h3>
              <button className="hiw-form-close" onClick={() => setFormOpen(false)}>✕</button>
            </div>
            {submitted ? (
              <div className="hiw-form-success">
                <span className="success-icon">✓</span>
                <h4>Thank You, {formData.name}!</h4>
                <p>Our senior architect in {formData.location} has received your request and will connect with you via WhatsApp shortly.</p>
                <button className="btn-gold-primary" onClick={() => setFormOpen(false)}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="hiw-project-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98850 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Property Typology</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    >
                      <option value="2 BHK Apartment">2 BHK Apartment</option>
                      <option value="3 BHK Apartment">3 BHK Apartment</option>
                      <option value="4 BHK Luxury Apartment">4 BHK Luxury Apartment</option>
                      <option value="Independent Villa / Duplex">Independent Villa / Duplex</option>
                      <option value="Commercial / Office">Commercial / Studio</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>City / Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Estimated Interior Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="₹5L - ₹10L">₹5L - ₹10L (Essential Modular)</option>
                    <option value="₹10L - ₹18L">₹10L - ₹18L (Premium Full Home)</option>
                    <option value="₹18L - ₹30L">₹18L - ₹30L (Luxury Bespoke)</option>
                    <option value="₹30L+">₹30L+ (Ultra-Luxury Villa Architecture)</option>
                  </select>
                </div>
                <button type="submit" className="hiw-submit-btn">
                  Submit & Connect With Architect on WhatsApp ↗
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          DETAILED 5-STEP SECTION CARDS (IMAGE 5 STYLE)
          ========================================================================= */}
      <div className="hiw-detailed-steps-list">
        {/* Step 1 */}
        <section className="hiw-step-row-card">
          <div className="hiw-step-visual-col">
            <div className="hiw-graphic-illustration">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85"
                alt="Meet your designer"
              />
              <span className="hiw-step-badge">STEP 01</span>
            </div>
          </div>
          <div className="hiw-step-info-col">
            <h2 className="hiw-step-title">Meet your designer</h2>
            <div className="hiw-step-bullets">
              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <h3>It all begins with a form</h3>
                  <p>Let's get acquainted. The more we learn about you, your lifestyle, and family needs, the better we can design your home.</p>
                  <button className="hiw-outline-cta-btn" onClick={() => setFormOpen(true)}>
                    FILL YOUR FORM
                  </button>
                </div>
              </div>

              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <h3>Get free consultation</h3>
                  <p>Talk to our senior interior architect in Guntur and get personalized 3D spatial concepts and itemized quote for your dream home.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="hiw-step-row-card">
          <div className="hiw-step-visual-col">
            <div className="hiw-graphic-illustration">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85"
                alt="Book Icon Interiors"
              />
              <span className="hiw-step-badge">STEP 02</span>
            </div>
          </div>
          <div className="hiw-step-info-col">
            <h2 className="hiw-step-title">Book Icon Interiors</h2>
            <div className="hiw-step-bullets">
              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <div className="bullet-heading-row">
                    <h3>Pay the booking amount to seal the deal</h3>
                    <span className="milestone-tag">MILESTONE</span>
                  </div>
                  <p>Once you're completely satisfied with our initial proposals and cost transparency, pay 10% of the quote or ₹49,000 (whichever is higher) to book your design slot.</p>
                </div>
              </div>

              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <h3>Tactile Material Selection at Guntur Studio</h3>
                  <p>Touch and feel actual finishes: Italian marble slabs, fluted acoustic panels, anti-scratch acrylics, and Hafele German soft-close fittings.</p>
                  <button
                    className="hiw-outline-cta-btn"
                    onClick={() => onNavigate && onNavigate("store-locator")}
                  >
                    View Guntur Experience Center 📍
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="hiw-step-row-card">
          <div className="hiw-step-visual-col">
            <div className="hiw-graphic-illustration">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=85"
                alt="Execution begins"
              />
              <span className="hiw-step-badge">STEP 03</span>
            </div>
          </div>
          <div className="hiw-step-info-col">
            <h2 className="hiw-step-title">Execution begins</h2>
            <div className="hiw-step-bullets">
              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <div className="bullet-heading-row">
                    <h3>Precision German CNC Factory Manufacturing</h3>
                    <span className="milestone-tag">MILESTONE</span>
                  </div>
                  <p>All modular cabinets and wardrobe boxes are precision cut and PUR edge-banded in high-tech factories. Zero dust cutting at your site.</p>
                </div>
              </div>

              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <h3>Dedicated Site Engineer & WhatsApp Tracking</h3>
                  <p>You receive regular weekly photographic and video logs tracking plumbing, electrical, civil, and false ceiling progress.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="hiw-step-row-card">
          <div className="hiw-step-visual-col">
            <div className="hiw-graphic-illustration">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"
                alt="Final installations"
              />
              <span className="hiw-step-badge">STEP 04</span>
            </div>
          </div>
          <div className="hiw-step-info-col">
            <h2 className="hiw-step-title">Final installations</h2>
            <div className="hiw-step-bullets">
              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <div className="bullet-heading-row">
                    <h3>146-Point Stringent Quality Audit</h3>
                    <span className="milestone-tag">MILESTONE</span>
                  </div>
                  <p>Senior quality auditors inspect edge joints, hinge dampeners, surface alignment, and electrical safety before sign-off.</p>
                </div>
              </div>

              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <h3>Rapid 14–21 Day Flat-Pack Assembly</h3>
                  <p>Factory-finished modular components arrive at your doorstep and are cleanly assembled by certified master technicians.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section className="hiw-step-row-card">
          <div className="hiw-step-visual-col">
            <div className="hiw-graphic-illustration">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"
                alt="Move into your dream home"
              />
              <span className="hiw-step-badge">STEP 05</span>
            </div>
          </div>
          <div className="hiw-step-info-col">
            <h2 className="hiw-step-title">Move into your dream home</h2>
            <div className="hiw-step-bullets">
              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <div className="bullet-heading-row">
                    <h3>Deep Cleaning & Key Handover</h3>
                    <span className="milestone-tag">MILESTONE</span>
                  </div>
                  <p>Professional deep industrial sanitization and vacuuming before we hand over the golden keys to your bespoke luxury residence.</p>
                </div>
              </div>

              <div className="hiw-bullet-item">
                <span className="bullet-dot" />
                <div className="bullet-text">
                  <h3>10-Year Unconditional Warranty Certificate</h3>
                  <p>Enjoy life with complete peace of mind backed by our 10-year warranty on marine plywood modular joinery and prompt local Guntur service.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Floating Quick Actions */}
      <div className="hiw-footer-banner">
        <h3>Ready to begin Step 1 with our Guntur design team?</h3>
        <p>Book a free 45-minute studio walkthrough or virtual architectural consultation.</p>
        <div className="hiw-footer-buttons">
          <button className="hiw-start-project-btn" onClick={() => setFormOpen(true)}>
            START YOUR PROJECT NOW
          </button>
          <a
            href="https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20want%20to%20begin%20Step%201%20for%20my%20home%20interiors."
            target="_blank"
            rel="noreferrer"
            className="btn-outline-gold"
          >
            Chat Directly on WhatsApp ↗
          </a>
        </div>
      </div>
    </div>
  );
}
