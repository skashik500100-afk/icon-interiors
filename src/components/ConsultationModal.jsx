import { useState } from "react";
import { BUSINESS_INFO } from "../data/designsData";
import { api } from "../services/api";

export default function ConsultationModal({ isOpen, onClose, preselectedDesign = null, selectedCity = "Guntur, AP" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: selectedCity,
    scope: preselectedDesign ? `${preselectedDesign.name} (${preselectedDesign.id})` : "Turnkey Full Home",
    budget: preselectedDesign?.budget || "₹10 - ₹20 Lakhs",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.submitEnquiry({
        customerName: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        roomType: formData.scope,
        budgetRange: formData.budget,
        notes: formData.notes,
        source: preselectedDesign ? "DESIGN_MODAL" : "WEBSITE_CONSULTATION",
        designId: preselectedDesign?.id || null
      });
      setLoading(false);
      setSubmitted(true);
    } catch {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const getWhatsAppDirectUrl = () => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I would like to book an architectural site consultation:`,
      `• Name: ${formData.name || "Client"}`,
      `• Phone: ${formData.phone}`,
      `• Interested In: ${formData.scope}`,
      `• Estimated Budget: ${formData.budget}`,
      `• City / Location: ${formData.city}`,
      formData.notes ? `• Notes: ${formData.notes}` : ""
    ].filter(Boolean).join("\n");

    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="consultation-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="consultation-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-badge-dot">✦</span>
            <h3>Book Free Architectural Consultation</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className="modal-success-state">
            <span className="success-check-glyph">✓</span>
            <h3>Consultation Confirmed!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. Our Guntur studio architectural team will review
              your request for <strong>{formData.scope}</strong> and call you within 15 minutes.
            </p>
            <div className="success-buttons-wrap">
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-primary"
              >
                💬 Connect on WhatsApp Immediately
              </a>
              <button
                type="button"
                className="btn-modal-done"
                onClick={onClose}
              >
                <span className="done-check-icon">✓</span>
                <span>Done & Return to Website</span>
              </button>
            </div>
          </div>
        ) : (
          <form className="consultation-modal-form" onSubmit={handleSubmit}>
            <p className="modal-lead-note">
              {preselectedDesign ? (
                <>Inquiring regarding design: <strong>{preselectedDesign.name}</strong> ({preselectedDesign.id})</>
              ) : (
                <>Schedule a free consultation at our 4,500 sq.ft Guntur Flagship Studio or request an on-site visit.</>
              )}
            </p>

            <div className="modal-input-grid">
              <div className="input-field-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. K. Srinivas Rao"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-field-group">
                <label>Mobile Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98850 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="input-field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. srinivas@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="input-field-group">
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

            <div className="input-field-group">
              <label>Estimated Project Budget</label>
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

            <div className="input-field-group">
              <label>Special Requirements or Notes</label>
              <textarea
                rows="2"
                placeholder="Possession date, floorplan dimensions, or specific room needs..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="modal-cta-buttons">
              <button type="submit" className="btn-gold-primary" disabled={loading}>
                {loading ? "Scheduling..." : "Book Free Architectural Consultation ›"}
              </button>
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn-modal-wa-link"
              >
                💬 Open WhatsApp Chat
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

