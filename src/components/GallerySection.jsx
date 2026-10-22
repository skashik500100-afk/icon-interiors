import { useState, useMemo } from "react";
import { ROOM_TYPES, DESIGN_STYLES, HOME_DESIGNS } from "../data/designsData";
import { searchUnsplashDesigns, getStoredUnsplashKey } from "../services/apiService";

export default function GallerySection({ favorites, onToggleFavorite, onOpenAIStudio }) {
  const [selectedRoom, setSelectedRoom] = useState("All Spaces");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalDesign, setActiveModalDesign] = useState(null);

  // Unsplash Live Search State
  const [liveUnsplashResults, setLiveUnsplashResults] = useState(null);
  const [isSearchingUnsplash, setIsSearchingUnsplash] = useState(false);
  const [unsplashError, setUnsplashError] = useState("");
  const hasUnsplashKey = Boolean(getStoredUnsplashKey());

  // Filtered designs
  const filteredDesigns = useMemo(() => {
    if (liveUnsplashResults && liveUnsplashResults.length > 0) {
      return liveUnsplashResults;
    }

    return HOME_DESIGNS.filter((design) => {
      const matchRoom = selectedRoom === "All Spaces" || design.roomType === selectedRoom;
      const matchStyle = selectedStyle === "All Styles" || design.style === selectedStyle;

      if (!searchQuery.trim()) {
        return matchRoom && matchStyle;
      }

      const q = searchQuery.toLowerCase();
      const matchSearch =
        design.title.toLowerCase().includes(q) ||
        design.roomType.toLowerCase().includes(q) ||
        design.style.toLowerCase().includes(q) ||
        design.description.toLowerCase().includes(q) ||
        design.location.toLowerCase().includes(q) ||
        design.materials.some((m) => m.toLowerCase().includes(q));

      return matchRoom && matchStyle && matchSearch;
    });
  }, [selectedRoom, selectedStyle, searchQuery, liveUnsplashResults]);

  // Handle live Unsplash API Search
  const handleLiveUnsplashSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (!hasUnsplashKey) {
      // Suggest opening API modal
      setUnsplashError("Please enter your Unsplash Access Key in the API Studio to enable live photo fetching.");
      return;
    }

    setIsSearchingUnsplash(true);
    setUnsplashError("");
    try {
      const results = await searchUnsplashDesigns(searchQuery);
      if (results && results.length > 0) {
        setLiveUnsplashResults(results);
      } else {
        setUnsplashError("No live results found for this keyword. Showing curated collection.");
      }
    } catch (err) {
      setUnsplashError("Failed to fetch from Unsplash. Please verify your API key in API Settings.");
    } finally {
      setIsSearchingUnsplash(false);
    }
  };

  const clearLiveSearch = () => {
    setLiveUnsplashResults(null);
    setSearchQuery("");
    setUnsplashError("");
  };

  const getWhatsAppEnquiryUrl = (design) => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I am interested in this design from your gallery:`,
      `• Project: ${design.title}`,
      `• Room: ${design.roomType} (${design.style})`,
      `• Estimated Budget: ${design.budget}`,
      `• Reference ID: ${design.id}`,
      ``,
      `Could an architect consult with me on designing something similar for my home?`
    ].join("\n");

    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-header">
        <span className="section-eyebrow">CURATED RESIDENTIAL PORTFOLIO</span>
        <h2 className="section-title">
          All Types of <span className="gold-text-gradient">Home Designs.</span>
        </h2>
        <p className="section-description">
          Explore our expansive showcase of complete architectural transformations. Filter by room typology,
          design style, or search specific materials such as Italian marble, fluted white oak, and smart cabinetry.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="gallery-controls">
        {/* Room Typology Filter Scroll */}
        <div className="room-filters-scroll">
          {ROOM_TYPES.map((room) => (
            <button
              key={room}
              className={`filter-chip ${selectedRoom === room && !liveUnsplashResults ? "active" : ""}`}
              onClick={() => {
                setSelectedRoom(room);
                if (liveUnsplashResults) setLiveUnsplashResults(null);
              }}
            >
              {room}
            </button>
          ))}
        </div>

        {/* Style Dropdown & Search Bar */}
        <div className="search-and-style-row">
          <div className="style-select-wrapper">
            <label htmlFor="style-filter">Aesthetic:</label>
            <select
              id="style-filter"
              value={selectedStyle}
              onChange={(e) => {
                setSelectedStyle(e.target.value);
                if (liveUnsplashResults) setLiveUnsplashResults(null);
              }}
              className="style-select"
            >
              {DESIGN_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleLiveUnsplashSearch} className="gallery-search-form">
            <input
              type="text"
              placeholder="Search e.g. travertine, kitchen island, japandi, brass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gallery-search-input"
            />
            {hasUnsplashKey && (
              <button
                type="submit"
                disabled={isSearchingUnsplash}
                className="btn-live-search"
                title="Search live photos from Unsplash API"
              >
                {isSearchingUnsplash ? "Searching..." : "✦ Live API Search"}
              </button>
            )}
            {liveUnsplashResults && (
              <button type="button" onClick={clearLiveSearch} className="btn-clear-search">
                ✕ Reset to Curated
              </button>
            )}
          </form>

          <button onClick={onOpenAIStudio} className="btn-ai-shortcut">
            ✦ AI Studio & Keys
          </button>
        </div>

        {/* Unsplash Status / Helper Alert */}
        {unsplashError && (
          <div className="gallery-alert">
            <span>ℹ {unsplashError}</span>
            <button onClick={onOpenAIStudio} className="alert-link-btn">
              Configure Unsplash Key ↗
            </button>
          </div>
        )}

        {liveUnsplashResults && (
          <div className="live-results-banner">
            <span>
              ✦ Showing <strong>{liveUnsplashResults.length}</strong> live designs fetched via Unsplash API for "
              {searchQuery}"
            </span>
            <button onClick={clearLiveSearch} className="link-reset">
              Return to Icon Interiors Portfolio
            </button>
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="results-meta">
        <span>
          Showing <strong>{filteredDesigns.length}</strong> bespoke interior designs
        </span>
        {selectedRoom !== "All Spaces" && <span className="meta-tag">• {selectedRoom}</span>}
        {selectedStyle !== "All Styles" && <span className="meta-tag">• {selectedStyle}</span>}
      </div>

      {/* Designs Grid */}
      <div className="designs-grid">
        {filteredDesigns.map((design) => {
          const isFav = favorites.includes(design.id);
          return (
            <article key={design.id} className="design-card">
              <div className="card-image-wrap" onClick={() => setActiveModalDesign(design)}>
                <img
                  src={design.image}
                  alt={design.title}
                  loading="lazy"
                  className="card-image"
                />
                <div className="card-badge-row">
                  <span className="badge-room">{design.roomType}</span>
                  <span className="badge-style">{design.style}</span>
                </div>
                <div className="image-hover-overlay">
                  <span className="quick-view-prompt">✦ Click to View Architectural Specs</span>
                </div>
              </div>

              <div className="card-body">
                <div className="card-header-row">
                  <h3 className="card-title" onClick={() => setActiveModalDesign(design)}>
                    {design.title}
                  </h3>
                  <button
                    className={`fav-button ${isFav ? "active" : ""}`}
                    onClick={() => onToggleFavorite(design.id)}
                    title={isFav ? "Remove from saved moodboard" : "Save to my moodboard"}
                    aria-label="Save design to favorites"
                  >
                    ♥
                  </button>
                </div>

                <p className="card-desc">{design.description}</p>

                {/* Specs row */}
                <div className="card-specs-row">
                  <div className="spec-item">
                    <span className="spec-label">Area</span>
                    <span className="spec-value">{design.sqft}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Est. Budget</span>
                    <span className="spec-value">{design.budget}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Handover</span>
                    <span className="spec-value">{design.duration}</span>
                  </div>
                </div>

                {/* Materials Tags */}
                <div className="materials-chips">
                  {design.materials.slice(0, 3).map((mat, idx) => (
                    <span key={idx} className="material-chip">
                      {mat}
                    </span>
                  ))}
                  {design.materials.length > 3 && (
                    <span className="material-chip more">+{design.materials.length - 3}</span>
                  )}
                </div>

                {/* Palette preview dots */}
                <div className="card-palette-row">
                  <span className="palette-label">Color Harmony:</span>
                  <div className="palette-dots">
                    {design.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="palette-dot"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="card-footer-actions">
                  <button
                    className="btn-details"
                    onClick={() => setActiveModalDesign(design)}
                  >
                    View Specs ↗
                  </button>
                  <a
                    href={getWhatsAppEnquiryUrl(design)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-enquire-card"
                  >
                    Enquire on WhatsApp ↗
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredDesigns.length === 0 && (
        <div className="no-results-box">
          <h3>No designs match your specific filter</h3>
          <p>Try resetting the room category or aesthetic filter, or search a different keyword.</p>
          <button
            onClick={() => {
              setSelectedRoom("All Spaces");
              setSelectedStyle("All Styles");
              setSearchQuery("");
              setLiveUnsplashResults(null);
            }}
            className="btn-gold-primary"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Lightbox / Architectural Detail Modal */}
      {activeModalDesign && (
        <div className="modal-backdrop" onClick={() => setActiveModalDesign(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveModalDesign(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-grid">
              <div className="modal-image-col">
                <img
                  src={activeModalDesign.image}
                  alt={activeModalDesign.title}
                  className="modal-image"
                />
                <div className="modal-image-caption">
                  <span>⌖ {activeModalDesign.location}</span>
                  <span>{activeModalDesign.sqft} • {activeModalDesign.duration} Handover</span>
                </div>
              </div>

              <div className="modal-info-col">
                <div className="modal-tags">
                  <span className="badge-room">{activeModalDesign.roomType}</span>
                  <span className="badge-style">{activeModalDesign.style}</span>
                  <span className="badge-budget">{activeModalDesign.budget}</span>
                </div>

                <h2 className="modal-title">{activeModalDesign.title}</h2>
                <p className="modal-desc">{activeModalDesign.description}</p>

                <div className="modal-section-block">
                  <h4>Material & Finish Specifications</h4>
                  <ul className="modal-materials-list">
                    {activeModalDesign.materials.map((mat, i) => (
                      <li key={i}>
                        <span className="bullet">✦</span> {mat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section-block">
                  <h4>Curated Color Harmony</h4>
                  <div className="modal-palette-swatches">
                    {activeModalDesign.palette.map((color, i) => (
                      <div key={i} className="swatch-item">
                        <div className="swatch-color" style={{ backgroundColor: color }} />
                        <span className="swatch-hex">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-cta-box">
                  <div className="cta-pricing-note">
                    <strong>Estimated Investment:</strong> {activeModalDesign.budget}
                    <small>Includes complete design, 3D modeling, materials, and turnkey execution</small>
                  </div>

                  <div className="modal-buttons">
                    <a
                      href={getWhatsAppEnquiryUrl(activeModalDesign)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold-primary"
                    >
                      Enquire This Exact Look on WhatsApp ↗
                    </a>
                    <button
                      className={`btn-fav-modal ${favorites.includes(activeModalDesign.id) ? "active" : ""}`}
                      onClick={() => onToggleFavorite(activeModalDesign.id)}
                    >
                      {favorites.includes(activeModalDesign.id) ? "♥ Saved in Moodboard" : "♡ Save to Moodboard"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
