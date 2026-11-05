import { useState, useEffect, useRef } from "react";
import {
  OFFICIAL_CATEGORIES,
  FIVE_STATES_CITIES,
  BUSINESS_INFO
} from "../data/designsData";
import { isAdmin } from "../services/api";

export default function Navbar({
  currentView,
  onNavigate,
  onOpenFavorites,
  favoritesCount = 0,
  selectedCity,
  onSelectCity,
  onOpenSearch,
  onOpenAuth,
  onOpenConsultation,
  currentUser = null
}) {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'designIdeas' | 'cities' | 'services' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedStateTab, setSelectedStateTab] = useState("Andhra Pradesh (AP)");
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleNavClick = (view, payload) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(view, payload);
    }
  };

  const handleCityPick = (city, stateName) => {
    const fullCity = `${city}, ${stateName.split(" ")[0]}`;
    if (onSelectCity) onSelectCity(fullCity);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`icon-main-navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="navbar-container">
        {/* ===================================================================
            BRAND LOGO
            =================================================================== */}
        <button
          className="navbar-brand-btn"
          onClick={() => handleNavClick("home")}
          title="ICON INTERIORS — Bespoke Architecture & Luxury Living"
        >
          <div className="brand-crest-emblem">
            <span className="brand-crest-glyph">✦</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-title">ICON INTERIORS</span>
            <span className="brand-subtitle">ARCHITECTURE & LIVING</span>
          </div>
        </button>

        {/* ===================================================================
            DESKTOP NAVIGATION (The 9 Core Sections)
            =================================================================== */}
        <nav className="navbar-nav-links desktop-only" aria-label="Main Navigation">
          {/* 1. Design Ideas with Mega-Menu (All 11 Categories) */}
          <div className="nav-item-dropdown">
            <button
              className={`nav-link-btn ${
                currentView === "design-ideas" || activeDropdown === "designIdeas" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("designIdeas")}
              aria-expanded={activeDropdown === "designIdeas"}
            >
              <span>Design Ideas</span>
              <span className="caret-arrow">{activeDropdown === "designIdeas" ? "▲" : "▼"}</span>
            </button>

            {activeDropdown === "designIdeas" && (
              <div className="mega-menu-panel mega-menu-designs">
                <div className="mega-menu-top">
                  <h4>Curated Architectural Design Ideas</h4>
                  <p>Explore high-end specifications across 11 interior categories.</p>
                </div>
                <div className="mega-categories-grid">
                  {OFFICIAL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className="mega-category-card"
                      onClick={() => handleNavClick("design-ideas", cat.name)}
                    >
                      <span className="cat-icon">{cat.icon}</span>
                      <div className="cat-info">
                        <strong>{cat.name}</strong>
                        <small>{cat.desc}</small>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mega-menu-bottom">
                  <button
                    className="view-all-gallery-btn"
                    onClick={() => handleNavClick("design-ideas")}
                  >
                    Open Smart Design Ideas Gallery →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. AI Room Makeover */}
          <button
            className={`nav-link-btn nav-link-ai-glow ${currentView === "ai-makeover" ? "active" : ""}`}
            onClick={() => handleNavClick("ai-makeover")}
          >
            <span className="ai-sparkle">✦</span>
            <span>AI Room Makeover</span>
          </button>

          {/* 3. Cost Estimator */}
          <button
            className={`nav-link-btn ${currentView === "cost-estimator" ? "active" : ""}`}
            onClick={() => handleNavClick("cost-estimator")}
          >
            Cost Estimator
          </button>

          {/* 6. Cities Dropdown (Preserved 5 States) */}
          <div className="nav-item-dropdown">
            <button
              className={`nav-link-btn ${
                currentView === "cities" || activeDropdown === "cities" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("cities")}
              aria-expanded={activeDropdown === "cities"}
            >
              <span>Cities</span>
              {selectedCity && <span className="city-pill-badge">📍 {selectedCity.split(",")[0]}</span>}
              <span className="caret-arrow">{activeDropdown === "cities" ? "▲" : "▼"}</span>
            </button>

            {activeDropdown === "cities" && (
              <div className="mega-menu-panel mega-menu-cities">
                <div className="mega-menu-top">
                  <h4>Service Cities Across 5 Southern States</h4>
                  <p>Physical flagship studio located in Guntur; turnkey execution across major hubs.</p>
                </div>
                <div className="state-pills-bar">
                  {Object.keys(FIVE_STATES_CITIES).map((st) => (
                    <button
                      key={st}
                      className={`state-pill ${selectedStateTab === st ? "active" : ""}`}
                      onClick={() => setSelectedStateTab(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <div className="cities-grid-list">
                  {(FIVE_STATES_CITIES[selectedStateTab] || []).map((cityItem) => {
                    const isSelected = selectedCity && selectedCity.includes(cityItem.name);
                    return (
                      <div
                        key={cityItem.name}
                        className={`city-item-box ${isSelected ? "selected" : ""}`}
                        onClick={() => handleCityPick(cityItem.name, selectedStateTab)}
                      >
                        <strong>{cityItem.name}</strong>
                        <small>{cityItem.note}</small>
                        {isSelected && <span className="city-active-tag">✓ Active</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 7. Store Locator (Exclusively Guntur Flagship Studio) */}
          <button
            className={`nav-link-btn ${currentView === "store-locator" ? "active" : ""}`}
            onClick={() => handleNavClick("store-locator")}
          >
            Store Locator
          </button>

          {/* 8. About Us */}
          <button
            className={`nav-link-btn ${currentView === "about" ? "active" : ""}`}
            onClick={() => handleNavClick("about")}
          >
            About Us
          </button>

          {/* 9. Contact */}
          <button
            className={`nav-link-btn ${currentView === "contact" ? "active" : ""}`}
            onClick={() => handleNavClick("contact")}
          >
            Contact
          </button>
        </nav>

        {/* ===================================================================
            RIGHT ACTION CONTROLS
            Search, Wishlist, Login/Signup, Free Consultation CTA
            =================================================================== */}
        <div className="navbar-right-actions">
          {/* A. Global Search Button */}
          <button
            className="nav-action-icon-btn"
            onClick={onOpenSearch}
            title="Search designs, rooms, materials & styles"
            aria-label="Search"
          >
            <span className="action-icon">🔍</span>
          </button>

          {/* B. Wishlist / Favorites Button */}
          <button
            className="nav-action-icon-btn nav-favorites-trigger"
            onClick={onOpenFavorites}
            title="View Saved Favorites Moodboard"
            aria-label={`View Wishlist with ${favoritesCount} items`}
          >
            <span className="action-icon">♥</span>
            {favoritesCount > 0 && <span className="badge-counter">{favoritesCount}</span>}
          </button>

          {/* C. Dedicated Admin Dashboard shortcut if authenticated as admin */}
          {isAdmin(currentUser) && (
            <button
              className="desktop-only btn-admin-nav-pill"
              style={{
                padding: "7px 14px",
                fontSize: "0.8rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "20px",
                background: currentView === "admin" ? "#e6ca65" : "rgba(197, 160, 89, 0.16)",
                color: currentView === "admin" ? "#0b0d10" : "#e6ca65",
                border: "1px solid #c5a059",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
              onClick={() => onNavigate("admin")}
              title="Open Studio Admin Dashboard Suite"
            >
              <span>👑 Admin Dashboard</span>
              <span style={{ fontSize: "0.9rem" }}>›</span>
            </button>
          )}

          {/* D. Login / Sign Up or Account Profile Button */}
          <button
            className="nav-user-profile-btn desktop-only"
            onClick={onOpenAuth}
            style={
              isAdmin(currentUser)
                ? { borderColor: "#c5a059", background: "rgba(197, 160, 89, 0.1)" }
                : {}
            }
            title={
              currentUser
                ? `Logged in as ${currentUser.name || currentUser.fullName || "User"} (${currentUser.role || "Client"})`
                : "Customer Login / Sign Up"
            }
          >
            <span className="user-avatar-icon">
              {isAdmin(currentUser) ? "⚡" : "👤"}
            </span>
            <span
              className="user-btn-label"
              style={isAdmin(currentUser) ? { color: "#e6ca65", fontWeight: 600 } : {}}
            >
              {currentUser
                ? (currentUser.name || currentUser.fullName || "Account").split(" ")[0]
                : "Login / Sign Up"}
            </span>
          </button>

          {/* E. Primary CTA: Get a Free Consultation */}
          <button
            className="btn-consultation-cta desktop-only"
            onClick={onOpenConsultation}
            title="Book a free consultation with our principal interior architect"
          >
            <span>Get Free Consultation</span>
            <span className="cta-arrow">›</span>
          </button>

          {/* Mobile Hamburger Drawer Toggle */}
          <button
            className="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ===================================================================
          RESPONSIVE MOBILE NAVIGATION DRAWER
          =================================================================== */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="drawer-brand">
                <span className="drawer-crest">✦</span>
                <span className="drawer-title">ICON INTERIORS</span>
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>

            {/* Mobile City Selector */}
            <div className="mobile-city-strip">
              <label>📍 Selected City:</label>
              <select
                value={selectedCity || "Guntur, AP"}
                onChange={(e) => {
                  if (onSelectCity) onSelectCity(e.target.value);
                }}
              >
                {Object.entries(FIVE_STATES_CITIES).map(([st, cities]) => (
                  <optgroup key={st} label={st}>
                    {cities.map((c) => (
                      <option key={c.name} value={`${c.name}, ${st.split(" ")[0]}`}>
                        {c.name} ({st.split(" ")[0]})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Mobile Navigation List */}
            <nav className="mobile-links-container">
              <button
                className={`mobile-nav-link ${currentView === "home" ? "active" : ""}`}
                onClick={() => handleNavClick("home")}
              >
                <span>🏠 Home</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "design-ideas" ? "active" : ""}`}
                onClick={() => handleNavClick("design-ideas")}
              >
                <span>🎨 Design Ideas (11 Categories)</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "ai-makeover" ? "active" : ""}`}
                onClick={() => handleNavClick("ai-makeover")}
              >
                <span>✦ AI Room Makeover</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "cost-estimator" ? "active" : ""}`}
                onClick={() => handleNavClick("cost-estimator")}
              >
                <span>💰 Interior Cost Estimator</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "cities" ? "active" : ""}`}
                onClick={() => handleNavClick("cities")}
              >
                <span>📍 Service Cities</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "store-locator" ? "active" : ""}`}
                onClick={() => handleNavClick("store-locator")}
              >
                <span>🏢 Guntur Flagship Studio</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "about" ? "active" : ""}`}
                onClick={() => handleNavClick("about")}
              >
                <span>📖 About Us</span>
                <span className="drawer-arrow">›</span>
              </button>

              <button
                className={`mobile-nav-link ${currentView === "contact" ? "active" : ""}`}
                onClick={() => handleNavClick("contact")}
              >
                <span>📞 Contact & Consultation</span>
                <span className="drawer-arrow">›</span>
              </button>
            </nav>

            {/* Mobile Actions Bottom */}
            <div className="mobile-drawer-footer">
              {isAdmin(currentUser) ? (
                <button
                  className="mobile-auth-btn"
                  style={{ background: "rgba(197, 160, 89, 0.2)", borderColor: "#c5a059", color: "#e6ca65", fontWeight: 700 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate("admin");
                  }}
                >
                  👑 Admin Dashboard Suite
                </button>
              ) : currentUser ? (
                <button
                  className="mobile-auth-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth();
                  }}
                >
                  👤 Logged in as {(currentUser.name || currentUser.fullName || "Client").split(" ")[0]}
                </button>
              ) : (
                <button
                  className="mobile-auth-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth();
                  }}
                >
                  👤 Login / Sign Up
                </button>
              )}

              <button
                className="mobile-consultation-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenConsultation) onOpenConsultation();
                }}
              >
                Get Free Consultation ›
              </button>

              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20consult%20regarding%20my%20home%20design.`}
                target="_blank"
                rel="noreferrer"
                className="mobile-wa-direct-btn"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
