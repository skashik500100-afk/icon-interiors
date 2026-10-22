import { useState } from "react";
import {
  getStoredGeminiKey,
  saveStoredGeminiKey,
  getStoredUnsplashKey,
  saveStoredUnsplashKey,
  generateInteriorConcept
} from "../services/apiService";
import { ROOM_TYPES, DESIGN_STYLES, AI_PRESETS } from "../data/designsData";

export default function AIStudioModal({ isOpen, onClose, onKeysUpdated }) {
  const [activeTab, setActiveTab] = useState("generator"); // 'generator' | 'settings'

  // API Key States
  const [geminiKey, setGeminiKey] = useState(() => getStoredGeminiKey());
  const [unsplashKey, setUnsplashKey] = useState(() => getStoredUnsplashKey());
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showUnsplashKey, setShowUnsplashKey] = useState(false);
  const [keySaveMessage, setKeySaveMessage] = useState("");

  // Generator Form States
  const [room, setRoom] = useState("Living Room");
  const [style, setStyle] = useState("Japandi");
  const [budget, setBudget] = useState("Signature Elegance");
  const [sqft, setSqft] = useState("350 sq.ft");
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConcept, setGeneratedConcept] = useState(() => AI_PRESETS[0]);
  const [generationError, setGenerationError] = useState("");
  const [copiedHex, setCopiedHex] = useState(null);

  if (!isOpen) return null;

  const handleSaveKeys = (e) => {
    e.preventDefault();
    saveStoredGeminiKey(geminiKey);
    saveStoredUnsplashKey(unsplashKey);
    setKeySaveMessage("✓ API Keys saved successfully in your local browser storage!");
    if (onKeysUpdated) onKeysUpdated();
    setTimeout(() => setKeySaveMessage(""), 4000);
  };

  const handleGenerate = async (customPreset = null) => {
    setIsGenerating(true);
    setGenerationError("");

    const targetRoom = customPreset ? customPreset.room : room;
    const targetStyle = customPreset ? customPreset.style : style;
    const targetPrompt = customPreset ? customPreset.prompt : userPrompt;

    if (customPreset) {
      setRoom(customPreset.room);
      setStyle(customPreset.style);
      setUserPrompt(customPreset.prompt);
    }

    try {
      const result = await generateInteriorConcept({
        room: targetRoom,
        style: targetStyle,
        budget,
        sqft,
        userPrompt: targetPrompt,
        apiKey: geminiKey
      });

      setGeneratedConcept(result.data);
    } catch (err) {
      console.error(err);
      setGenerationError(
        err.message || "Failed to generate concept. Please verify your Gemini API key or switch to demo presets."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getWhatsAppAIEnquiryUrl = () => {
    if (!generatedConcept) return "#";
    const text = [
      `Hello ICON INTERIORS!`,
      `I generated an AI Interior Design Concept on your studio and want to consult on executing it:`,
      `• Concept: ${generatedConcept.concept}`,
      `• Room: ${room} (${style})`,
      `• Estimated Investment: ${generatedConcept.budgetRange || "To be discussed"}`,
      `• Primary Materials: ${generatedConcept.materials?.slice(0, 3).join(", ")}`,
      `• Palette: ${generatedConcept.palette?.map((p) => `${p.name} (${p.hex})`).join(", ")}`,
      ``,
      `Can we schedule a consultation to discuss this design?`
    ].join("\n");

    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="ai-modal-header">
          <div className="ai-modal-title-group">
            <span className="sparkle-badge">✦ GEMINI 3.8 / 2.5 FLASH</span>
            <h2>AI Interior Architecture Studio</h2>
          </div>
          <button className="ai-modal-close" onClick={onClose} aria-label="Close studio">
            ✕
          </button>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="ai-modal-tabs">
          <button
            className={`tab-btn ${activeTab === "generator" ? "active" : ""}`}
            onClick={() => setActiveTab("generator")}
          >
            ✦ Generative Room Designer
          </button>
          <button
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙ API Keys Configuration
            <span className={`pill-key-state ${geminiKey ? "on" : "off"}`}>
              {geminiKey ? "Gemini Key Active" : "Demo Mode"}
            </span>
          </button>
        </div>

        {/* TAB 1: GENERATIVE ROOM DESIGNER */}
        {activeTab === "generator" && (
          <div className="generator-tab-content">
            <div className="generator-layout">
              {/* Form Controls Column */}
              <div className="generator-form-col">
                <div className="preset-suggestions">
                  <span className="preset-label">Quick AI Presets:</span>
                  <div className="preset-chips">
                    {AI_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        className="preset-chip"
                        onClick={() => handleGenerate(preset)}
                        type="button"
                      >
                        ✦ {preset.room} ({preset.style})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Room Category</label>
                    <select value={room} onChange={(e) => setRoom(e.target.value)}>
                      {ROOM_TYPES.filter((r) => r !== "All Spaces").map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Architectural Style</label>
                    <select value={style} onChange={(e) => setStyle(e.target.value)}>
                      {DESIGN_STYLES.filter((s) => s !== "All Styles").map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="input-group">
                    <label>Budget Tier</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="Essential Luxury">Essential Luxury (₹1,250/sqft)</option>
                      <option value="Signature Elegance">Signature Elegance (₹1,850/sqft)</option>
                      <option value="Ultra-Luxury Bespoke">Ultra-Luxury Bespoke (₹2,750/sqft)</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Room Dimensions / Area</label>
                    <input
                      type="text"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="e.g. 400 sq.ft (20x20)"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Bespoke Requirements / Design Notes</label>
                  <textarea
                    rows="3"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="e.g. Double-height ceiling with Italian marble, hidden LED cove channels, fluted dark walnut TV wall, and emerald green velvet accent chairs..."
                  />
                </div>

                <button
                  className="btn-generate-ai"
                  onClick={() => handleGenerate()}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span className="generating-spinner">✦ Architect AI Thinking...</span>
                  ) : (
                    <span>✦ Generate Bespoke Concept with Gemini</span>
                  )}
                </button>

                {!geminiKey && (
                  <p className="demo-notice">
                    Using curated AI simulator.{" "}
                    <button onClick={() => setActiveTab("settings")} className="link-inline">
                      Add your free Gemini API key
                    </button>{" "}
                    for infinite live real-time AI architectural generations.
                  </p>
                )}

                {generationError && <div className="error-box">{generationError}</div>}
              </div>

              {/* AI Concept Output Preview Column */}
              <div className="generator-result-col">
                {generatedConcept ? (
                  <div className="concept-card">
                    <div className="concept-card-header">
                      <span className="concept-badge">ARCHITECTURAL SCHEME</span>
                      <h3>{generatedConcept.concept}</h3>
                      <p className="concept-summary">{generatedConcept.summary}</p>
                    </div>

                    {/* Color Harmony Palette */}
                    <div className="concept-block">
                      <h4>Curated 5-Color Harmony Palette</h4>
                      <div className="palette-swatches-grid">
                        {generatedConcept.palette?.map((swatch, i) => (
                          <div
                            key={i}
                            className="swatch-card"
                            onClick={() => copyToClipboard(swatch.hex)}
                            title="Click to copy HEX"
                          >
                            <div className="swatch-color-box" style={{ backgroundColor: swatch.hex }} />
                            <span className="swatch-name">{swatch.name}</span>
                            <span className="swatch-code">
                              {copiedHex === swatch.hex ? "Copied!" : swatch.hex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Materials & Textures */}
                    <div className="concept-block">
                      <h4>Material & Texture Palette</h4>
                      <div className="materials-grid">
                        {generatedConcept.materials?.map((mat, i) => (
                          <div key={i} className="mat-item">
                            <span className="mat-dot">✦</span>
                            <span>{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Lighting Scheme */}
                    <div className="concept-block">
                      <h4>Lighting Layering Strategy</h4>
                      <p className="lighting-desc">{generatedConcept.lighting}</p>
                    </div>

                    {/* Budget & Architect Tip */}
                    <div className="concept-meta-split">
                      <div className="concept-budget-box">
                        <span className="meta-label">Est. Budget Range</span>
                        <span className="meta-val">{generatedConcept.budgetRange || "₹4.5L - ₹7.0L"}</span>
                      </div>
                      <div className="concept-tip-box">
                        <span className="meta-label">Architect's Insider Tip</span>
                        <p>{generatedConcept.tips}</p>
                      </div>
                    </div>

                    {/* Action button */}
                    <a
                      href={getWhatsAppAIEnquiryUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-whatsapp-concept"
                    >
                      Enquire This AI Design on WhatsApp ↗
                    </a>
                  </div>
                ) : (
                  <div className="empty-concept-box">
                    <p>Select your room and style on the left and click "Generate Bespoke Concept".</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: API KEYS CONFIGURATION */}
        {activeTab === "settings" && (
          <div className="settings-tab-content">
            <div className="settings-intro">
              <h3>Connect Your API Keys</h3>
              <p>
                Empower your ICON INTERIORS experience by integrating your own API keys.
                Your keys are stored exclusively in your local browser's <code>localStorage</code> and are never
                shared with any third-party server.
              </p>
            </div>

            <form onSubmit={handleSaveKeys} className="api-keys-form">
              {/* Gemini Key */}
              <div className="key-field-card">
                <div className="key-header">
                  <div className="key-brand">
                    <strong>1. Google Gemini API Key</strong>
                    <span className="badge-use">Powers Generative AI Interior Architecture</span>
                  </div>
                  <span className={`status-indicator ${geminiKey ? "connected" : "idle"}`}>
                    {geminiKey ? "● Key Configured" : "○ Demo Mode"}
                  </span>
                </div>
                <p className="key-helper">
                  Enables live, custom generation of architectural moodboards, 5-color palettes, lighting layers,
                  and finish selections via <code>gemini-2.5-flash</code>.
                </p>
                <div className="key-input-wrapper">
                  <input
                    type={showGeminiKey ? "text" : "password"}
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="key-input"
                  />
                  <button
                    type="button"
                    className="btn-toggle-eye"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                  >
                    {showGeminiKey ? "Hide" : "Show"}
                  </button>
                  {geminiKey && (
                    <button
                      type="button"
                      className="btn-clear-key"
                      onClick={() => setGeminiKey("")}
                      title="Clear Key"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="get-key-link"
                >
                  Get a Free Google Gemini API Key from Google AI Studio ↗
                </a>
              </div>

              {/* Unsplash Key */}
              <div className="key-field-card">
                <div className="key-header">
                  <div className="key-brand">
                    <strong>2. Unsplash API Access Key</strong>
                    <span className="badge-use">Powers Live HD Design Photo Search</span>
                  </div>
                  <span className={`status-indicator ${unsplashKey ? "connected" : "idle"}`}>
                    {unsplashKey ? "● Key Configured" : "○ Curated Mode"}
                  </span>
                </div>
                <p className="key-helper">
                  Enables searching millions of high-definition architectural and interior photography directly
                  inside the gallery with live keywords.
                </p>
                <div className="key-input-wrapper">
                  <input
                    type={showUnsplashKey ? "text" : "password"}
                    value={unsplashKey}
                    onChange={(e) => setUnsplashKey(e.target.value)}
                    placeholder="Enter Unsplash Access Key..."
                    className="key-input"
                  />
                  <button
                    type="button"
                    className="btn-toggle-eye"
                    onClick={() => setShowUnsplashKey(!showUnsplashKey)}
                  >
                    {showUnsplashKey ? "Hide" : "Show"}
                  </button>
                  {unsplashKey && (
                    <button
                      type="button"
                      className="btn-clear-key"
                      onClick={() => setUnsplashKey("")}
                      title="Clear Key"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <a
                  href="https://unsplash.com/developers"
                  target="_blank"
                  rel="noreferrer"
                  className="get-key-link"
                >
                  Get a Free Unsplash Access Key ↗
                </a>
              </div>

              {keySaveMessage && <div className="key-success-box">{keySaveMessage}</div>}

              <div className="settings-actions">
                <button type="submit" className="btn-gold-primary">
                  Save API Keys to Browser
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("generator")}
                  className="btn-outline-gold"
                >
                  Back to AI Designer
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
