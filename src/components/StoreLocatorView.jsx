import { useState } from "react";

export default function StoreLocatorView({ onNavigate }) {
  const [copied, setCopied] = useState(false);

  const addressText = "ICON INTERIORS Flagship Experience Center, Syamala Nagar Main Road, Guntur, Andhra Pradesh – 522006";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const gunturExperienceFeatures = [
    {
      icon: "🛋️",
      title: "Life-Size Room Mockups",
      desc: "Walk through complete living rooms, master bedroom suites, and walk-in wardrobes styled with real lighting."
    },
    {
      icon: "🍳",
      title: "Live Modular Kitchen Studio",
      desc: "Test German Blum & Hafele soft-close hardware, pull-out larders, corner carousels, and quartz countertops."
    },
    {
      icon: "🧱",
      title: "Tactile Material & Finishes Library",
      desc: "Touch over 40+ imported Italian marble samples, fluted panels, PU lacquered glass, and anti-fingerprint laminates."
    },
    {
      icon: "👓",
      title: "Live 3D CAD & VR Walkthroughs",
      desc: "Sit with our principal interior architects and see your exact floorplan visualized in photorealistic 3D."
    }
  ];

  return (
    <div className="store-locator-page-container">
      {/* Header */}
      <header className="store-locator-header">
        <div className="store-locator-badge">
          <span className="badge-dot-live">●</span>
          <span>CURRENTLY OPERATING EXCLUSIVELY IN GUNTUR CITY</span>
        </div>
        <h1 className="store-locator-title">
          ICON INTERIORS <span className="gold-text-gradient">Flagship Studio</span>
        </h1>
        <p className="store-locator-subtitle">
          Our exclusive 4,500 sq.ft physical experience center is located in the heart of Guntur, Andhra Pradesh.
          Visit us to experience luxury spatial design, touch tactile materials, and consult with our principal architects.
        </p>
      </header>

      {/* Main Guntur Studio Highlight Card */}
      <div className="guntur-studio-spotlight-card">
        <div className="studio-card-media">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
            alt="ICON INTERIORS Guntur Experience Center"
            className="studio-cover-img"
          />
          <div className="studio-media-overlay">
            <span className="studio-flagship-tag">FLAGSHIP SHOWROOM</span>
            <span className="studio-city-tag">📍 GUNTUR, AP</span>
          </div>
        </div>

        <div className="studio-card-details">
          <div className="studio-status-row">
            <span className="live-status-pill">
              <span className="pulse-indicator"></span> Open Today: 10:00 AM – 8:30 PM
            </span>
            <span className="studio-area-tag">4,500 sq.ft Studio</span>
          </div>

          <h2 className="studio-name">Guntur Flagship Experience Center</h2>

          <div className="studio-info-items">
            <div className="info-item">
              <span className="item-icon">📍</span>
              <div className="item-content">
                <strong>Address:</strong>
                <p>Syamala Nagar Main Road, Guntur – 522006, Andhra Pradesh</p>
                <button className="copy-address-btn" onClick={handleCopyAddress}>
                  {copied ? "✓ Address Copied!" : "📋 Copy Address"}
                </button>
              </div>
            </div>

            <div className="info-item">
              <span className="item-icon">⏰</span>
              <div className="item-content">
                <strong>Timings:</strong>
                <p>Monday – Saturday: 10:00 AM – 8:30 PM</p>
                <p>Sunday: 10:30 AM – 6:00 PM (By Prior Appointment)</p>
              </div>
            </div>

            <div className="info-item">
              <span className="item-icon">📞</span>
              <div className="item-content">
                <strong>Direct Contact:</strong>
                <p>Telephone: <a href="tel:+919885001008">+91 98850 01008</a></p>
                <p>Email: <a href="mailto:guntur.studio@iconinteriors.in">guntur.studio@iconinteriors.in</a></p>
              </div>
            </div>
          </div>

          <div className="studio-cta-actions">
            <a
              href="https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20book%20a%20guided%20walkthrough%20at%20your%20Guntur%20Experience%20Center."
              target="_blank"
              rel="noreferrer"
              className="btn-gold-primary"
            >
              Book Studio Walkthrough on WhatsApp ↗
            </a>
            <a
              href="https://maps.google.com/?q=Syamala+Nagar+Main+Road+Guntur+522006"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold"
            >
              Get Directions in Google Maps ↗
            </a>
            <a href="tel:+919885001008" className="btn-outline-gold">
              Call Studio Directly
            </a>
          </div>
        </div>
      </div>

      {/* Experience Center Highlights */}
      <section className="studio-features-section">
        <div className="features-section-header">
          <span className="section-eyebrow">WHAT YOU WILL DISCOVER</span>
          <h2>Inside the Guntur Experience Studio</h2>
          <p>
            We designed our Guntur flagship space to eliminate guesswork. Experience your dream home in person before construction begins.
          </p>
        </div>

        <div className="studio-features-grid">
          {gunturExperienceFeatures.map((feat) => (
            <div key={feat.title} className="studio-feature-card">
              <div className="feature-card-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Note about regional expansion */}
      <div className="studio-expansion-note">
        <span className="note-icon">ℹ️</span>
        <div className="note-text">
          <strong>Note on Service Locations:</strong>
          <p>
            Our flagship physical showroom is currently operating exclusively in <strong>Guntur City</strong>.
            However, our turnkey on-site architectural and project execution teams actively service homes across
            Guntur, Amaravati, Vijayawada, and surrounding Andhra Pradesh regions.
          </p>
        </div>
      </div>

      {/* Quick Navigation Actions */}
      <div className="category-cta-banner" style={{ marginTop: "40px" }}>
        <div className="cta-banner-content">
          <h3>Explore What We Build in Guntur</h3>
          <p>Browse 10+ high-resolution architectural designs per room or understand our 5-step turnkey journey.</p>
          <div className="cta-banner-actions">
            <button
              className="btn-gold-primary"
              onClick={() => onNavigate && onNavigate("design-ideas", "Master Bedroom Designs")}
            >
              Explore Design Ideas (10+ Images) ›
            </button>
            <button
              className="btn-outline-gold"
              onClick={() => onNavigate && onNavigate("how-it-works")}
            >
              See How It Works (5 Steps) ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
