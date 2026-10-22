import { useState, useEffect } from "react";

export default function Navbar({ onOpenAIStudio, onOpenFavorites, favoritesCount, hasApiKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="#home" className="brand-logo" onClick={() => setMenuOpen(false)}>
          <span className="brand-seal">I</span>
          <div className="brand-text">
            <h2>ICON</h2>
            <small>INTERIORS & ARCHITECTURE</small>
          </div>
        </a>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>All Designs</a>
          <a href="#before-after" onClick={() => setMenuOpen(false)}>Before & After</a>
          <a href="#customizer" onClick={() => setMenuOpen(false)}>Material Studio</a>
          <a href="#estimator" onClick={() => setMenuOpen(false)}>Cost Calculator</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Expertise</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          <div className="nav-mobile-extras">
            <button
              className="ai-studio-btn-nav"
              onClick={() => {
                setMenuOpen(false);
                onOpenAIStudio();
              }}
            >
              <span className="sparkle">✦</span> AI Studio & Keys
              <span className={`key-status-dot ${hasApiKey ? "active" : "demo"}`} />
            </button>
            <button
              className="favorites-btn-nav"
              onClick={() => {
                setMenuOpen(false);
                onOpenFavorites();
              }}
            >
              ♥ Saved Designs ({favoritesCount})
            </button>
          </div>
        </nav>

        <div className="navbar-actions">
          <button
            className="ai-studio-btn-nav desktop-only"
            onClick={onOpenAIStudio}
            title="Open Gemini AI Interior Designer & API Key Manager"
          >
            <span className="sparkle">✦</span> AI Studio
            <span className={`status-badge ${hasApiKey ? "connected" : "ready"}`}>
              {hasApiKey ? "API Ready" : "Demo / Keys"}
            </span>
          </button>

          <button
            className="favorites-pill desktop-only"
            onClick={onOpenFavorites}
            title="View Saved Favorites Moodboard"
          >
            <span className="heart-icon">♥</span>
            <span className="fav-counter">{favoritesCount}</span>
          </button>

          <a
            href="https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20would%20like%20to%20consult%20with%20an%20interior%20architect%20for%20my%20home."
            target="_blank"
            rel="noreferrer"
            className="consult-cta-btn"
          >
            Enquire ↗
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
