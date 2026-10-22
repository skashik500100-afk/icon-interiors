export default function HeroSection({ onNavigate }) {
  const popularPills = [
    "Master Bedroom Designs",
    "Modular Kitchen Designs",
    "Living Room Designs",
    "Wardrobe Designs",
    "Bathroom Designs",
    "Pooja Room Designs"
  ];

  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay" />
      <div className="hero-glow" />

      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-sparkle">✦</span>
          <span>BESPOKE ARCHITECTURE & LUXURY RESIDENCES</span>
          <span className="badge-location">📍 GUNTUR FLAGSHIP STUDIO</span>
        </div>

        <h1 className="hero-headline">
          Extraordinary Spaces,
          <br />
          <span className="gold-text-gradient">Timelessly Crafted.</span>
        </h1>

        <p className="hero-subhead">
          We curate award-winning residential sanctuaries in Guntur & Andhra Pradesh — from grand double-height Italian living spaces
          and precision modular kitchens to serene master bedroom suites and wellness spa bathrooms.
        </p>

        <div className="hero-actions">
          <button
            onClick={() => onNavigate && onNavigate("design-ideas", "Master Bedroom Designs")}
            className="btn-gold-primary"
          >
            Explore Design Ideas <span className="btn-arrow">›</span>
          </button>
          <button
            onClick={() => onNavigate && onNavigate("how-it-works")}
            className="btn-coral-hero"
          >
            How It Works (5 Steps) ›
          </button>
          <button
            onClick={() => onNavigate && onNavigate("store-locator")}
            className="btn-outline-gold"
          >
            Visit Guntur Studio 📍
          </button>
        </div>

        <div className="hero-pills-row">
          <span className="pill-label">Popular Collections:</span>
          {popularPills.map((p) => (
            <button
              key={p}
              className="category-pill"
              onClick={() => onNavigate && onNavigate("design-ideas", p)}
            >
              {p.replace(/designs?/gi, "").trim()}
            </button>
          ))}
        </div>
      </div>

      <div className="hero-stats-bar">
        <div className="stat-card">
          <span className="stat-number">650+</span>
          <span className="stat-title">Luxury Homes Delivered</span>
          <span className="stat-detail">Turnkey Execution</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <span className="stat-number">45</span>
          <span className="stat-title">Days Guaranteed Handover</span>
          <span className="stat-detail">Or We Pay Delay Compensation</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <span className="stat-number">10</span>
          <span className="stat-title">Years Warranty</span>
          <span className="stat-detail">BWP Marine Grade Plywood</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-card">
          <span className="stat-number">1</span>
          <span className="stat-title">Exclusive Experience Center</span>
          <span className="stat-detail">Syamala Nagar, Guntur</span>
        </div>
      </div>
    </section>
  );
}
