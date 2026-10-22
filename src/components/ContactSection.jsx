export default function ContactSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const phone = data.get("phone");
    const city = data.get("city") || "Guntur";
    const service = data.get("service");
    const config = data.get("config");
    const budget = data.get("budget");
    const message = data.get("message");

    const whatsappMessage = [
      "Hello ICON INTERIORS!",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Location: ${city}`,
      `Home Typology: ${config}`,
      `Service: ${service}`,
      `Estimated Budget: ${budget || "To be discussed"}`,
      `Requirements: ${message || "Interested in a turnkey interior consultation."}`,
      "",
      "Please connect me with a senior interior architect."
    ].join("\n");

    window.open(
      `https://wa.me/919885001008?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="contact-editorial-section" id="contact">
      <div className="contact-editorial-container">
        {/* Contact Info Col */}
        <div className="contact-editorial-col">
          <span className="section-eyebrow">START YOUR ARCHITECTURAL STORY</span>
          <h2 className="editorial-heading">
            Your dream space <br />
            begins <span className="gold-text-gradient">here.</span>
          </h2>
          <p className="contact-lead">
            Whether you are receiving keys to a new villa in Amaravati, renovating an existing residence in Guntur,
            or designing an executive workspace, our principal architects are ready to guide you.
          </p>

          <div className="contact-cards-stack">
            <div className="contact-info-card">
              <span className="card-label">DESIGN STUDIO & EXPERIENCE CENTER</span>
              <p>Syamala Nagar Main Road, Guntur, Andhra Pradesh – 522006</p>
            </div>

            <div className="contact-info-card">
              <span className="card-label">DIRECT PHONE CONSULTATION</span>
              <a href="tel:+919885001008" className="phone-link">
                +91 98850 01008
              </a>
            </div>

            <div className="contact-info-card">
              <span className="card-label">INSTANT WHATSAPP DESK</span>
              <a
                href="https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20schedule%20a%20home%20interior%20consultation."
                target="_blank"
                rel="noreferrer"
                className="whatsapp-desk-link"
              >
                Chat Directly on WhatsApp ↗
              </a>
            </div>

            <div className="contact-info-card">
              <span className="card-label">STUDIO HOURS</span>
              <p>Monday – Saturday: 10:00 AM – 8:00 PM | Sunday: By Appointment</p>
            </div>
          </div>
        </div>

        {/* Contact Form Col */}
        <div className="contact-form-col">
          <form className="luxury-enquiry-form" onSubmit={handleSubmit}>
            <span className="form-eyebrow">BESPOKE CONSULTATION</span>
            <h3>Tell us about your home.</h3>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="customer-name">Full Name *</label>
                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Ramesh Varma"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-phone">Phone Number *</label>
                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  pattern="[0-9+\s()-]{7,20}"
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="customer-city">Project City / Area *</label>
                <input
                  id="customer-city"
                  name="city"
                  type="text"
                  placeholder="e.g. Guntur / Amaravati / Vijayawada"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-config">Home Typology *</label>
                <select id="customer-config" name="config" defaultValue="3 BHK Apartment">
                  <option>1 BHK Apartment</option>
                  <option>2 BHK Apartment</option>
                  <option>3 BHK Apartment</option>
                  <option>4 BHK Luxury Flat</option>
                  <option>Independent Villa / Bungalow</option>
                  <option>Commercial Studio / Office</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="customer-service">Service Required *</label>
                <select id="customer-service" name="service" defaultValue="Complete Turnkey Home Interiors">
                  <option>Complete Turnkey Home Interiors</option>
                  <option>Modular Kitchen & Utility</option>
                  <option>Living & Dining Architecture</option>
                  <option>Master Bedroom & Walk-in Wardrobe</option>
                  <option>Complete Home Renovation</option>
                  <option>3D VR Architectural Consultation</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="customer-budget">Estimated Budget</label>
                <select id="customer-budget" name="budget" defaultValue="₹5L – ₹10L">
                  <option value="Below ₹5 Lakhs">Below ₹5 Lakhs</option>
                  <option value="₹5L – ₹10L">₹5L – ₹10 Lakhs</option>
                  <option value="₹10L – ₹20L">₹10L – ₹20 Lakhs</option>
                  <option value="Above ₹20 Lakhs (Ultra Luxury)">Above ₹20 Lakhs (Ultra Luxury)</option>
                  <option value="Need Architect Guidance">Need Architect Guidance</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="customer-message">Space Requirements & Desired Vibe</label>
              <textarea
                id="customer-message"
                name="message"
                rows="4"
                placeholder="Mention possession date, carpet area, aesthetic preference (e.g. Japandi, Modern Minimalist, Italian Luxury)..."
              />
            </div>

            <button type="submit" className="btn-gold-primary btn-submit-enquiry">
              Send Consultation Request on WhatsApp ↗
            </button>

            <p className="form-assurance">
              🔒 We respect your privacy. All details are securely compiled into an immediate WhatsApp
              message to our architectural team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
