import { BUSINESS_INFO, OFFICIAL_CATEGORIES } from "../data/designsData";

export default function Footer({ onNavigate, onOpenConsultation }) {
  return (
    <footer className="luxury-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <button
            className="footer-brand-btn"
            onClick={() => onNavigate && onNavigate("home")}
          >
            <span className="brand-seal">✦</span>
            <div className="brand-text">
              <strong>{BUSINESS_INFO.name}</strong>
              <small>BESPOKE ARCHITECTURE & LUXURY RESIDENCES</small>
            </div>
          </button>

          <p className="footer-manifesto">
            Crafting bespoke architectural residences, precision German modular joinery, and turnkey home
            transformations. Physical Flagship Experience Center on Syamala Nagar Main Road in Guntur, Andhra Pradesh.
          </p>

          <div className="footer-cta-col">
            <button
              onClick={() => onNavigate && onNavigate("store-locator")}
              className="footer-store-btn"
            >
              📍 Guntur Flagship Studio
            </button>
            <a href={`tel:${BUSINESS_INFO.whatsappNumber}`} className="footer-phone-cta">
              {BUSINESS_INFO.displayPhone}
            </a>
          </div>
        </div>

        <div className="footer-nav-grid">
          {/* Col 1: 11 Design Ideas */}
          <div className="footer-col">
            <h5>DESIGN IDEAS (11 ROOMS)</h5>
            {OFFICIAL_CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                className="footer-link-btn"
                onClick={() => onNavigate && onNavigate("design-ideas", cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="footer-col">
            <h5>MORE ROOMS & VILLAS</h5>
            {OFFICIAL_CATEGORIES.slice(6).map((cat) => (
              <button
                key={cat.id}
                className="footer-link-btn"
                onClick={() => onNavigate && onNavigate("design-ideas", cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Col 3: Essential Platform Tools */}
          <div className="footer-col">
            <h5>SERVICES & TOOLS</h5>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("services")}
            >
              Turnkey Architectural Services
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("projects")}
            >
              Completed Residences Portfolio
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("ai-makeover")}
            >
              ✦ AI Room Makeover
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("cost-estimator")}
            >
              Interior Cost Estimator
            </button>
            <button
              className="footer-link-btn"
              onClick={() => onNavigate && onNavigate("store-locator")}
            >
              Guntur Flagship Experience Center
            </button>
          </div>

          {/* Col 4: Verified Flagship Studio */}
          <div className="footer-col">
            <h5>FLAGSHIP STUDIO & HOURS</h5>
            <p className="footer-address-p">{BUSINESS_INFO.experienceCenter}</p>
            <p className="footer-hours-p">⏱️ {BUSINESS_INFO.workingHours}</p>
            <button className="footer-consult-link" onClick={onOpenConsultation}>
              Book Free Architectural Consultation ›
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>45-Day Handover Guarantee</span>
            <span>•</span>
            <span>10-Year Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
