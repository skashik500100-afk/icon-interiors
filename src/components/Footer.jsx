export default function Footer({ onOpenAIStudio }) {
  return (
    <footer className="luxury-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <a href="#home" className="footer-brand">
            <span className="brand-seal">I</span>
            <div className="brand-text">
              <strong>ICON</strong>
              <small>INTERIORS & ARCHITECTURE</small>
            </div>
          </a>

          <p className="footer-manifesto">
            Crafting bespoke architectural residences, precision German modular joinery, and turnkey home
            transformations across Guntur, Amaravati, and Andhra Pradesh.
          </p>

          <div className="footer-cta-col">
            <button onClick={onOpenAIStudio} className="footer-ai-btn">
              ✦ Launch Gemini AI Designer
            </button>
            <a href="tel:+919885001008" className="footer-phone-cta">
              +91 98850 01008
            </a>
          </div>
        </div>

        <div className="footer-nav-grid">
          <div className="footer-col">
            <h5>PORTFOLIO</h5>
            <a href="#gallery">Living Room Pavilions</a>
            <a href="#gallery">Modular Italian Kitchens</a>
            <a href="#gallery">Japandi Master Suites</a>
            <a href="#gallery">Wellness Spa Bathrooms</a>
            <a href="#gallery">Walk-in Boutique Closets</a>
          </div>

          <div className="footer-col">
            <h5>INTERACTIVE TOOLS</h5>
            <a href="#before-after">Before & After Slider</a>
            <a href="#customizer">Tactile Material Studio</a>
            <a href="#estimator">Home Cost Calculator</a>
            <button onClick={onOpenAIStudio} className="footer-link-button">
              Gemini AI Moodboard Generator
            </button>
            <button onClick={onOpenAIStudio} className="footer-link-button">
              API Keys Configuration
            </button>
          </div>

          <div className="footer-col">
            <h5>LOCATIONS SERVED</h5>
            <span>Guntur City (Lakshmipuram, Brodipet)</span>
            <span>Amaravati Capital Region</span>
            <span>Vijayawada (Benz Circle, Kanuru)</span>
            <span>Mangalagiri & Tadepalli</span>
            <span>Hyderabad (Selected Bespoke Villas)</span>
          </div>

          <div className="footer-col">
            <h5>STUDIO EXPERIENCE</h5>
            <p>Syamala Nagar Main Road, Guntur, AP</p>
            <p>Monday – Saturday: 10:00 AM – 8:00 PM</p>
            <a
              href="https://wa.me/919885001008"
              target="_blank"
              rel="noreferrer"
              className="footer-chat-link"
            >
              Chat on WhatsApp ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} ICON INTERIORS. All Rights Reserved.</span>
          <span>Bespoke Luxury Architecture & Turnkey Execution</span>
          <span>Guntur, Andhra Pradesh, India</span>
        </div>
      </div>
    </footer>
  );
}
