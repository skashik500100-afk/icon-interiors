import { useState } from "react";
import { BUSINESS_INFO } from "../data/designsData";

export default function ContactView({ selectedCity = "Guntur, AP", onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: selectedCity,
    propertyType: "3 BHK Apartment",
    budget: "₹10 - ₹20 Lakhs",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Capture enquiry (connects to Spring Boot backend API in Phase 2)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const getDirectWhatsAppUrl = () => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I would like to book an architectural consultation:`,
      `• Name: ${formData.name || "Client"}`,
      `• Phone: ${formData.phone || "Not provided"}`,
      `• Property: ${formData.propertyType}`,
      `• Budget: ${formData.budget}`,
      `• City: ${formData.city}`,
      formData.notes ? `• Notes: ${formData.notes}` : ""
    ].filter(Boolean).join("\n");

    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="contact-page-container">
      <header className="contact-page-header">
        <div className="contact-header-content">
          <div className="contact-badge">
            <span className="badge-spark">✦</span>
            <span>GET IN TOUCH WITH PRINCIPAL ARCHITECTS</span>
          </div>
          <h1>
            Contact & <span className="gold-text-gradient">Consultation</span>
          </h1>
          <p>
            Whether you have an upcoming possession in Guntur, Vijayawada, Amaravati, or across Southern India,
            our team is ready to discuss your blueprints, budgets, and design vision.
          </p>
        </div>
      </header>

      <div className="contact-content-grid">
        {/* Left Column: Consultation Form */}
        <div className="contact-form-panel">
          {submitted ? (
            <div className="enquiry-success-card">
              <span className="success-icon">✓</span>
              <h3>Consultation Request Received!</h3>
              <p>
                Thank you, <strong>{formData.name}</strong>. Our principal architectural team at the Guntur
                Flagship Studio will review your floor plan specifications and contact you within 15 minutes.
              </p>
              <div className="success-actions-row">
                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-primary"
                >
                  💬 Continue on WhatsApp Immediately
                </a>
                <button
                  className="btn-outline-white"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form className="consultation-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Request an Architectural Site Consultation</h3>
                <p>Fill out the details below to receive a personalized estimate & 3D layout plan.</p>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. K. Srinivas Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98850 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. srinivas@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Property Location / City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Syamala Nagar, Guntur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
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
                    <option value="4 BHK Luxury Flat">4 BHK Luxury Flat</option>
                    <option value="Duplex Villa">Duplex Villa</option>
                    <option value="Independent Bungalow">Independent Bungalow</option>
                    <option value="Commercial Studio / Clinic">Commercial Studio / Clinic</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Budget Tier</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="Under ₹5 Lakhs">Under ₹5 Lakhs (Essential)</option>
                    <option value="₹5 - ₹10 Lakhs">₹5 - ₹10 Lakhs (Signature)</option>
                    <option value="₹10 - ₹20 Lakhs">₹10 - ₹20 Lakhs (Turnkey Premium)</option>
                    <option value="₹20 - ₹50 Lakhs">₹20 - ₹50 Lakhs (Haute Luxury)</option>
                    <option value="₹50 Lakhs+">₹50 Lakhs+ (Ultra Luxury Villa)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Design Requirements or Questions</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your possession date, modular kitchen needs, or specific design styles (e.g. Japandi, Neoclassical)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn-gold-submit" disabled={loading}>
                  {loading ? "Submitting Request..." : "Request Free Architectural Consultation ›"}
                </button>
                <a
                  href={getDirectWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-wa-shortcut"
                >
                  💬 Fast WhatsApp Connect
                </a>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Physical Studio Info */}
        <div className="contact-info-panel">
          <div className="studio-address-card">
            <span className="studio-card-tag">PHYSICAL SHOWROOM</span>
            <h3>Guntur Flagship Experience Studio</h3>
            <p className="studio-address-text">{BUSINESS_INFO.experienceCenter}</p>

            <div className="contact-details-list">
              <div className="detail-row">
                <span className="detail-icon">📞</span>
                <div>
                  <strong>Phone / Direct Consultation:</strong>
                  <p>{BUSINESS_INFO.phone}</p>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon">💬</span>
                <div>
                  <strong>WhatsApp Helpline:</strong>
                  <p>+91 {BUSINESS_INFO.whatsappNumber}</p>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon">✉️</span>
                <div>
                  <strong>Email Desk:</strong>
                  <p>{BUSINESS_INFO.email}</p>
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-icon">⏱️</span>
                <div>
                  <strong>Studio Visiting Hours:</strong>
                  <p>{BUSINESS_INFO.workingHours}</p>
                </div>
              </div>
            </div>

            <div className="studio-card-actions">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.experienceCenter)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-primary"
              >
                📍 Open Directions in Google Maps ›
              </a>
              <button
                className="btn-outline-white"
                onClick={() => onNavigate && onNavigate("store-locator")}
              >
                View 3D Studio Mockup Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

