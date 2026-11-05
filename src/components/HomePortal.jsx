import { useState } from "react";
import {
  OFFICIAL_CATEGORIES,
  DESIGNS_DATABASE,
  CLIENT_TESTIMONIALS,
  FIVE_STATES_CITIES,
  BUSINESS_INFO,
  BEFORE_AFTER_GALLERY
} from "../data/designsData";

export default function HomePortal({
  onNavigate,
  onOpenConsultation,
  selectedCity = "Guntur, AP"
}) {
  const [activeBeforeAfterTab, setActiveBeforeAfterTab] = useState(0);
  const [estimatorBhk, setEstimatorBhk] = useState("3 BHK");
  const [estimatorTier, setEstimatorTier] = useState("signature");

  // Instant Cost Preview calculation for Section H
  const costEstimates = {
    "2 BHK": { essential: "₹7.5L - ₹9.5L", signature: "₹10.5L - ₹13.5L", couture: "₹16.0L - ₹21.0L" },
    "3 BHK": { essential: "₹10.5L - ₹13.0L", signature: "₹14.5L - ₹18.5L", couture: "₹22.0L - ₹29.0L" },
    "4 BHK": { essential: "₹14.0L - ₹18.0L", signature: "₹19.5L - ₹25.0L", couture: "₹30.0L - ₹40.0L" },
    "Villa": { essential: "₹22.0L - ₹30.0L", signature: "₹32.0L - ₹45.0L", couture: "₹50.0L - ₹75.0L" }
  };

  const getWhatsAppEnquiry = (context = "General Consultation") => {
    const text = `Hello ICON INTERIORS! I am visiting your website from ${selectedCity} and would like to enquire about: ${context}.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="home-portal-redesign">
      {/* =====================================================================
          SECTION A: HERO SECTION
          ===================================================================== */}
      <section className="portal-hero-section" id="hero">
        <div className="hero-backdrop-glow" />
        <div className="hero-content-container">
          <div className="hero-tag-badge">
            <span className="sparkle-gold">✦</span>
            <span>AWARD-WINNING BESPOKE RESIDENTIAL ARCHITECTURE</span>
            <span className="location-pin">📍 GUNTUR FLAGSHIP STUDIO</span>
          </div>

          <h1 className="hero-main-title">
            Designing Spaces.
            <br />
            <span className="gold-text-gradient">Defining Lifestyles.</span>
          </h1>

          <p className="hero-supporting-text">
            From double-height Italian marble living salons and German modular kitchens to serene master
            suites and wellness bathrooms. We craft extraordinary residences across Guntur, Andhra Pradesh,
            and Southern India with factory-built precision and a 45-day handover guarantee.
          </p>

          <div className="hero-cta-button-group">
            <button
              className="btn-hero-primary"
              onClick={() => onNavigate && onNavigate("design-ideas")}
            >
              <span>Explore Design Ideas</span>
              <span className="btn-arrow">›</span>
            </button>

            <button
              className="btn-hero-secondary"
              onClick={onOpenConsultation}
            >
              <span>Get Free Consultation</span>
              <span className="btn-arrow">›</span>
            </button>

            <a
              href={getWhatsAppEnquiry("Flagship Studio Visit")}
              target="_blank"
              rel="noreferrer"
              className="btn-hero-outline-wa"
            >
              <span>💬 Chat on WhatsApp</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-ribbon">
            <div className="metric-pill">
              <strong>45 Days</strong>
              <small>Move-in Handover Guarantee</small>
            </div>
            <div className="metric-divider" />
            <div className="metric-pill">
              <strong>10 Years</strong>
              <small>Comprehensive Warranty</small>
            </div>
            <div className="metric-divider" />
            <div className="metric-pill">
              <strong>BWP 710</strong>
              <small>Boiling Waterproof Marine Ply</small>
            </div>
            <div className="metric-divider" />
            <div className="metric-pill">
              <strong>4,500 sq.ft</strong>
              <small>Flagship Experience Studio in Guntur</small>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B: 10 DESIGN CATEGORIES
          ===================================================================== */}
      <section className="home-section-wrapper bg-surface" id="categories">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="eyebrow-gold">EXPLORE BY ROOM</span>
            <h2>Curated Design Categories</h2>
            <p>Select any room category to discover bespoke architectural concepts tailored to your lifestyle.</p>
          </div>

          <div className="categories-mosaic-grid">
            {OFFICIAL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="category-mosaic-card"
                onClick={() => onNavigate && onNavigate("design-ideas", cat.name)}
              >
                <div className="category-mosaic-header">
                  <span className="mosaic-glyph">{cat.icon}</span>
                  <span className="mosaic-count">{cat.count}+ Concepts</span>
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="mosaic-explore-link">Explore Designs ›</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION C: FEATURED DESIGN IDEAS
          ===================================================================== */}
      <section className="home-section-wrapper" id="featured-designs">
        <div className="section-container">
          <div className="section-heading-flex">
            <div>
              <span className="eyebrow-gold">PORTFOLIO SPOTLIGHT</span>
              <h2>Featured Architectural Concepts</h2>
              <p>Handpicked designs showcasing timeless proportions, premium materials, and German joinery.</p>
            </div>
            <button
              className="btn-view-all-link"
              onClick={() => onNavigate && onNavigate("design-ideas")}
            >
              View All 11 Categories ›
            </button>
          </div>

          <div className="featured-cards-grid">
            {DESIGNS_DATABASE.filter((d) => d.featured).slice(0, 4).map((item) => (
              <div key={item.id} className="featured-design-card">
                <div className="featured-card-media-box">
                  <div className="neutral-luxury-placeholder">
                    <div className="placeholder-blueprint-grid" />
                    <div className="placeholder-content">
                      <span className="placeholder-room-glyph">✦</span>
                      <div className="placeholder-id-stamp">
                        <span className="stamp-label">CURATED DESIGN</span>
                        <span className="stamp-id">{item.id}</span>
                      </div>
                      <span className="placeholder-status-tag">READY FOR PRODUCTION</span>
                    </div>
                  </div>
                  <span className="featured-category-badge">{item.category}</span>
                </div>
                <div className="featured-card-info">
                  <span className="featured-style-tag">{item.style}</span>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div className="featured-card-bottom">
                    <span className="budget-tag">{item.budget}</span>
                    <button
                      className="btn-details-sm"
                      onClick={() => onNavigate && onNavigate("design-ideas", item.category)}
                    >
                      Explore Room ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION D: OUR SERVICES
          ===================================================================== */}
      <section className="home-section-wrapper bg-surface" id="services">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="eyebrow-gold">END-TO-END EXPERTISE</span>
            <h2>Our Architectural Services</h2>
            <p>From initial blueprint to final styling, we provide 100% turnkey residential solutions.</p>
          </div>

          <div className="services-five-pillars-grid">
            <div className="service-pillar-card">
              <span className="pillar-num">01</span>
              <div className="pillar-icon">🏛️</div>
              <h3>Turnkey Residential Architecture</h3>
              <p>Complete end-to-end design, civil modifications, electrical, plumbing, false ceiling, and furnishings.</p>
              <ul className="pillar-checklist">
                <li>Zero coordination hassle</li>
                <li>Single point of accountability</li>
                <li>45-day guaranteed move-in</li>
              </ul>
            </div>

            <div className="service-pillar-card">
              <span className="pillar-num">02</span>
              <div className="pillar-icon">🍳</div>
              <h3>German Precision Modular Kitchens</h3>
              <p>Engineered exclusively with BWP 710 boiling waterproof plywood and German Blum / Hafele hardware.</p>
              <ul className="pillar-checklist">
                <li>Anti-fingerprint acrylic & quartz</li>
                <li>Motorized servo-drive drawers</li>
                <li>Lifetime hardware warranty</li>
              </ul>
            </div>

            <div className="service-pillar-card">
              <span className="pillar-num">03</span>
              <div className="pillar-icon">🚪</div>
              <h3>Bespoke Wardrobes & Walk-In Closets</h3>
              <p>Floor-to-ceiling Italian aluminum profile wardrobes with fluted glass, sensor LEDs, and velvet organizers.</p>
              <ul className="pillar-checklist">
                <li>Custom modular configurations</li>
                <li>Smart integrated illumination</li>
                <li>Dust-proof soft-close tracks</li>
              </ul>
            </div>

            <div className="service-pillar-card">
              <span className="pillar-num">04</span>
              <div className="pillar-icon">👓</div>
              <h3>3D Spatial Planning & VR Experience</h3>
              <p>Experience your exact floor plan in photorealistic 3D and immersive VR before executing a single brick.</p>
              <ul className="pillar-checklist">
                <li>Millimeter-accurate CAD blueprints</li>
                <li>Real material tactile swatches</li>
                <li>Zero surprises during handover</li>
              </ul>
            </div>

            <div className="service-pillar-card">
              <span className="pillar-num">05</span>
              <div className="pillar-icon">💡</div>
              <h3>False Ceiling & MEP Lighting</h3>
              <p>Architectural coves, shadowline negative details, and magnetic DC48V tracks creating mood layers.</p>
              <ul className="pillar-checklist">
                <li>Saint-Gobain Gyproc framing</li>
                <li>High-CRI 90+ architectural LEDs</li>
                <li>Smart home lighting scenes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION E: COMPLETED PROJECTS
          ===================================================================== */}
      <section className="home-section-wrapper" id="projects">
        <div className="section-container">
          <div className="section-heading-flex">
            <div>
              <span className="eyebrow-gold">PROVEN TRACK RECORD</span>
              <h2>Delivered Residences</h2>
              <p>Explore recently completed residential sanctuaries in Guntur, Vijayawada, and Amaravati.</p>
            </div>
            <button
              className="btn-view-all-link"
              onClick={() => onNavigate && onNavigate("projects")}
            >
              View Project Portfolio ›
            </button>
          </div>

          <div className="projects-showcase-grid">
            <div className="project-display-card">
              <div className="project-media-box">
                <div className="neutral-luxury-placeholder">
                  <div className="placeholder-blueprint-grid" />
                  <div className="placeholder-content">
                    <span className="placeholder-room-glyph">🏡</span>
                    <span className="stamp-id">PRJ-GNT-401</span>
                    <span className="placeholder-status-tag">COMPLETED // HANDED OVER</span>
                  </div>
                </div>
                <span className="project-city-tag">📍 Syamala Nagar, Guntur</span>
              </div>
              <div className="project-details-body">
                <h3>The Grand Statuario Penthouse</h3>
                <span className="project-meta-line">4,200 sq.ft Duplex • 42 Days Execution • Turnkey</span>
                <p>Double-volume living salon with bookmatched Italian travertine, German island kitchen, and private terrace lounge.</p>
              </div>
            </div>

            <div className="project-display-card">
              <div className="project-media-box">
                <div className="neutral-luxury-placeholder">
                  <div className="placeholder-blueprint-grid" />
                  <div className="placeholder-content">
                    <span className="placeholder-room-glyph">🏛️</span>
                    <span className="stamp-id">PRJ-VJW-204</span>
                    <span className="placeholder-status-tag">COMPLETED // HANDED OVER</span>
                  </div>
                </div>
                <span className="project-city-tag">📍 Benz Circle, Vijayawada</span>
              </div>
              <div className="project-details-body">
                <h3>Japandi Serenity 3 BHK</h3>
                <span className="project-meta-line">2,400 sq.ft Residence • 35 Days Execution • Bespoke</span>
                <p>Natural acoustic slatted white oak paneling, sunken formal seating, and integrated smart DALI lighting scenes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION F: BEFORE AND AFTER TRANSFORMATIONS
          ===================================================================== */}
      <section className="home-section-wrapper bg-surface" id="before-after">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="eyebrow-gold">DRAMATIC TRANSFORMATIONS</span>
            <h2>Before & After Showcases</h2>
            <p>Witness how raw brick shells and outdated spaces turn into timeless luxury residences.</p>
          </div>

          <div className="before-after-interactive-container">
            <div className="ba-tabs-row">
              {BEFORE_AFTER_GALLERY.map((item, idx) => (
                <button
                  key={item.id}
                  className={`ba-tab-btn ${activeBeforeAfterTab === idx ? "active" : ""}`}
                  onClick={() => setActiveBeforeAfterTab(idx)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {BEFORE_AFTER_GALLERY[activeBeforeAfterTab] && (
              <div className="ba-comparison-display">
                <div className="ba-side-col">
                  <span className="ba-badge before">BEFORE (RAW SHELL)</span>
                  <img
                    src={BEFORE_AFTER_GALLERY[activeBeforeAfterTab].beforeImage}
                    alt="Before transformation"
                    className="ba-photo"
                  />
                </div>
                <div className="ba-divider-arrow">➔</div>
                <div className="ba-side-col">
                  <span className="ba-badge after">AFTER (ICON INTERIORS HANDOVER)</span>
                  <img
                    src={BEFORE_AFTER_GALLERY[activeBeforeAfterTab].afterImage}
                    alt="After luxury transformation"
                    className="ba-photo"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION G: AI ROOM MAKEOVER INTRODUCTION
          ===================================================================== */}
      <section className="home-section-wrapper ai-feature-banner-wrap" id="ai-makeover">
        <div className="section-container">
          <div className="ai-feature-banner-card">
            <div className="ai-banner-content">
              <span className="ai-glow-tag">✦ NEXT-GEN AI ARCHITECTURAL STUDIO</span>
              <h2>Reimagine Your Room in Seconds with AI</h2>
              <p>
                Upload a photo of your current living room, bedroom, or raw concrete flat.
                Select your preferred interior style (Japandi, Luxury Italian, Minimalist),
                and let our AI studio generate bespoke redesign concepts with estimated budgets.
              </p>
              <div className="ai-banner-buttons">
                <button
                  className="btn-gold-primary"
                  onClick={() => onNavigate && onNavigate("ai-makeover")}
                >
                  <span>Launch AI Room Makeover</span>
                  <span className="btn-arrow">›</span>
                </button>
                <span className="ai-note-text">Instant Concept Generation • 100% Free</span>
              </div>
            </div>
            <div className="ai-banner-graphic">
              <div className="ai-hologram-visual">
                <span className="hologram-icon">🤖</span>
                <span className="hologram-label">AI RENDERING ENGINE</span>
                <span className="hologram-sub">UPLOAD PHOTO ➔ INSTANT MAKEOVER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION H: INTERIOR COST ESTIMATOR INTRODUCTION
          ===================================================================== */}
      <section className="home-section-wrapper" id="cost-estimator">
        <div className="section-container">
          <div className="estimator-teaser-card">
            <div className="estimator-teaser-header">
              <span className="eyebrow-gold">TRANSPARENT PRICING</span>
              <h2>Calculate Your Interior Cost Estimate</h2>
              <p>Get an indicative price range in seconds based on your home size and preferred finish quality.</p>
            </div>

            <div className="estimator-interactive-preview">
              <div className="estimator-selector-row">
                <div className="selector-group">
                  <label>Select Home Size:</label>
                  <div className="pills-toggle">
                    {["2 BHK", "3 BHK", "4 BHK", "Villa"].map((size) => (
                      <button
                        key={size}
                        className={`pill-toggle-btn ${estimatorBhk === size ? "active" : ""}`}
                        onClick={() => setEstimatorBhk(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="selector-group">
                  <label>Finish Standard:</label>
                  <div className="pills-toggle">
                    {[
                      { id: "essential", label: "Essential" },
                      { id: "signature", label: "Signature (Popular)" },
                      { id: "couture", label: "Haute Couture" }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        className={`pill-toggle-btn ${estimatorTier === tier.id ? "active" : ""}`}
                        onClick={() => setEstimatorTier(tier.id)}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="estimator-result-highlight">
                <span className="result-label">INDICATIVE BUDGET RANGE</span>
                <h3 className="result-price">
                  {costEstimates[estimatorBhk][estimatorTier]}
                </h3>
                <small className="result-disclaimer">
                  *Indicative cost for materials, modular joinery, labor, and installation. Final quote requires site measurement.
                </small>
              </div>

              <div className="estimator-cta-row">
                <button
                  className="btn-gold-primary"
                  onClick={() => onNavigate && onNavigate("cost-estimator")}
                >
                  Open Full Room-by-Room Estimator ›
                </button>
                <button
                  className="btn-outline-white"
                  onClick={onOpenConsultation}
                >
                  Request Exact Site Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION I: WHY CHOOSE ICON INTERIORS
          ===================================================================== */}
      <section className="home-section-wrapper bg-surface" id="why-us">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="eyebrow-gold">UNCOMPROMISING QUALITY</span>
            <h2>Why Choose ICON INTERIORS?</h2>
            <p>We blend world-class European engineering with on-ground execution excellence in Andhra Pradesh.</p>
          </div>

          <div className="why-us-cards-grid">
            <div className="why-card">
              <span className="why-icon">🛡️</span>
              <h3>BWP 710 Marine Plywood</h3>
              <p>We strictly refuse commercial MDF or cheap particle board for kitchens and wet zones. Only 100% boiling waterproof marine ply.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">⚙️</span>
              <h3>Factory CNC Precision</h3>
              <p>All cabinets and wardrobes are precision-manufactured in our German CNC joinery factory with zero chipping and millimeter fitment.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">⏱️</span>
              <h3>45-Day Handover Guarantee</h3>
              <p>We respect your moving date. If we delay beyond 45 days post design sign-off, we pay you a penalty for every day of delay.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">📜</span>
              <h3>10-Year Comprehensive Warranty</h3>
              <p>Complete peace of mind backed by a written 10-year warranty on modular woodwork and lifetime service support.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">🏢</span>
              <h3>4,500 sq.ft Flagship Studio</h3>
              <p>No virtual-only promises. Visit our live physical experience center on Syamala Nagar Main Road in Guntur to test every finish.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">💰</span>
              <h3>Zero Cost Escalation</h3>
              <p>The price quoted on your approved quotation is the price you pay. 100% transparent bill of quantities with zero hidden surprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION J: CUSTOMER TESTIMONIALS
          ===================================================================== */}
      <section className="home-section-wrapper" id="testimonials">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="eyebrow-gold">CLIENT EXPERIENCES</span>
            <h2>What Homeowners Say</h2>
            <p>Real stories from families across Guntur, Vijayawada, and Amaravati who trust ICON INTERIORS.</p>
          </div>

          <div className="testimonials-cards-grid">
            {CLIENT_TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-quote-card">
                <div className="stars-row">{"★".repeat(t.rating)}</div>
                <blockquote className="quote-text">"{t.quote}"</blockquote>
                <div className="client-footer">
                  <strong>{t.client}</strong>
                  <span>📍 {t.location}</span>
                  <span className="project-highlight">{t.project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION K: CITIES WE SERVE
          ===================================================================== */}
      <section className="home-section-wrapper bg-surface" id="cities">
        <div className="section-container">
          <div className="section-heading-center">
            <span className="eyebrow-gold">OUR REGIONAL PRESENCE</span>
            <h2>Cities We Serve</h2>
            <p>Physical studio in Guntur with on-site design and turnkey delivery teams across Southern India.</p>
          </div>

          <div className="states-showcase-grid">
            {Object.entries(FIVE_STATES_CITIES).map(([stateName, cities]) => (
              <div key={stateName} className="state-coverage-card">
                <h3>{stateName}</h3>
                <div className="cities-chips-list">
                  {cities.map((c) => (
                    <span
                      key={c.name}
                      className={`city-chip ${selectedCity && selectedCity.includes(c.name) ? "current" : ""}`}
                      onClick={() => onNavigate && onNavigate("cities")}
                    >
                      {c.name} {c.name === "Guntur" && "★ Studio"}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION L: STORE LOCATOR (GUNTUR FLAGSHIP STUDIO)
          ===================================================================== */}
      <section className="home-section-wrapper" id="store-locator">
        <div className="section-container">
          <div className="store-spotlight-box">
            <div className="store-info-side">
              <span className="eyebrow-gold">VISIT US IN PERSON</span>
              <h2>Guntur Flagship Experience Center</h2>
              <p className="store-lead">
                Touch over 40+ imported marble samples, test German Blum soft-close modular kitchens,
                and review life-size master bedroom suites with our principal architects.
              </p>

              <div className="store-address-block">
                <div className="address-item">
                  <strong>Address:</strong>
                  <span>{BUSINESS_INFO.experienceCenter}</span>
                </div>
                <div className="address-item">
                  <strong>Working Hours:</strong>
                  <span>{BUSINESS_INFO.workingHours}</span>
                </div>
                <div className="address-item">
                  <strong>Phone / Direct Consultation:</strong>
                  <span>{BUSINESS_INFO.phone}</span>
                </div>
              </div>

              <div className="store-actions-row">
                <button
                  className="btn-gold-primary"
                  onClick={() => onNavigate && onNavigate("store-locator")}
                >
                  View Studio Details & Directions ›
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.experienceCenter)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-white"
                >
                  📍 Open in Google Maps
                </a>
              </div>
            </div>

            <div className="store-visual-side">
              <div className="store-mockup-frame">
                <div className="store-badge-overlay">
                  <span>4,500 SQ.FT STUDIO</span>
                  <span>GUNTUR FLAGSHIP</span>
                </div>
                <div className="neutral-luxury-placeholder">
                  <div className="placeholder-blueprint-grid" />
                  <div className="placeholder-content">
                    <span className="placeholder-room-glyph">🏢</span>
                    <span className="stamp-id">SYAMALA NAGAR MAIN ROAD</span>
                    <span className="placeholder-status-tag">EXPERIENCE CENTER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION M: CONTACT & DIRECT WHATSAPP ENQUIRY
          ===================================================================== */}
      <section className="home-section-wrapper bg-surface" id="contact">
        <div className="section-container">
          <div className="consultation-booking-box">
            <div className="booking-intro">
              <span className="eyebrow-gold">START YOUR PROJECT</span>
              <h2>Book a Free Design Consultation</h2>
              <p>Speak with our principal interior architect regarding your upcoming floor plan, budget, and timeline.</p>
              <div className="contact-fast-links">
                <a href={`tel:${BUSINESS_INFO.whatsappNumber}`} className="fast-link-item">
                  📞 {BUSINESS_INFO.displayPhone}
                </a>
                <a href={`mailto:${BUSINESS_INFO.email}`} className="fast-link-item">
                  ✉️ {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="booking-cta-panel">
              <button
                className="btn-gold-primary large-cta"
                onClick={onOpenConsultation}
              >
                <span>Request Comprehensive Site Consultation</span>
                <span className="btn-arrow">›</span>
              </button>

              <a
                href={getWhatsAppEnquiry("Direct Website Enquiry")}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp-large"
              >
                <span>💬 Direct Consultation on WhatsApp</span>
                <span className="btn-arrow">›</span>
              </a>

              <p className="instant-call-note">
                Our Guntur architectural team replies within 15 minutes during studio hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
