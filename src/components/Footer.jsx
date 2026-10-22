export default function Footer({ onNavigate }) {
  return (
    <footer className="luxury-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <button
            className="footer-brand-btn"
            onClick={() => onNavigate && onNavigate("home")}
          >
            <span className="brand-seal">I</span>
            <div className="brand-text">
              <strong>ICON</strong>
              <small>INTERIORS & ARCHITECTURE</small>
            </div>
          </button>

          <p className="footer-manifesto">
            Crafting bespoke architectural residences, precision German modular joinery, and turnkey home
            transformations. Flagship Experience Center located in Guntur, Andhra Pradesh.
          </p>

          <div className="footer-cta-col">
            <button
              onClick={() => onNavigate && onNavigate("store-locator")}
              className="footer-store-btn"
            >
              📍 Visit Guntur Flagship Studio
            </button>
            <a href="tel:+919885001008" className="footer-phone-cta">
              +91 98850 01008
            </a>
          </div>
        </div>

        <div className="footer-nav-grid">
          <div className="footer-col">
            <h5>DESIGN IDEAS</h5>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("design-ideas", "Master Bedroom Designs")}
            >
              Master Bedroom Designs
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("design-ideas", "Modular Kitchen Designs")}
            >
              Modular Kitchen Designs
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("design-ideas", "Living Room Designs")}
            >
              Living Room Designs
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("design-ideas", "Wardrobe Designs")}
            >
              Wardrobe Designs
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("design-ideas", "Bathroom Designs")}
            >
              Luxury Bathroom Designs
            </button>
          </div>

          <div className="footer-col">
            <h5>NAVIGATION & TOOLS</h5>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("how-it-works")}
            >
              How It Works (5 Steps)
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("modular-journey")}
            >
              The Modular Journey
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("price-calculators")}
            >
              Price Calculators & Estimator
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("store-locator")}
            >
              Guntur Experience Center
            </button>
          </div>

          <div className="footer-col">
            <h5>LOCATIONS SERVED</h5>
            <span>Guntur City (Syamala Nagar, Lakshmipuram)</span>
            <span>Amaravati Capital Region</span>
            <span>Vijayawada (Benz Circle, Kanuru)</span>
            <span>Mangalagiri & Tadepalli</span>
            <span>Selected Andhra Pradesh & Telangana Residences</span>
          </div>

          <div className="footer-col">
            <h5>GUNTUR FLAGSHIP STUDIO</h5>
            <p>Syamala Nagar Main Road, Guntur, AP – 522006</p>
            <p>Monday – Saturday: 10:00 AM – 8:30 PM</p>
            <a
              href="https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20visit%20your%20Guntur%20studio."
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
          <span>Syamala Nagar, Guntur, Andhra Pradesh</span>
        </div>
      </div>
    </footer>
  );
}
