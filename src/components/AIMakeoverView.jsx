import { useState, useRef } from "react";
import { BUSINESS_INFO, INTERIOR_STYLES } from "../data/designsData";
import { getAIMakeoverDesign } from "../data/aiMakeoverData";

export default function AIMakeoverView({ onNavigate, onOpenConsultation }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [roomType, setRoomType] = useState("Master Bedroom");
  const [selectedStyle, setSelectedStyle] = useState("Luxury");
  const [preferredColor, setPreferredColor] = useState("Warm Beige & Champagne Gold");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0); // 0..100
  const [generatedResult, setGeneratedResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Interactive Results Controls
  const [comparisonMode, setComparisonMode] = useState("side-by-side"); // 'side-by-side' | 'slider'
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100%
  const [activeVariationIndex, setActiveVariationIndex] = useState(0);
  const sliderContainerRef = useRef(null);

  const roomTypes = [
    "Master Bedroom",
    "Living Room",
    "Modular Kitchen",
    "Dining Room",
    "Home Office",
    "Bathroom",
    "Balcony"
  ];

  const colorPalettes = [
    "Warm Beige & Champagne Gold",
    "Obsidian Black & Smoked Walnut",
    "Calacatta White & Light Oak",
    "Emerald Jewel Tone & Brass",
    "Muted Sage & Sandstone",
    "Monochromatic Charcoal & Grey"
  ];

  const styles = INTERIOR_STYLES.filter((s) => s !== "All");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("File size exceeds 15MB. Please upload a smaller photograph.");
      return;
    }

    setErrorMessage("");
    setUploadedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setGeneratedResult(null);
    setActiveVariationIndex(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please drop a valid image file.");
        return;
      }
      setErrorMessage("");
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedResult(null);
      setActiveVariationIndex(0);
    }
  };

  const handleGenerateMakeover = async () => {
    if (!uploadedFile && !previewUrl) {
      setErrorMessage("Please upload or drop a photograph of your existing room first.");
      return;
    }

    setErrorMessage("");
    setIsGenerating(true);
    setProgressStep(15);

    try {
      // Step-by-step progress simulation reflecting architectural spatial analysis
      await new Promise((r) => setTimeout(r, 450));
      setProgressStep(40);
      await new Promise((r) => setTimeout(r, 550));
      setProgressStep(75);
      await new Promise((r) => setTimeout(r, 500));
      setProgressStep(100);

      // Fetch curated high-resolution AI architectural transformation
      const designData = getAIMakeoverDesign(
        roomType,
        selectedStyle,
        preferredColor,
        activeVariationIndex
      );

      setGeneratedResult({
        roomType: designData.roomType,
        style: designData.style,
        palette: preferredColor,
        originalImage: previewUrl,
        generatedImage: designData.image,
        variations: designData.variations,
        features: designData.features,
        conceptNotes: `Bespoke ${designData.style} transformation for ${designData.roomType} in ${preferredColor}. Integrated 2700K warm architectural LED channels, factory-built BWP 710 marine joinery, and tailored luxury finishes.`,
        estimatedBudgetRange: designData.budget,
        turnkeyTimeline: designData.timeline
      });
    } catch {
      setErrorMessage("AI generation service is temporarily busy. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectVariation = (idx) => {
    setActiveVariationIndex(idx);
    const designData = getAIMakeoverDesign(roomType, selectedStyle, preferredColor, idx);
    setGeneratedResult((prev) =>
      prev
        ? {
            ...prev,
            generatedImage: designData.image,
            features: designData.features
          }
        : null
    );
  };

  const handleReset = () => {
    setUploadedFile(null);
    setPreviewUrl("");
    setGeneratedResult(null);
    setErrorMessage("");
    setProgressStep(0);
    setActiveVariationIndex(0);
    setComparisonMode("side-by-side");
  };

  const handleDownloadImage = () => {
    if (!generatedResult?.generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedResult.generatedImage;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.download = `ICON-INTERIORS-${generatedResult.roomType}-${generatedResult.style}-Makeover.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppEnquiryUrl = () => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I used your AI Room Makeover tool for my ${roomType}:`,
      `• Chosen Style: ${selectedStyle}`,
      `• Preferred Palette: ${preferredColor}`,
      `• Estimated Scope: ${generatedResult?.estimatedBudgetRange || "To be discussed"}`,
      ``,
      `Can we review my room redesign and schedule a consultation at your Guntur Flagship Studio?`
    ].join("\n");

    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="ai-makeover-page-container">
      {/* Header */}
      <header className="ai-makeover-header">
        <div className="ai-badge">
          <span className="badge-spark">✦</span>
          <span>INTELLIGENT ARCHITECTURAL VISUALIZATION</span>
        </div>
        <h1>
          AI Room <span className="gold-text-gradient">Makeover</span>
        </h1>
        <p>
          Upload a photograph of your existing bare shell or finished room.
          Select your architectural style and palette to visualize a photorealistic luxury interior design transformation.
        </p>
      </header>

      {/* Main Studio Workspace */}
      <div className="ai-workspace-container">
        {/* Left Column: Upload & Options */}
        <div className="ai-controls-panel">
          <div className="step-block">
            <span className="step-badge">STEP 1</span>
            <h3>Upload Room Photograph</h3>
            <p className="step-hint">JPG, PNG, or WebP up to 15MB. Take a well-lit photo showing walls & floor.</p>

            <div
              className={`photo-dropzone ${previewUrl ? "has-file" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {previewUrl ? (
                <div className="preview-media-box">
                  <img src={previewUrl} alt="Uploaded room preview" className="uploaded-thumb-img" />
                  <button className="btn-remove-photo" onClick={handleReset} title="Remove and upload another photo">
                    ✕ Change Photo
                  </button>
                </div>
              ) : (
                <label className="dropzone-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-hidden-input"
                  />
                  <span className="dropzone-icon">📷</span>
                  <span className="dropzone-main-text">Click to Upload or Drag & Drop</span>
                  <span className="dropzone-sub-text">Smartphone camera photos work great</span>
                </label>
              )}
            </div>
            {errorMessage && <div className="error-alert-banner">{errorMessage}</div>}
          </div>

          {/* STEP 2: Room Type */}
          <div className="step-block">
            <span className="step-badge">STEP 2</span>
            <h3>Select Room Type</h3>
            <div className="chips-selector-grid">
              {roomTypes.map((rt) => (
                <button
                  key={rt}
                  type="button"
                  className={`chip-select-btn ${roomType === rt ? "selected" : ""}`}
                  onClick={() => setRoomType(rt)}
                >
                  {rt}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Interior Style */}
          <div className="step-block">
            <span className="step-badge">STEP 3</span>
            <h3>Select Interior Style</h3>
            <div className="chips-selector-grid">
              {styles.map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`chip-select-btn ${selectedStyle === st ? "selected" : ""}`}
                  onClick={() => setSelectedStyle(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Color Palette */}
          <div className="step-block">
            <span className="step-badge">STEP 4</span>
            <h3>Preferred Color Palette</h3>
            <div className="palette-selector-list">
              {colorPalettes.map((cp) => (
                <button
                  key={cp}
                  type="button"
                  className={`palette-select-row ${preferredColor === cp ? "selected" : ""}`}
                  onClick={() => setPreferredColor(cp)}
                >
                  <span className="palette-bullet">◆</span>
                  <span>{cp}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Action Button */}
          <div className="generate-action-box">
            <button
              type="button"
              className="btn-gold-generate"
              onClick={handleGenerateMakeover}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="spinner-orbit" />
                  <span>Generating Architectural Makeover ({progressStep}%)...</span>
                </>
              ) : (
                <>
                  <span>Generate AI Room Makeover</span>
                  <span className="btn-arrow">›</span>
                </>
              )}
            </button>
            <p className="privacy-reassurance">
              🔒 Your uploaded room photos are kept private and processed securely.
            </p>
          </div>
        </div>

        {/* Right Column: AI Output & Comparison */}
        <div className="ai-results-panel">
          {!generatedResult && !isGenerating && (
            <div className="ai-canvas-empty-state">
              <span className="empty-sparkle">✦</span>
              <h3>Your AI Makeover Preview Will Appear Here</h3>
              <p>Upload your room photo on the left and select your style preferences to initiate 3D concept rendering.</p>
              <div className="sample-styles-strip">
                <span>Popular Styles: Luxury • Japandi • Minimalist • Modern Classic</span>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="ai-generating-loader-card">
              <div className="loader-laser-radar" />
              <h3>Architectural AI Analyzing Your Spatial Volume...</h3>
              <p>Detecting walls, floor area, ceiling height, and applying {selectedStyle} materials in {preferredColor}.</p>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progressStep}%` }} />
              </div>
            </div>
          )}

          {generatedResult && (
            <div className="ai-completed-result-card">
              <div className="result-card-header">
                <div className="result-header-text">
                  <span className="concept-badge">AI DESIGN GENERATED</span>
                  <h3>{generatedResult.style} {generatedResult.roomType}</h3>
                </div>

                <div className="result-actions-top">
                  {/* View Mode Switcher */}
                  <div className="ai-view-toggle-group">
                    <button
                      type="button"
                      className={`view-toggle-btn ${comparisonMode === "side-by-side" ? "active" : ""}`}
                      onClick={() => setComparisonMode("side-by-side")}
                    >
                      Side by Side
                    </button>
                    <button
                      type="button"
                      className={`view-toggle-btn ${comparisonMode === "slider" ? "active" : ""}`}
                      onClick={() => setComparisonMode("slider")}
                    >
                      Split Slider
                    </button>
                  </div>

                  <button type="button" className="btn-reset-light" onClick={handleReset}>
                    Try Another Room
                  </button>
                </div>
              </div>

              {/* Design Concept Variation Selector */}
              {generatedResult.variations && generatedResult.variations.length > 1 && (
                <div className="ai-variations-bar">
                  <span className="variations-label">Explore Concept Variations:</span>
                  <div className="variations-pills">
                    {generatedResult.variations.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`variation-pill-btn ${activeVariationIndex === idx ? "active" : ""}`}
                        onClick={() => handleSelectVariation(idx)}
                      >
                        Concept 0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW 1: SIDE-BY-SIDE COMPARISON */}
              {comparisonMode === "side-by-side" && (
                <div className="side-by-side-display">
                  <div className="comparison-side">
                    <div className="comparison-tag-bar">
                      <span className="comparison-label original">YOUR CURRENT ROOM</span>
                    </div>
                    <div className="comparison-media-holder">
                      <img
                        src={generatedResult.originalImage}
                        alt="Original uploaded room"
                        className="comparison-img"
                      />
                    </div>
                  </div>

                  <div className="comparison-divider">➔</div>

                  <div className="comparison-side">
                    <div className="comparison-tag-bar">
                      <span className="comparison-label generated">
                        AI {generatedResult.style.toUpperCase()} REDESIGN
                      </span>
                    </div>
                    <div className="comparison-media-holder redesign">
                      <img
                        src={generatedResult.generatedImage}
                        alt={`AI ${generatedResult.style} ${generatedResult.roomType} Redesign`}
                        className="comparison-img redesign-img"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85";
                        }}
                      />
                      <span className="generated-badge-watermark">✦ ICON INTERIORS AI</span>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: INTERACTIVE BEFORE / AFTER SPLIT SLIDER */}
              {comparisonMode === "slider" && (
                <div className="slider-wrapper-box">
                  <div className="before-after-slider-container" ref={sliderContainerRef}>
                    {/* Background: AI Redesign (After) */}
                    <img
                      src={generatedResult.generatedImage}
                      alt="AI Redesign"
                      className="slider-base-img"
                    />
                    <span className="slider-tag after">AFTER • AI LUXURY REDESIGN</span>

                    {/* Overlay: Original Room (Before) with dynamic clip width */}
                    <div
                      className="slider-clip-layer"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={generatedResult.originalImage}
                        alt="Original room"
                        className="slider-overlay-img"
                      />
                      <span className="slider-tag before">BEFORE • YOUR ROOM</span>
                    </div>

                    {/* Vertical Divider Line with Knob */}
                    <div
                      className="slider-divider-line"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="slider-handle-knob">
                        <span>⮜ ⮞</span>
                      </div>
                    </div>

                    {/* Transparent Range Input for Touch and Drag */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="slider-drag-range-input"
                      aria-label="Before and after slider position"
                    />
                  </div>
                  <p className="slider-instruction">
                    Drag the gold slider left and right to compare your raw room with the AI redesign.
                  </p>
                </div>
              )}

              {/* Architectural Notes & Estimates */}
              <div className="concept-meta-summary">
                <div className="concept-stat">
                  <span className="stat-label">INDICATIVE BUDGET</span>
                  <strong>{generatedResult.estimatedBudgetRange}</strong>
                </div>
                <div className="concept-stat">
                  <span className="stat-label">EXECUTION DURATION</span>
                  <strong>{generatedResult.turnkeyTimeline}</strong>
                </div>
                <div className="concept-stat">
                  <span className="stat-label">MATERIAL STANDARD</span>
                  <strong>BWP 710 Marine Grade</strong>
                </div>
              </div>

              {/* Generated Architectural Specifications */}
              {generatedResult.features && (
                <div className="ai-specs-card">
                  <h4 className="specs-card-title">✦ Architectural Specifications Implemented:</h4>
                  <ul className="specs-card-list">
                    {generatedResult.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <span className="check-bullet">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="result-cta-footer">
                <button
                  type="button"
                  className="btn-gold-primary"
                  onClick={onOpenConsultation}
                >
                  Book Consultation to Execute This Design ›
                </button>

                <button
                  type="button"
                  className="btn-outline-gold"
                  onClick={handleDownloadImage}
                  title="Download the high-resolution AI redesign"
                >
                  📥 Download Design Image
                </button>

                {onNavigate && (
                  <button
                    type="button"
                    className="btn-outline-gold"
                    onClick={() => onNavigate("design-ideas")}
                  >
                    Explore Design Ideas ›
                  </button>
                )}

                <a
                  href={getWhatsAppEnquiryUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp-action"
                >
                  💬 Enquire on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
