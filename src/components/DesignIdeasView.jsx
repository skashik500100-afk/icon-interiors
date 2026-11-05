import { useState, useMemo, useEffect } from "react";
import {
  OFFICIAL_CATEGORIES,
  INTERIOR_STYLES,
  BUDGET_TIERS,
  DESIGNS_DATABASE,
  BUSINESS_INFO
} from "../data/designsData";
import { isAdmin, api, normalizeDesign } from "../services/api";

export default function DesignIdeasView({
  category = "Bedroom",
  onSelectCategory,
  favorites = [],
  onToggleFavorite,
  selectedCity = "Guntur, AP",
  onOpenEnquiry,
  currentUser = null
}) {
  const userIsAdmin = isAdmin(currentUser);
  const [activeCategory, setActiveCategory] = useState(() => {
    // Match passed category or default to 'Bedroom'
    const found = OFFICIAL_CATEGORIES.find(
      (c) => c.name.toLowerCase() === category.toLowerCase() || category.toLowerCase().includes(c.name.toLowerCase())
    );
    return found ? found.name : "Bedroom";
  });

  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'budget-asc' | 'budget-desc' | 'name'
  const [selectedDesignForModal, setSelectedDesignForModal] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Persistent Designs List (Supports Admin Adding Photos & New Designs)
  const [designsList, setDesignsList] = useState(() => {
    try {
      const saved = localStorage.getItem("icon_custom_designs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(normalizeDesign);
      }
    } catch (e) {
      console.warn("Could not load custom designs", e);
    }
    return DESIGNS_DATABASE.map(normalizeDesign);
  });

  // Fetch from backend / synced storage on mount
  useEffect(() => {
    let ignore = false;
    const loadCatalog = async () => {
      try {
        const list = await api.getDesigns();
        if (!ignore && Array.isArray(list) && list.length > 0) {
          setDesignsList(list);
        }
      } catch (err) {
        console.warn("Could not load latest designs catalog:", err);
      }
    };
    loadCatalog();
    return () => {
      ignore = true;
    };
  }, []);

  const saveDesigns = (updated) => {
    setDesignsList(updated);
    try {
      localStorage.setItem("icon_custom_designs", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save designs", e);
    }
  };

  // Photo Upload Modal State
  const [photoUploadTarget, setPhotoUploadTarget] = useState(null);
  const [photoUploadFile, setPhotoUploadFile] = useState(null);
  const [photoUploadUrl, setPhotoUploadUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);

  const openPhotoUpload = (design) => {
    setPhotoUploadTarget(design);
    setPhotoUploadFile(null);
    setPhotoUploadUrl(design.imageUrl || "");
    setPhotoPreview(design.imageUrl || "");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert("File size exceeds 15MB limit.");
        return;
      }
      setPhotoUploadFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSavePhoto = async () => {
    if (!photoUploadTarget) return;
    setIsSavingPhoto(true);
    try {
      let finalUrl = photoUploadUrl.trim();
      if (photoUploadFile) {
        const uploaded = await api.uploadDesignPhoto(photoUploadTarget.id, photoUploadFile);
        if (uploaded?.imageUrl) {
          finalUrl = uploaded.imageUrl.startsWith("/")
            ? `http://localhost:8080${uploaded.imageUrl}`
            : uploaded.imageUrl;
        } else {
          finalUrl = await api.uploadImage(photoUploadFile);
        }
      }

      const updated = designsList.map((d) =>
        d.id === photoUploadTarget.id ? { ...d, imageUrl: finalUrl } : d
      );
      saveDesigns(updated);
      if (selectedDesignForModal && selectedDesignForModal.id === photoUploadTarget.id) {
        setSelectedDesignForModal({ ...selectedDesignForModal, imageUrl: finalUrl });
      }
      setPhotoUploadTarget(null);
      setPhotoUploadFile(null);
      setPhotoUploadUrl("");
      setPhotoPreview("");
    } catch (err) {
      console.error("Failed to save photo:", err);
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    if (!photoUploadTarget) return;
    const updated = designsList.map((d) =>
      d.id === photoUploadTarget.id ? { ...d, imageUrl: "" } : d
    );
    saveDesigns(updated);
    if (selectedDesignForModal && selectedDesignForModal.id === photoUploadTarget.id) {
      setSelectedDesignForModal({ ...selectedDesignForModal, imageUrl: "" });
    }
    setPhotoUploadTarget(null);
    setPhotoUploadFile(null);
    setPhotoUploadUrl("");
    setPhotoPreview("");
  };

  // Add New Design Idea Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDesignForm, setNewDesignForm] = useState({
    category: activeCategory,
    name: "",
    style: "Modern Minimalist",
    budgetTier: "Signature",
    budget: "₹14.0L – ₹18.0L",
    roomType: "Master Suite (280 sq.ft)",
    description: "",
    specifications: "BWP 710 Marine Ply, Blum Soft-Close, High-CRI Warm LEDs",
    imageUrl: ""
  });

  const handleCreateNewDesign = (e) => {
    e.preventDefault();
    if (!newDesignForm.name.trim()) return;

    const prefix = newDesignForm.category.substring(0, 3).toUpperCase();
    const uniqueId = `${prefix}-${designsList.length + 101}`;

    const newDesign = {
      id: uniqueId,
      name: newDesignForm.name.trim(),
      category: newDesignForm.category,
      style: newDesignForm.style,
      budgetTier: newDesignForm.budgetTier,
      budget: newDesignForm.budget,
      roomType: newDesignForm.roomType,
      description: newDesignForm.description || `Custom architectural ${newDesignForm.category} design concept.`,
      specifications: newDesignForm.specifications
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      imageUrl: newDesignForm.imageUrl,
      featured: true
    };

    const updated = [newDesign, ...designsList];
    saveDesigns(updated);
    setActiveCategory(newDesign.category);
    setIsAddModalOpen(false);
    setNewDesignForm({
      category: activeCategory,
      name: "",
      style: "Modern Minimalist",
      budgetTier: "Signature",
      budget: "₹14.0L – ₹18.0L",
      roomType: "Master Suite (280 sq.ft)",
      description: "",
      specifications: "BWP 710 Marine Ply, Blum Soft-Close, High-CRI Warm LEDs",
      imageUrl: ""
    });
  };

  // Sync prop changes
  const currentCategoryInfo = useMemo(() => {
    return OFFICIAL_CATEGORIES.find((c) => c.name === activeCategory) || OFFICIAL_CATEGORIES[0];
  }, [activeCategory]);

  // Filter & Search Logic
  const filteredDesigns = useMemo(() => {
    return designsList.filter((design) => {
      // 1. Category Filter (supports category and categoryName)
      const cat = design.category || design.categoryName || "";
      if (activeCategory !== "All" && cat.toLowerCase() !== activeCategory.toLowerCase()) {
        return false;
      }
      // 2. Style Filter
      if (selectedStyle !== "All" && design.style !== selectedStyle) {
        return false;
      }
      // 3. Budget Tier Filter
      if (selectedBudget !== "All" && design.budgetTier !== selectedBudget) {
        return false;
      }
      // 4. Search Query (matches ID, name, description, materials)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const dName = (design.name || design.title || "").toLowerCase();
        const dId = (design.id || "").toLowerCase();
        const dDesc = (design.description || design.leadDescription || "").toLowerCase();
        const matchesSpecs = (design.specifications || []).some((s) => s.toLowerCase().includes(query));
        if (!dName.includes(query) && !dId.includes(query) && !dDesc.includes(query) && !matchesSpecs) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const aFeatured = a.featured ?? a.isFeatured ?? false;
      const bFeatured = b.featured ?? b.isFeatured ?? false;
      if (sortBy === "featured") return (bFeatured ? 1 : 0) - (aFeatured ? 1 : 0);
      const aName = a.name || a.title || "";
      const bName = b.name || b.title || "";
      if (sortBy === "name") return aName.localeCompare(bName);
      const getMinVal = (str) => {
        if (!str) return 0;
        const match = str.match(/₹?([\d.]+)L/);
        return match ? parseFloat(match[1]) : 0;
      };
      if (sortBy === "budget-asc") return getMinVal(a.budget) - getMinVal(b.budget);
      if (sortBy === "budget-desc") return getMinVal(b.budget) - getMinVal(a.budget);
      return 0;
    });
  }, [designsList, activeCategory, selectedStyle, selectedBudget, searchQuery, sortBy]);

  const handleCategorySwitch = (catName) => {
    setActiveCategory(catName);
    if (onSelectCategory) onSelectCategory(catName);
  };

  const getWhatsAppEnquiryUrl = (design) => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I am interested in enquirying about this architectural design:`,
      `• Design ID: ${design.id}`,
      `• Design Name: ${design.name}`,
      `• Category: ${design.category}`,
      `• Style: ${design.style}`,
      `• Estimated Budget: ${design.budget}`,
      `• My Location: ${selectedCity}`,
      ``,
      `Please share the detailed CAD layout and consultation estimate.`
    ].join("\n");

    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleShareDesign = (design) => {
    if (navigator.share) {
      navigator.share({
        title: `${design.name} | ${BUSINESS_INFO.name}`,
        text: `Check out this ${design.category} concept (${design.id}) by ICON INTERIORS.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${design.name} (${design.id}) - ICON INTERIORS: ${window.location.href}`
      );
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2400);
    }
  };

  return (
    <div className="design-ideas-redesign-page">
      {/* =====================================================================
          HEADER & ARCHITECTURAL EYEBROW
          ===================================================================== */}
      <section className="gallery-header-section">
        <div className="gallery-header-container">
          <div className="gallery-eyebrow-badge">
            <span className="badge-spark">✦</span>
            <span>SMART DESIGN INSPIRATION GALLERY</span>
            <span className="badge-total">{DESIGNS_DATABASE.length} ARCHITECTURAL SPECIFICATIONS</span>
          </div>
          <h1 className="gallery-main-headline">
            Explore Bespoke <span className="gold-text-gradient">Design Ideas</span>
          </h1>
          <p className="gallery-sub-description">
            Filter through our curated interior architectural concepts across 11 room categories.
            Every design is backed by precision German joinery, BWP 710 marine plywood, and turnkey execution.
          </p>
        </div>
      </section>

      {/* =====================================================================
          11 CATEGORY NAVIGATION TABS (Horizontal Scrollable Strip)
          ===================================================================== */}
      <nav className="gallery-categories-tabbar" aria-label="Room Categories">
        <div className="categories-tabbar-container">
          {OFFICIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-tab-pill ${activeCategory === cat.name ? "active" : ""}`}
              onClick={() => handleCategorySwitch(cat.name)}
            >
              <span className="cat-pill-icon">{cat.icon}</span>
              <span className="cat-pill-name">{cat.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* =====================================================================
          CATEGORY BANNER & CURRENT CONTEXT
          ===================================================================== */}
      <div className="active-category-context-bar">
        <div className="context-container">
          <div className="context-text">
            <h2>{currentCategoryInfo.name} Interior Architecture</h2>
            <p>{currentCategoryInfo.desc}</p>
          </div>
          <div className="context-meta">
            <span className="meta-pill">Showing {filteredDesigns.length} Curated Concepts</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MULTI-ATTRIBUTE FILTER & SEARCH TOOLBAR
          ===================================================================== */}
      <section className="gallery-filter-toolbar">
        <div className="toolbar-container">
          {/* Search Box */}
          <div className="filter-search-box">
            <span className="search-glass-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by ID (e.g. BED-101), style, materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Style Filter */}
          <div className="filter-select-group">
            <label htmlFor="style-select">Style:</label>
            <select
              id="style-select"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="filter-dropdown"
            >
              {INTERIOR_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style === "All" ? "All Interior Styles" : style}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="filter-select-group">
            <label htmlFor="budget-select">Budget:</label>
            <select
              id="budget-select"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="filter-dropdown"
            >
              {BUDGET_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier === "All" ? "All Budgets" : tier}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-select-group">
            <label htmlFor="sort-select">Sort:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-dropdown"
            >
              <option value="featured">Featured First</option>
              <option value="budget-asc">Budget: Low to High</option>
              <option value="budget-desc">Budget: High to Low</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(selectedStyle !== "All" || selectedBudget !== "All" || searchQuery) && (
            <button
              className="filter-reset-btn"
              onClick={() => {
                setSelectedStyle("All");
                setSelectedBudget("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          )}

          {/* Admin Add New Design Action - Only visible to authenticated Studio Admins */}
          {userIsAdmin && (
            <button
              type="button"
              className="btn-add-design-action"
              onClick={() => {
                setNewDesignForm((prev) => ({ ...prev, category: activeCategory }));
                setIsAddModalOpen(true);
              }}
              title="Add a new design idea or upload real photographs"
            >
              <span>➕ Add Design Idea</span>
            </button>
          )}
        </div>
      </section>

      {/* =====================================================================
          MAIN DESIGNS GALLERY GRID
          Supports Empty Placeholder Containers (Ready for Admin Uploads)
          ===================================================================== */}
      <main className="gallery-cards-grid-section">
        <div className="gallery-grid-container">
          {filteredDesigns.length === 0 ? (
            <div className="gallery-empty-state">
              <span className="empty-blueprint-icon">📐</span>
              <h3>No Designs Match Your Selected Filters</h3>
              <p>Try resetting your style, budget, or search query to explore more concepts.</p>
              <button
                className="btn-gold-primary"
                onClick={() => {
                  setSelectedStyle("All");
                  setSelectedBudget("All");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="design-cards-grid">
              {filteredDesigns.map((design) => {
                const isSaved = favorites.includes(design.id);

                return (
                  <article key={design.id} className="design-spec-card">
                    {/* Visual Media or Neutral Luxury Placeholder Container */}
                    <div className="design-card-media-wrapper">
                      {design.imageUrl ? (
                        <img
                          src={design.imageUrl}
                          alt={design.name}
                          className="design-real-photo"
                          loading="lazy"
                        />
                      ) : (
                        /* NEUTRAL LUXURY PLACEHOLDER CONTAINER (As Requested) */
                        <div className="neutral-luxury-placeholder">
                          <div className="placeholder-blueprint-grid" />
                          <div className="placeholder-content">
                            <span className="placeholder-room-glyph">{currentCategoryInfo.icon}</span>
                            <div className="placeholder-id-stamp">
                              <span className="stamp-label">SPECIFICATION ARCHIVE</span>
                              <span className="stamp-id">{design.id}</span>
                            </div>
                            <span className="placeholder-status-tag">
                              PHOTOGRAPHY RESERVED // READY FOR UPLOAD
                            </span>
                          </div>
                          <div className="placeholder-corner-bracket tl" />
                          <div className="placeholder-corner-bracket tr" />
                          <div className="placeholder-corner-bracket bl" />
                          <div className="placeholder-corner-bracket br" />
                        </div>
                      )}

                      {/* Card Overlay Badges */}
                      <div className="card-top-badges">
                        <span className="badge-design-id">{design.id}</span>
                        {design.featured && <span className="badge-featured-gold">★ Featured</span>}
                        {userIsAdmin && (
                          <button
                            type="button"
                            className="badge-upload-photo-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPhotoUpload(design);
                            }}
                            title="Upload or change photograph for this design"
                          >
                            📷 {design.imageUrl ? "Edit Photo" : "Add Photo"}
                          </button>
                        )}
                      </div>

                      {/* Wishlist Heart Toggle */}
                      <button
                        className={`card-wishlist-btn ${isSaved ? "saved" : ""}`}
                        onClick={() => onToggleFavorite && onToggleFavorite(design.id)}
                        title={isSaved ? "Remove from Saved Moodboard" : "Save to Moodboard"}
                        aria-label={isSaved ? "Saved to Moodboard" : "Save to Moodboard"}
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>

                      <div className="card-media-footer-tags">
                        <span className="tag-style-pill">{design.style}</span>
                        <span className="tag-room-pill">{design.roomType}</span>
                      </div>
                    </div>

                    {/* Card Body & Specs */}
                    <div className="design-card-body">
                      <h3 className="design-title">{design.name || design.title}</h3>
                      <p className="design-description">{design.description || design.leadDescription}</p>

                      <div className="design-specs-list">
                        {(design.specifications || []).slice(0, 3).map((spec, i) => (
                          <span key={i} className="spec-tag">
                            ✦ {spec}
                          </span>
                        ))}
                      </div>

                      <div className="design-card-footer">
                        <div className="budget-pricing-block">
                          <span className="budget-label">ESTIMATED BUDGET</span>
                          <span className="budget-val">{design.budget}</span>
                        </div>

                        <div className="card-actions-row">
                          <button
                            className="btn-card-details"
                            onClick={() => setSelectedDesignForModal(design)}
                          >
                            Details
                          </button>

                          <a
                            href={getWhatsAppEnquiryUrl(design)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-card-whatsapp"
                            title="Instant WhatsApp Enquiry for this Design"
                          >
                            💬 Enquire
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* =====================================================================
          DETAILED DESIGN SPECIFICATION MODAL
          ===================================================================== */}
      {selectedDesignForModal && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedDesignForModal(null)}>
          <div className="design-details-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div className="modal-title-group">
                <span className="modal-id-badge">{selectedDesignForModal.id}</span>
                <h2>{selectedDesignForModal.name || selectedDesignForModal.title}</h2>
              </div>
              <button
                className="modal-close-cross"
                onClick={() => setSelectedDesignForModal(null)}
                aria-label="Close design specifications"
              >
                ✕
              </button>
            </div>

            <div className="modal-body-scrollable">
              {/* Media preview or Neutral Blueprint Container */}
              <div className="modal-media-holder">
                {selectedDesignForModal.imageUrl ? (
                  <img
                    src={selectedDesignForModal.imageUrl}
                    alt={selectedDesignForModal.name || selectedDesignForModal.title}
                    className="modal-photo"
                  />
                ) : (
                  <div className="neutral-luxury-placeholder modal-size">
                    <div className="placeholder-blueprint-grid" />
                    <div className="placeholder-content">
                      <span className="placeholder-room-glyph">{currentCategoryInfo.icon}</span>
                      <div className="placeholder-id-stamp">
                        <span className="stamp-label">ARCHITECTURAL DESIGN SPECIFICATION</span>
                        <span className="stamp-id">{selectedDesignForModal.id}</span>
                      </div>
                      <p className="placeholder-text-muted">
                        Photographic archive container ready for admin-uploaded showroom imagery.
                      </p>
                    </div>
                  </div>
                )}
                {userIsAdmin && (
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="modal-photo-action-btn"
                      onClick={() => openPhotoUpload(selectedDesignForModal)}
                    >
                      📷 {selectedDesignForModal.imageUrl ? "Change Photograph" : "Upload Photograph for this Design"}
                    </button>
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div className="modal-specs-summary-grid">
                <div className="spec-metric-item">
                  <span className="metric-label">CATEGORY</span>
                  <strong>{selectedDesignForModal.category || selectedDesignForModal.categoryName}</strong>
                </div>
                <div className="spec-metric-item">
                  <span className="metric-label">INTERIOR STYLE</span>
                  <strong>{selectedDesignForModal.style}</strong>
                </div>
                <div className="spec-metric-item">
                  <span className="metric-label">ROOM DIMENSIONS</span>
                  <strong>{selectedDesignForModal.roomType || selectedDesignForModal.dimensions}</strong>
                </div>
                <div className="spec-metric-item">
                  <span className="metric-label">BUDGET RANGE</span>
                  <strong className="gold-budget">{selectedDesignForModal.budget}</strong>
                </div>
              </div>

              <div className="modal-section-block">
                <h4>Design Overview & Architectural Intent</h4>
                <p>{selectedDesignForModal.description || selectedDesignForModal.leadDescription}</p>
              </div>

              <div className="modal-section-block">
                <h4>Materials & Quality Standards</h4>
                <ul className="modal-materials-checklist">
                  {(selectedDesignForModal.specifications || []).map((item, idx) => (
                    <li key={idx}>
                      <span className="check-gold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  <li>
                    <span className="check-gold">✓</span>
                    <span>Boiling Water Proof BWP 710 Marine Grade Core Plywood</span>
                  </li>
                  <li>
                    <span className="check-gold">✓</span>
                    <span>German Soft-Close Blum / Hafele Precision Hardware</span>
                  </li>
                  <li>
                    <span className="check-gold">✓</span>
                    <span>10-Year Comprehensive ICON INTERIORS Warranty</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button
                className="btn-share-design"
                onClick={() => handleShareDesign(selectedDesignForModal)}
              >
                🔗 {copiedNotification ? "Link Copied!" : "Share Design"}
              </button>

              <button
                className="btn-website-enquiry"
                onClick={() => {
                  const d = selectedDesignForModal;
                  setSelectedDesignForModal(null);
                  if (onOpenEnquiry) {
                    onOpenEnquiry(d);
                  }
                }}
              >
                Submit Website Enquiry
              </button>

              <a
                href={getWhatsAppEnquiryUrl(selectedDesignForModal)}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-whatsapp"
              >
                💬 Enquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          1. PHOTO UPLOAD / UPDATE MODAL
          ===================================================================== */}
      {photoUploadTarget && (
        <div className="modal-backdrop-overlay" onClick={() => setPhotoUploadTarget(null)}>
          <div className="admin-photo-upload-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <div className="dialog-title-block">
                <span className="dialog-badge">ADMIN GALLERY CMS</span>
                <h3>Upload Photograph for {photoUploadTarget.id}</h3>
                <p>{photoUploadTarget.name} ({photoUploadTarget.category})</p>
              </div>
              <button className="modal-close-btn" onClick={() => setPhotoUploadTarget(null)}>✕</button>
            </div>

            <div className="dialog-body">
              {/* Preview Box */}
              <div className="upload-preview-box">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="upload-preview-img" />
                ) : (
                  <div className="upload-preview-empty">
                    <span className="empty-camera-icon">📷</span>
                    <p>No photograph attached yet. Upload an image file from your computer or paste an image URL.</p>
                  </div>
                )}
              </div>

              {/* Option A: Device File Upload */}
              <div className="upload-input-group">
                <label className="upload-input-label">Option 1: Choose Image from Computer</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-picker-input"
                />
              </div>

              {/* Option B: Image URL */}
              <div className="upload-input-group">
                <label className="upload-input-label">Option 2: Or Paste Image Web URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or direct image link"
                  value={photoUploadUrl}
                  onChange={(e) => {
                    setPhotoUploadUrl(e.target.value);
                    setPhotoPreview(e.target.value);
                  }}
                  className="url-text-input"
                />
              </div>
            </div>

            <div className="dialog-footer">
              {photoUploadTarget.imageUrl ? (
                <button
                  type="button"
                  className="btn-remove-photo"
                  onClick={handleRemovePhoto}
                >
                  🗑️ Remove Photo (Restore CAD Grid)
                </button>
              ) : <div />}
              <div className="dialog-footer-right">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setPhotoUploadTarget(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-gold-save"
                  onClick={handleSavePhoto}
                  disabled={!photoPreview || isSavingPhoto}
                >
                  {isSavingPhoto ? "⏳ Saving..." : "✓ Save Photograph"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. ADD NEW DESIGN IDEA MODAL
          ===================================================================== */}
      {isAddModalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="admin-photo-upload-dialog add-design-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <div className="dialog-title-block">
                <span className="dialog-badge">ADMIN GALLERY CMS</span>
                <h3>Add New Architectural Design Idea</h3>
                <p>Publish a new interior concept card for this category with real photography.</p>
              </div>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateNewDesign} className="dialog-body">
              <div className="form-grid-2">
                <div className="upload-input-group">
                  <label className="upload-input-label">Room Category *</label>
                  <select
                    value={newDesignForm.category}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, category: e.target.value })}
                    className="url-text-input"
                    required
                  >
                    {OFFICIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="upload-input-group">
                  <label className="upload-input-label">Design Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Italian Travertine Master Suite"
                    value={newDesignForm.name}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, name: e.target.value })}
                    className="url-text-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="upload-input-group">
                  <label className="upload-input-label">Interior Style</label>
                  <select
                    value={newDesignForm.style}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, style: e.target.value })}
                    className="url-text-input"
                  >
                    {INTERIOR_STYLES.filter((s) => s !== "All").map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="upload-input-group">
                  <label className="upload-input-label">Budget Tier</label>
                  <select
                    value={newDesignForm.budgetTier}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, budgetTier: e.target.value })}
                    className="url-text-input"
                  >
                    {BUDGET_TIERS.filter((b) => b !== "All").map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="upload-input-group">
                  <label className="upload-input-label">Estimated Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹14.0L – ₹18.0L"
                    value={newDesignForm.budget}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, budget: e.target.value })}
                    className="url-text-input"
                  />
                </div>

                <div className="upload-input-group">
                  <label className="upload-input-label">Dimensions / Typology</label>
                  <input
                    type="text"
                    placeholder="e.g. 18 ft x 16 ft (288 sq.ft)"
                    value={newDesignForm.roomType}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, roomType: e.target.value })}
                    className="url-text-input"
                  />
                </div>
              </div>

              <div className="upload-input-group">
                <label className="upload-input-label">Showroom Photograph (File or URL)</label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setNewDesignForm((prev) => ({ ...prev, imageUrl: ev.target?.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="file-picker-input"
                  />
                  <input
                    type="url"
                    placeholder="Or paste image URL"
                    value={newDesignForm.imageUrl}
                    onChange={(e) => setNewDesignForm({ ...newDesignForm, imageUrl: e.target.value })}
                    className="url-text-input"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div className="upload-input-group">
                <label className="upload-input-label">Architectural Description</label>
                <textarea
                  rows="2"
                  placeholder="Design intent, lighting layout, spatial harmony..."
                  value={newDesignForm.description}
                  onChange={(e) => setNewDesignForm({ ...newDesignForm, description: e.target.value })}
                  className="url-text-input"
                />
              </div>

              <div className="upload-input-group">
                <label className="upload-input-label">Specifications (comma-separated tags)</label>
                <input
                  type="text"
                  placeholder="BWP 710 Marine Ply, Blum Soft-Close, High-CRI LED"
                  value={newDesignForm.specifications}
                  onChange={(e) => setNewDesignForm({ ...newDesignForm, specifications: e.target.value })}
                  className="url-text-input"
                />
              </div>

              <div className="dialog-footer" style={{ marginTop: "16px", padding: 0 }}>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold-save"
                >
                  ✓ Create Design Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
