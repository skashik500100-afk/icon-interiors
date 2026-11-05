import { useState, useMemo } from "react";
import { DESIGNS_DATABASE, OFFICIAL_CATEGORIES } from "../data/designsData";

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return DESIGNS_DATABASE.filter((d) => {
      return (
        d.name.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.style.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        (d.specifications || []).some((s) => s.toLowerCase().includes(q))
      );
    }).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="global-search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <span className="search-lens-glyph">🔍</span>
          <input
            type="text"
            autoFocus
            placeholder="Search designs, styles (Japandi, Neoclassical), rooms, IDs (BED-101)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="global-search-input"
          />
          <button className="search-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Quick Category Suggestions if no query */}
        {!query && (
          <div className="search-quick-tags-panel">
            <span className="quick-label">POPULAR ROOMS:</span>
            <div className="quick-tags-row">
              {OFFICIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className="quick-search-chip"
                  onClick={() => {
                    onClose();
                    onNavigate && onNavigate("design-ideas", cat.name);
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="search-results-list">
            {searchResults.length === 0 ? (
              <div className="search-no-results">
                <p>No architectural specifications found for "{query}".</p>
                <small>Try searching for "Japandi", "Kitchen", "Marble", or "Luxury".</small>
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  className="search-result-row"
                  onClick={() => {
                    onClose();
                    onNavigate && onNavigate("design-ideas", item.category);
                  }}
                >
                  <div className="result-thumb-box">
                    <span>✦</span>
                  </div>
                  <div className="result-text-box">
                    <div className="result-title-line">
                      <strong>{item.name}</strong>
                      <span className="result-id-pill">{item.id}</span>
                    </div>
                    <span className="result-sub-line">
                      {item.category} • {item.style} • {item.budget}
                    </span>
                  </div>
                  <span className="result-go-arrow">›</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

