import { useState, useEffect, useRef } from "react";
import { FIVE_STATES_CITIES, DESIGN_IDEAS_LIST } from "../data/designsData";

export default function Navbar({
  currentView,
  onNavigate,
  onOpenFavorites,
  favoritesCount,
  selectedCity,
  onSelectCity
}) {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'designIdeas' | 'cities' | 'offerings' | 'calculators' | null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedStateTab, setSelectedStateTab] = useState("Andhra Pradesh (AP)");
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
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

  const handleDesignClick = (idea) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate("design-ideas", idea);
    }
  };

  const handleCityPick = (city, stateName) => {
    const fullCity = `${city}, ${stateName.split(" ")[0]}`;
    if (onSelectCity) onSelectCity(fullCity);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (view, payload) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(view, payload);
    }
  };

  const getWhatsAppConsultUrl = () => {
    const cityText = selectedCity ? ` for my home in ${selectedCity}` : "";
    const text = `Hello ICON INTERIORS! I would like to book a free design consultation${cityText}.`;
    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <header className={`livspace-navbar-wrapper ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      {/* =========================================================================
          TIER 1: TOP MAIN NAVIGATION (Image 1 Style)
          ========================================================================= */}
      <div className="tier1-main-bar">
        <div className="tier1-container">
          {/* Brand Logo - Navigates to Home */}
          <button
            className="livspace-brand-btn"
            onClick={() => handleNavClick("home")}
            title="ICON INTERIORS Home"
          >
            <div className="brand-emblem-ring">
              <span className="brand-inner-glyph">✦</span>
            </div>
            <div className="brand-title-wrap">
              <span className="brand-name">ICON INTERIORS</span>
              <span className="brand-sub">LUXURY SPACES</span>
            </div>
          </button>

          {/* Desktop Tier 1 Menu Items */}
          <nav className="tier1-nav-links desktop-only">
            {/* 1. Design Ideas with Mega Menu (Image 2 style) */}
            <div className="nav-dropdown-item">
              <button
                className={`dropdown-trigger-btn ${
                  currentView === "design-ideas" || activeDropdown === "designIdeas" ? "active" : ""
                }`}
                onClick={() => toggleDropdown("designIdeas")}
                aria-expanded={activeDropdown === "designIdeas"}
              >
                <span>Design Ideas</span>
                <span className="caret-icon">{activeDropdown === "designIdeas" ? "▲" : "▼"}</span>
              </button>

              {activeDropdown === "designIdeas" && (
                <div className="mega-menu-design-ideas">
                  <div className="mega-menu-header">
                    <h4>Home Interior Design Ideas</h4>
                    <p>Select any room to view at least 10 high-resolution architectural designs.</p>
                  </div>
                  <div className="mega-menu-cols-2">
                    <div className="mega-menu-col">
                      {DESIGN_IDEAS_LIST.col1.map((idea) => (
                        <button
                          key={idea}
                          className="mega-menu-link"
                          onClick={() => handleDesignClick(idea)}
                        >
                          <span className="menu-bullet">›</span>
                          <span>{idea}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mega-menu-col">
                      {DESIGN_IDEAS_LIST.col2.map((idea) => (
                        <button
                          key={idea}
                          className="mega-menu-link"
                          onClick={() => handleDesignClick(idea)}
                        >
                          <span className="menu-bullet">›</span>
                          <span>{idea}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mega-menu-footer">
                    <button
                      className="mega-footer-link"
                      onClick={() => handleDesignClick("Master Bedroom Designs")}
                    >
                      View Master Bedroom Designs Showcase ↗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Cities across 5 States: AP, TS, TN, Kerala, Karnataka */}
            <div className="nav-dropdown-item">
              <button
                className={`dropdown-trigger-btn ${activeDropdown === "cities" ? "active" : ""}`}
                onClick={() => toggleDropdown("cities")}
                aria-expanded={activeDropdown === "cities"}
              >
                <span>Cities</span>
                {selectedCity && <span className="active-city-badge">📍 {selectedCity}</span>}
                <span className="caret-icon">{activeDropdown === "cities" ? "▲" : "▼"}</span>
              </button>

              {activeDropdown === "cities" && (
                <div className="mega-menu-cities">
                  <div className="cities-header">
                    <h4>Select Your City Across 5 Southern States</h4>
                    <p>Exclusive flagship experience studio currently in Guntur; on-site turnkey delivery in your region.</p>
                  </div>

                  {/* State Tabs */}
                  <div className="state-pills-row">
                    {Object.keys(FIVE_STATES_CITIES).map((st) => (
                      <button
                        key={st}
                        className={`state-pill-btn ${selectedStateTab === st ? "active" : ""}`}
                        onClick={() => setSelectedStateTab(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  {/* Cities Grid */}
                  <div className="cities-cards-grid">
                    {(FIVE_STATES_CITIES[selectedStateTab] || []).map((c) => {
                      const isChosen = selectedCity && selectedCity.includes(c.name);
                      return (
                        <div
                          key={c.name}
                          className={`city-select-card ${isChosen ? "chosen" : ""}`}
                          onClick={() => handleCityPick(c.name, selectedStateTab)}
                        >
                          <strong>{c.name}</strong>
                          <small>{c.note}</small>
                          {isChosen && <span className="city-check">✓ Active</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Store Locator - Dedicated Guntur Studio View */}
            <button
              className={`tier1-plain-btn ${currentView === "store-locator" ? "active" : ""}`}
              onClick={() => handleNavClick("store-locator")}
              title="Experience Center (Exclusively in Guntur)"
            >
              Store Locator <span className="guntur-tag-tiny">Guntur Only</span>
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="tier1-right-actions">
            <button
              className="tier1-icon-btn"
              onClick={onOpenFavorites}
              title="View Saved Favorites Moodboard"
            >
              <span className="heart-icon">♥</span>
              <span className="badge-count">{favoritesCount}</span>
            </button>

            <a
              href={getWhatsAppConsultUrl()}
              target="_blank"
              rel="noreferrer"
              className="user-profile-btn desktop-only"
              title="Talk to Principal Interior Architect"
            >
              <span className="user-icon">👤</span>
              <span className="user-label">Consult Architect</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TIER 2: SECONDARY SUB-NAVIGATION BAR (Image 1, 3, 5 Style)
          ========================================================================= */}
      <div className="tier2-sub-bar">
        <div className="tier2-container">
          <nav className="tier2-nav-links desktop-only">
            {/* 1. How it works (Image 5) */}
            <button
              className={`tier2-link-btn ${currentView === "how-it-works" ? "active" : ""}`}
              onClick={() => handleNavClick("how-it-works")}
            >
              How it works
            </button>

            {/* 2. Offerings Dropdown */}
            <div className="tier2-dropdown-item">
              <button
                className={`tier2-dropdown-btn ${activeDropdown === "offerings" ? "active" : ""}`}
                onClick={() => toggleDropdown("offerings")}
              >
                <span>Offerings</span>
                <span className="caret-icon">{activeDropdown === "offerings" ? "▲" : "▼"}</span>
              </button>

              {activeDropdown === "offerings" && (
                <div className="sub-menu-dropdown offerings-dropdown">
                  <button
                    className="dropdown-link-item"
                    onClick={() => handleDesignClick("Living Room Designs")}
                  >
                    <strong>Full Home Interiors</strong>
                    <small>Turnkey design & execution for 2, 3 & 4 BHKs</small>
                  </button>
                  <button
                    className="dropdown-link-item"
                    onClick={() => handleNavClick("modular-journey")}
                  >
                    <strong>Modular Kitchens & Storage</strong>
                    <small>Precision German joinery & waterproof BWP 710</small>
                  </button>
                  <button
                    className="dropdown-link-item"
                    onClick={() => handleDesignClick("Master Bedroom Designs")}
                  >
                    <strong>Master Bedroom & Wardrobes</strong>
                    <small>Japandi, Neo-Classical & Walk-in dressing suites</small>
                  </button>
                  <button
                    className="dropdown-link-item"
                    onClick={() => handleDesignClick("Bathroom Designs")}
                  >
                    <strong>Luxury Wellness Bathrooms</strong>
                    <small>Italian marble, rain showers & floating vanities</small>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Price Calculators */}
            <button
              className={`tier2-link-btn ${currentView === "price-calculators" ? "active" : ""}`}
              onClick={() => handleNavClick("price-calculators")}
            >
              Price Calculators
            </button>

            {/* 4. The Modular Journey (like Image 3 & 4) */}
            <button
              className={`tier2-link-btn modular-journey-highlight ${
                currentView === "modular-journey" ? "active" : ""
              }`}
              onClick={() => handleNavClick("modular-journey")}
            >
              The Modular Journey
            </button>
          </nav>

          {/* Right CTA Button: CONSULT ONLINE NOW (Image 1 / Image 3 style) */}
          <div className="tier2-right-cta">
            <a
              href={getWhatsAppConsultUrl()}
              target="_blank"
              rel="noreferrer"
              className="consult-online-btn"
            >
              CONSULT ONLINE NOW
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE DRAWER MENU
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="mobile-livspace-drawer">
          <div className="mobile-city-selector">
            <label>Your Selected City:</label>
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

          <div className="mobile-nav-group">
            <h5>POPULAR DESIGN IDEAS</h5>
            <div className="mobile-ideas-chips">
              {DESIGN_IDEAS_LIST.col1.slice(0, 8).map((idea) => (
                <button
                  key={idea}
                  className="mobile-chip-btn"
                  onClick={() => handleDesignClick(idea)}
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>

          <div className="mobile-links-list">
            <button
              className={`mobile-nav-row ${currentView === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
            >
              🏠 Home
            </button>
            <button
              className={`mobile-nav-row ${currentView === "how-it-works" ? "active" : ""}`}
              onClick={() => handleNavClick("how-it-works")}
            >
              📋 How it works (5 Steps)
            </button>
            <button
              className={`mobile-nav-row ${currentView === "modular-journey" ? "active" : ""}`}
              onClick={() => handleNavClick("modular-journey")}
            >
              📐 The Modular Journey
            </button>
            <button
              className={`mobile-nav-row ${currentView === "price-calculators" ? "active" : ""}`}
              onClick={() => handleNavClick("price-calculators")}
            >
              💰 Price Calculators
            </button>
            <button
              className={`mobile-nav-row ${currentView === "store-locator" ? "active" : ""}`}
              onClick={() => handleNavClick("store-locator")}
            >
              📍 Guntur Store Locator
            </button>
          </div>

          <a
            href={getWhatsAppConsultUrl()}
            target="_blank"
            rel="noreferrer"
            className="mobile-consult-btn"
          >
            CONSULT ONLINE NOW ↗
          </a>
        </div>
      )}
    </header>
  );
}
