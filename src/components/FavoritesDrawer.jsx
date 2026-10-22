import { HOME_DESIGNS } from "../data/designsData";

export default function FavoritesDrawer({ isOpen, onClose, favorites, onRemoveFavorite }) {
  if (!isOpen) return null;

  const savedDesigns = HOME_DESIGNS.filter((d) => favorites.includes(d.id));

  const getWhatsAppAllFavoritesUrl = () => {
    if (savedDesigns.length === 0) return "#";
    const titles = savedDesigns.map((d, i) => `${i + 1}. ${d.title} (${d.roomType} - ${d.budget})`).join("\n");
    const text = [
      `Hello ICON INTERIORS!`,
      `I saved ${savedDesigns.length} designs to my personalized moodboard on your website:`,
      titles,
      ``,
      `Can we discuss how to adapt these aesthetics for my upcoming home project?`
    ].join("\n");

    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="heart-gold">♥</span>
            <h3>Saved Moodboard ({savedDesigns.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close saved drawer">
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {savedDesigns.length === 0 ? (
            <div className="drawer-empty-state">
              <span className="empty-icon">♡</span>
              <h4>Your Moodboard is Empty</h4>
              <p>
                Browse through our gallery and click the heart icon on any living room, kitchen, or bedroom design
                to save it to your personal architectural moodboard.
              </p>
              <button onClick={onClose} className="btn-gold-primary">
                Browse Gallery Designs
              </button>
            </div>
          ) : (
            <div className="saved-items-list">
              {savedDesigns.map((design) => (
                <div key={design.id} className="saved-item-card">
                  <img src={design.image} alt={design.title} className="saved-thumb" />
                  <div className="saved-details">
                    <span className="saved-badge">{design.roomType}</span>
                    <h4>{design.title}</h4>
                    <span className="saved-budget">{design.budget} • {design.duration}</span>
                  </div>
                  <button
                    className="btn-remove-saved"
                    onClick={() => onRemoveFavorite(design.id)}
                    title="Remove from saved"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {savedDesigns.length > 0 && (
          <div className="drawer-footer">
            <a
              href={getWhatsAppAllFavoritesUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-primary btn-enquire-all"
            >
              Enquire All {savedDesigns.length} Saved on WhatsApp ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
