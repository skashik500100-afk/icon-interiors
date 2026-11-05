import { BUSINESS_INFO } from "../data/designsData";

export default function AboutView({ onNavigate, onOpenConsultation }) {
  return (
    <div className="about-page-container">
      <header className="about-page-header">
        <div className="about-header-content">
          <div className="about-badge">
            <span className="badge-spark">✦</span>
            <span>ARCHITECTURAL PHILOSOPHY & HERITAGE</span>
          </div>
          <h1>
            Crafting Extraordinary Sanctuaries, <span className="gold-text-gradient">Timelessly Designed.</span>
          </h1>
          <p>
            ICON INTERIORS was founded with a singular conviction: luxury residences should not rely
            on messy on-site carpentry guesswork or escalating budgets. We combine architectural rigor,
            precision German CNC manufacturing, and tactile natural materiality.
          </p>
        </div>
      </header>

      {/* Story & Pillars Section */}
      <section className="about-narrative-section">
        <div className="narrative-grid">
          <div className="narrative-card">
            <span className="narrative-icon">🏛️</span>
            <h3>Architectural Integrity</h3>
            <p>
              Every home begins with spatial analysis, sightlines, natural ventilation, and human circulation.
              Our principal architects craft balanced proportions before selecting a single color or finish.
            </p>
          </div>

          <div className="narrative-card">
            <span className="narrative-icon">⚙️</span>
            <h3>Factory-Built Precision</h3>
            <p>
              By manufacturing all modular cabinetry, wardrobes, and paneling in our automated German joinery
              facility, we eliminate on-site dust, inaccurate cuts, and delayed timelines.
            </p>
          </div>

          <div className="narrative-card">
            <span className="narrative-icon">📜</span>
            <h3>100% Transparent Contracts</h3>
            <p>
              We provide a comprehensive, itemized Bill of Quantities (BOQ). The price you sign off on is the
              final price you pay — zero unexpected mid-project price escalations.
            </p>
          </div>
        </div>
      </section>

      {/* Studio Milestone Highlight */}
      <section className="about-flagship-spotlight">
        <div className="spotlight-box">
          <div className="spotlight-text">
            <span className="eyebrow-gold">OUR PHYSICAL HOME</span>
            <h2>The 4,500 sq.ft Guntur Experience Studio</h2>
            <p>
              Located in Syamala Nagar, Guntur, our physical studio was created so homeowners can touch, test,
              and experience materials before making decisions.
            </p>
            <div className="studio-perks-list">
              <div>✓ Life-size modular kitchen with German Blum hardware</div>
              <div>✓ 40+ imported Italian marble, travertine, and quartz slabs</div>
              <div>✓ Walk-in glass wardrobe boutique dressing setups</div>
              <div>✓ 3D Virtual Reality spatial immersion theater</div>
            </div>
            <button
              className="btn-gold-primary"
              onClick={() => onNavigate && onNavigate("store-locator")}
            >
              Explore Guntur Studio Details ›
            </button>
          </div>

          <div className="spotlight-visual">
            <div className="neutral-luxury-placeholder">
              <div className="placeholder-blueprint-grid" />
              <div className="placeholder-content">
                <span className="placeholder-room-glyph">🏢</span>
                <span className="stamp-id">SYAMALA NAGAR, GUNTUR</span>
                <span className="placeholder-status-tag">EXPERIENCE CENTER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="about-stats-ribbon">
        <div className="stats-container">
          <div className="stat-item">
            <strong>{BUSINESS_INFO.stats.homesCompleted}</strong>
            <span>Homes Crafted</span>
          </div>
          <div className="stat-item">
            <strong>{BUSINESS_INFO.stats.sqftDelivered}</strong>
            <span>Sq.ft Delivered</span>
          </div>
          <div className="stat-item">
            <strong>{BUSINESS_INFO.stats.ontimeGuaranteeDays}</strong>
            <span>Move-in Guarantee</span>
          </div>
          <div className="stat-item">
            <strong>{BUSINESS_INFO.stats.warrantyYears}</strong>
            <span>Written Warranty</span>
          </div>
        </div>
      </section>

      {/* CTA Ribbon */}
      <section className="about-cta-ribbon" style={{ textAlign: "center", padding: "60px 24px", background: "rgba(22, 18, 12, 0.6)", borderTop: "1px solid rgba(212, 178, 111, 0.2)" }}>
        <h2 style={{ fontSize: "28px", color: "var(--text-primary, #fff)", marginBottom: "12px", fontFamily: "var(--font-serif, serif)" }}>
          Experience Exceptional Craftsmanship
        </h2>
        <p style={{ color: "var(--text-secondary, #b8b0a5)", maxWidth: "600px", margin: "0 auto 28px" }}>
          Schedule a personalized design consultation at our Guntur Flagship Studio or connect with our senior interior architects online.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-gold-primary" onClick={onOpenConsultation}>
            Book Design Consultation ›
          </button>
          {onNavigate && (
            <button className="btn-outline-gold" onClick={() => onNavigate("projects")}>
              View Completed Projects ›
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
