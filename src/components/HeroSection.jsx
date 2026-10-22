export default function HeroSection({ onOpenAIStudio }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay" />
      <div className="hero-glow" />

      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-sparkle">✦</span>
          <span>BESPOKE ARCHITECTURE & LUXURY RESIDENCES</span>
          <span className="badge-location">AP & TELANGANA</span>
        </div>

        <h1 className="hero-headline">
          Extraordinary Spaces,
          <br />
          <span className="gold-text-gradient">Timelessly Crafted.</span>
        </h1>

        <p className="hero-subhead">
          We curate award-winning residential sanctuaries — from grand double-height Italian living spaces
          and precision modular kitchens to serene Japandi master suites and wellness spa bathrooms.
        </p>

        <div className="hero-actions">
          <a href="#gallery" className="btn-gold-primary">
            Explore All 16+ Home Designs <span className="btn-arrow">↓</span>
          </a>
          <button onClick={onOpenAIStudio} className="btn-ai-hero">
            <span className="sparkle">✦</span> Launch Gemini AI Designer
          </button>
          <a href="#estimator" className="btn-outline-gold">
            Instant Cost Calculator ↗
          </a>
        </div>

        <div className="hero-pills-row">
          <span className="pill-label">Popular Categories:</span>
          <a href="#gallery" className="category-pill">Modular Italian Kitchens</a>
          <a href="#gallery" className="category-pill">Japandi Suites</a>
          <a href="#gallery" className="category-pill">Marble Bathrooms</a>
          <a href="#gallery" className="category-pill">Walk-in Closets</a>
          <a href="#gallery" className="category-pill">Heritage Pooja Mandirs</a>
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
          <span className="stat-number">15+</span>
          <span className="stat-title">Design Excellence Awards</span>
          <span className="stat-detail">Top Architectural Studio</span>
        </div>
      </div>
    </section>
  );
}
