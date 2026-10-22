import { useState, useMemo } from "react";
import {
  CATEGORY_INFO,
  getCategoryDesigns
} from "../data/designsData";

export default function DesignIdeasView({
  category = "Master Bedroom Designs",
  onSelectCategory,
  onNavigate,
  favorites = [],
  onToggleFavorite,
  selectedCity = "Guntur, AP"
}) {
  const [selectedStyleFilter, setSelectedStyleFilter] = useState("All");
  const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
  const [trendingSlideIndex, setTrendingSlideIndex] = useState(0);

  // Get metadata info for current category
  const info = CATEGORY_INFO[category] || {
    heading: `${category.replace(/designs?/gi, "").trim()} Interior Designs`,
    tagline: `Thoughtfully Crafted Spaces for Modern Living.`,
    description: `At ICON INTERIORS, we create bespoke ${category.toLowerCase()} that combine architectural elegance, premium materials, and bespoke craftsmanship to make your dream home come alive.`,
    trendingTitle: `Top Trending ${category.replace(/designs?/gi, "").trim()} Designs`,
    trendingSub: `Design ideas chosen by ICON INTERIORS homeowners in October, 2026`
  };

  // Get at least 10 high-resolution designs for this category
  const allDesigns = useMemo(() => {
    return getCategoryDesigns(category);
  }, [category]);

  // Unique styles for filtering
  const stylesList = useMemo(() => {
    const set = new Set(["All"]);
    allDesigns.forEach((d) => {
      if (d.style) set.add(d.style);
    });
    return Array.from(set);
  }, [allDesigns]);

  // Filtered designs
  const filteredDesigns = useMemo(() => {
    if (selectedStyleFilter === "All") return allDesigns;
    return allDesigns.filter((d) => d.style === selectedStyleFilter);
  }, [allDesigns, selectedStyleFilter]);

  // Top trending designs for the carousel (first 3)
  const trendingDesigns = useMemo(() => {
    return allDesigns.slice(0, 3);
  }, [allDesigns]);

  const handleNextSlide = () => {
    setTrendingSlideIndex((prev) => (prev + 1) % trendingDesigns.length);
  };

  const handlePrevSlide = () => {
    setTrendingSlideIndex((prev) => (prev - 1 + trendingDesigns.length) % trendingDesigns.length);
  };

  const getWhatsAppEnquiryUrl = (designTitle) => {
    const text = `Hello ICON INTERIORS! I am interested in the "${designTitle}" (${category}) for my residence in ${selectedCity}. Please share the detailed brochure and estimate.`;
    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  // List of primary category tabs for rapid switching
  const primaryCategories = [
    "Master Bedroom Designs",
    "Modular Kitchen Designs",
    "Living Room Designs",
    "Wardrobe Designs",
    "Bathroom Designs",
    "Pooja Room Designs",
    "TV Unit Designs",
    "False Ceiling Designs",
    "Kids Bedroom Designs",
    "Dining Room Designs"
  ];

  return (
    <div className="design-ideas-page-container">
      {/* Category Quick Pills Switcher Bar */}
      <div className="category-switcher-bar">
        <div className="category-switcher-inner">
          <span className="switcher-label">Rooms:</span>
          {primaryCategories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill-btn ${category === cat ? "active" : ""}`}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(cat);
                setSelectedStyleFilter("All");
                setTrendingSlideIndex(0);
              }}
            >
              {cat.replace(/designs?/gi, "").trim()}
            </button>
          ))}
        </div>
      </div>

      <div className="design-ideas-content-wrap">
        {/* =========================================================================
            HEADER SECTION (IMAGE 2 STYLE)
            - Red vertical bar + Bold Title
            - Tagline & Description with expandable Read More
            ========================================================================= */}
        <header className="design-ideas-hero-header">
          <div className="header-title-row">
            <span className="accent-vertical-bar" />
            <h1 className="ideas-main-heading">{info.heading}</h1>
          </div>

          <div className="ideas-lead-text">
            <strong>{info.tagline} </strong>
            <span>
              {isReadMoreExpanded
                ? info.description
                : `${info.description.slice(0, 150)}...`}
            </span>
            <button
              className="read-more-toggle-btn"
              onClick={() => setIsReadMoreExpanded(!isReadMoreExpanded)}
            >
              {isReadMoreExpanded ? "Read Less ⌃" : "Read More ⌵"}
            </button>
          </div>
        </header>

        {/* =========================================================================
            TOP TRENDING DESIGNS CAROUSEL BANNER (IMAGE 2 STYLE)
            - Salmon/pink tinted highlight card
            - Flame icon badge
            - Horizontal showcase with next/prev arrows
            ========================================================================= */}
        <section className="top-trending-banner-card">
          <div className="trending-banner-top">
            <div className="trending-badge-icon">
              <span className="flame-glyph">🔥</span>
            </div>
            <div className="trending-title-group">
              <h2 className="trending-heading">{info.trendingTitle}</h2>
              <p className="trending-subheading">
                Design ideas chosen by ICON INTERIORS homeowners in October, 2026
              </p>
            </div>
          </div>

          {/* Trending Cards Row / Carousel */}
          <div className="trending-carousel-wrapper">
            <div className="trending-cards-grid">
              {trendingDesigns.map((item, idx) => (
                <div
                  key={item.id}
                  className={`trending-design-card ${idx === trendingSlideIndex ? "slide-focused" : ""}`}
                >
                  <div className="trending-image-box">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="trending-rank-tag">#{idx + 1} Trending</span>
                    <button
                      className={`trending-fav-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
                      onClick={() => onToggleFavorite && onToggleFavorite(item.id)}
                      title="Save to favorites"
                    >
                      ♥
                    </button>
                  </div>
                  <div className="trending-meta-box">
                    <h3 className="trending-item-title">{item.title}</h3>
                    <div className="trending-specs-pill">
                      <span>{item.style}</span>
                      <span>•</span>
                      <span>{item.sqft}</span>
                      <span>•</span>
                      <strong className="trending-price">{item.budget}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel navigation arrows */}
            <button
              className="trending-nav-arrow prev-arrow"
              onClick={handlePrevSlide}
              aria-label="Previous trending design"
              title="Previous design"
            >
              ‹
            </button>
            <button
              className="trending-nav-arrow next-arrow"
              onClick={handleNextSlide}
              aria-label="Next trending design"
              title="Next design"
            >
              ›
            </button>
          </div>
        </section>

        {/* =========================================================================
            STYLE FILTER TABS & STATS BAR
            ========================================================================= */}
        <div className="designs-filter-toolbar">
          <div className="filter-pills-wrap">
            <span className="filter-label">Filter by Aesthetic:</span>
            {stylesList.map((st) => (
              <button
                key={st}
                className={`filter-chip-btn ${selectedStyleFilter === st ? "active" : ""}`}
                onClick={() => setSelectedStyleFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="designs-count-indicator">
            Showing <strong>{filteredDesigns.length}</strong> bespoke designs in {category}
          </div>
        </div>

        {/* =========================================================================
            MAIN DESIGNS GRID (GUARANTEED AT LEAST 10 HIGH-RES IMAGES)
            ========================================================================= */}
        <div className="category-designs-grid">
          {filteredDesigns.map((design, index) => {
            const isFav = favorites.includes(design.id);
            return (
              <article key={design.id} className="design-showcase-card">
                <div className="card-media-wrapper">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="card-main-img"
                    loading="lazy"
                  />
                  <div className="card-floating-badges">
                    <span className="badge-style">{design.style}</span>
                    <button
                      className={`card-heart-btn ${isFav ? "active" : ""}`}
                      onClick={() => onToggleFavorite && onToggleFavorite(design.id)}
                      aria-label="Save to favorites"
                    >
                      {isFav ? "♥" : "♡"}
                    </button>
                  </div>
                  <span className="card-index-watermark">0{index + 1}</span>
                </div>

                <div className="card-body">
                  <div className="card-title-row">
                    <h3 className="card-title">{design.title}</h3>
                    <span className="card-budget-badge">{design.budget}</span>
                  </div>

                  <p className="card-description">{design.description}</p>

                  {design.materials && design.materials.length > 0 && (
                    <div className="card-materials-tags">
                      {design.materials.map((mat) => (
                        <span key={mat} className="mat-tag">
                          {mat}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="card-footer-actions">
                    <span className="card-sqft-detail">Area: {design.sqft}</span>
                    <a
                      href={getWhatsAppEnquiryUrl(design.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="card-enquire-btn"
                    >
                      Get Quote on WhatsApp ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM CONSULTATION BANNER
            ========================================================================= */}
        <section className="category-cta-banner">
          <div className="cta-banner-content">
            <h3>Need a custom 3D design for your {category.replace(/designs?/gi, "").trim()}?</h3>
            <p>
              Visit our Flagship Experience Center in Guntur or book an online architectural consultation.
              We provide free floorplan measurements, 3D visualization, and itemized quotes.
            </p>
            <div className="cta-banner-actions">
              <a
                href={`https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20book%20a%20free%20design%20consultation%20for%20my%20home.`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-primary"
              >
                Book Free Consultation ↗
              </a>
              <button
                className="btn-outline-gold"
                onClick={() => onNavigate && onNavigate("how-it-works")}
              >
                See How It Works (5 Steps) ›
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
