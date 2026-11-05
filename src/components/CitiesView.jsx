import { useState } from "react";
import { FIVE_STATES_CITIES, BUSINESS_INFO } from "../data/designsData";

export default function CitiesView({ onNavigate, selectedCity, onSelectCity }) {
  const [activeStateTab, setActiveStateTab] = useState("Andhra Pradesh (AP)");

  const handleCityPick = (cityName) => {
    const fullCity = `${cityName}, ${activeStateTab.split(" ")[0]}`;
    if (onSelectCity) onSelectCity(fullCity);
  };

  return (
    <div className="cities-page-container">
      <header className="cities-page-header">
        <div className="cities-header-content">
          <div className="cities-badge">
            <span className="badge-dot">●</span>
            <span>REGIONAL FOOTPRINT ACROSS SOUTHERN INDIA</span>
          </div>
          <h1>
            Cities We <span className="gold-text-gradient">Serve</span>
          </h1>
          <p>
            ICON INTERIORS operates our physical 4,500 sq.ft Flagship Experience Center exclusively on
            Syamala Nagar Main Road in Guntur, Andhra Pradesh. We execute turnkey residential projects
            across major metropolitan hubs in 5 Southern States with dedicated on-site site supervisors.
          </p>
        </div>
      </header>

      {/* Flagship Notice Banner */}
      <div className="flagship-notice-banner">
        <div className="banner-icon">📍</div>
        <div className="banner-text">
          <strong>Physical Flagship Studio Location:</strong>
          <span> {BUSINESS_INFO.experienceCenter}</span>
        </div>
        <button
          className="btn-studio-direct"
          onClick={() => onNavigate && onNavigate("store-locator")}
        >
          View Guntur Studio Details ›
        </button>
      </div>

      {/* State Selector Tabs */}
      <div className="state-selection-tabs">
        <div className="tabs-container">
          {Object.keys(FIVE_STATES_CITIES).map((st) => (
            <button
              key={st}
              className={`state-tab-btn ${activeStateTab === st ? "active" : ""}`}
              onClick={() => setActiveStateTab(st)}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Cities Cards Grid */}
      <section className="cities-grid-section">
        <div className="cities-cards-grid">
          {(FIVE_STATES_CITIES[activeStateTab] || []).map((c) => {
            const isChosen = selectedCity && selectedCity.includes(c.name);
            const isGuntur = c.name === "Guntur";

            return (
              <div
                key={c.name}
                className={`city-hub-card ${isChosen ? "active-chosen" : ""} ${isGuntur ? "flagship-studio-card" : ""}`}
                onClick={() => handleCityPick(c.name)}
              >
                <div className="hub-top-row">
                  <span className="hub-icon">{isGuntur ? "🏢" : "📍"}</span>
                  {isGuntur ? (
                    <span className="hub-badge flagship">FLAGSHIP EXPERIENCE STUDIO</span>
                  ) : (
                    <span className="hub-badge turnkey">ACTIVE TURNKEY COVERAGE</span>
                  )}
                </div>

                <h3>{c.name}</h3>
                <p className="hub-note">{c.note}</p>

                <div className="hub-features-list">
                  <span>✓ 3D Virtual Design Consultation</span>
                  <span>✓ German Joinery Direct Delivery</span>
                  <span>✓ 45-Day Move-in Guarantee</span>
                </div>

                <div className="hub-card-footer">
                  <button className="btn-select-city">
                    {isChosen ? "✓ Currently Selected City" : `Select ${c.name}`}
                  </button>
                  {isGuntur && (
                    <button
                      className="btn-visit-flagship"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate && onNavigate("store-locator");
                      }}
                    >
                      Visit Studio ›
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

