import { useState } from "react";

const FLOORING_OPTIONS = [
  {
    id: "fl-1",
    name: "Italian Statuario Marble",
    type: "Natural Stone",
    desc: "Book-matched 6x4 slabs with golden gray veining and diamond mirror polish.",
    bgPreview: "linear-gradient(135deg, #f5f5f5 0%, #e0ddd7 50%, #d1cbbf 100%)",
    accentTone: "#D4AF37"
  },
  {
    id: "fl-2",
    name: "Smoked Herringbone White Oak",
    type: "Engineered Hardwood",
    desc: "Deep wire-brushed European oak laid in classic 90-degree herringbone pattern with matte UV lacquer.",
    bgPreview: "linear-gradient(135deg, #8B653B 0%, #5E4325 50%, #3D2B17 100%)",
    accentTone: "#C59B6A"
  },
  {
    id: "fl-3",
    name: "Seamless Greige Micro-Cement",
    type: "Seamless Mineral",
    desc: "Monolithic joint-free micro-topping with warm tactile texture and water-resistant sealant.",
    bgPreview: "linear-gradient(135deg, #b0a99f 0%, #948c82 50%, #7d756b 100%)",
    accentTone: "#A89F91"
  }
];

const WALL_OPTIONS = [
  {
    id: "wl-1",
    name: "Natural White Oak Fluted Slats",
    type: "Architectural Woodwork",
    desc: "Solid precision CNC routed oak slats with integrated concealed LED channel lighting.",
    pattern: "repeating-linear-gradient(90deg, #b5956f, #b5956f 12px, #3a2e22 12px, #3a2e22 16px)"
  },
  {
    id: "wl-2",
    name: "Venetian Travertine Lime Plaster",
    type: "Artisanal Stucco",
    desc: "Hand-troweled Italian mineral lime plaster with natural acoustic dampening and warm earthy sheen.",
    pattern: "linear-gradient(135deg, #d8cebe 0%, #c4b6a1 50%, #b2a18a 100%)"
  },
  {
    id: "wl-3",
    name: "Charcoal Slate & Gilded Brass Inlays",
    type: "Contemporary Luxury",
    desc: "Large format honed charcoal slate panels broken by 6mm brushed brass hairline geometric channels.",
    pattern: "repeating-linear-gradient(90deg, #22201d, #22201d 80px, #c9a45c 80px, #c9a45c 82px)"
  }
];

const ACCENT_OPTIONS = [
  { id: "ac-1", name: "Brushed Champagne Brass", hex: "#C8A45D" },
  { id: "ac-2", name: "Matte Architectural Obsidian", hex: "#1C1B1A" },
  { id: "ac-3", name: "Aged Rose Bronze", hex: "#A87259" }
];

export default function RoomCustomizer() {
  const [selectedFloor, setSelectedFloor] = useState(FLOORING_OPTIONS[0]);
  const [selectedWall, setSelectedWall] = useState(WALL_OPTIONS[0]);
  const [selectedAccent, setSelectedAccent] = useState(ACCENT_OPTIONS[0]);

  const getWhatsAppCustomizerUrl = () => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I used your Material Studio and would like to build a room with this bespoke combination:`,
      `• Flooring: ${selectedFloor.name} (${selectedFloor.type})`,
      `• Wall Finish: ${selectedWall.name} (${selectedWall.type})`,
      `• Hardware Accent: ${selectedAccent.name}`,
      ``,
      `Can we schedule a 3D visualization consultation?`
    ].join("\n");

    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="customizer-section" id="customizer">
      <div className="section-header">
        <span className="section-eyebrow">INTERACTIVE MATERIAL STUDIO</span>
        <h2 className="section-title">
          Curate Your Bespoke <span className="gold-text-gradient">Finish Palette.</span>
        </h2>
        <p className="section-description">
          Test tactile combinations of imported Italian stone, precision acoustic timber joinery,
          and hand-finished metals before committing to your home's 3D renders.
        </p>
      </div>

      <div className="customizer-grid">
        {/* Interactive Visual Canvas */}
        <div className="customizer-canvas-card">
          <div className="customizer-preview-box">
            {/* Simulated Wall Zone */}
            <div
              className="preview-wall-layer"
              style={{ background: selectedWall.pattern }}
            >
              <div className="wall-lighting-glow" style={{ borderColor: selectedAccent.hex }} />
              <div className="wall-artwork-frame" style={{ borderColor: selectedAccent.hex }}>
                <span className="frame-monogram" style={{ color: selectedAccent.hex }}>✦ ICON</span>
              </div>
            </div>

            {/* Simulated Flooring Zone */}
            <div
              className="preview-floor-layer"
              style={{ background: selectedFloor.bgPreview }}
            >
              <div className="floor-reflection" />
              <div
                className="floor-accent-line"
                style={{ backgroundColor: selectedAccent.hex }}
              />
            </div>

            <div className="customizer-badges-floating">
              <span className="curated-label">LIVE SPECIFICATION PREVIEW</span>
            </div>
          </div>

          <div className="palette-summary-bar">
            <div className="palette-item">
              <span className="item-label">WALL FINISH</span>
              <strong>{selectedWall.name}</strong>
            </div>
            <div className="palette-item">
              <span className="item-label">FLOORING</span>
              <strong>{selectedFloor.name}</strong>
            </div>
            <div className="palette-item">
              <span className="item-label">METALLIC ACCENTS</span>
              <div className="accent-preview-dot">
                <span className="dot" style={{ backgroundColor: selectedAccent.hex }} />
                <strong>{selectedAccent.name}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Column */}
        <div className="customizer-controls-card">
          {/* Flooring Options */}
          <div className="option-category-block">
            <div className="category-title-row">
              <span className="category-num">01</span>
              <h4>Select Primary Flooring</h4>
            </div>
            <div className="option-cards-stack">
              {FLOORING_OPTIONS.map((floor) => (
                <div
                  key={floor.id}
                  className={`swatch-picker-card ${selectedFloor.id === floor.id ? "selected" : ""}`}
                  onClick={() => setSelectedFloor(floor)}
                >
                  <div
                    className="swatch-indicator"
                    style={{ background: floor.bgPreview }}
                  />
                  <div className="swatch-text">
                    <strong>{floor.name}</strong>
                    <small>{floor.type} • {floor.desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wall Finish Options */}
          <div className="option-category-block">
            <div className="category-title-row">
              <span className="category-num">02</span>
              <h4>Select Wall Architecture</h4>
            </div>
            <div className="option-cards-stack">
              {WALL_OPTIONS.map((wall) => (
                <div
                  key={wall.id}
                  className={`swatch-picker-card ${selectedWall.id === wall.id ? "selected" : ""}`}
                  onClick={() => setSelectedWall(wall)}
                >
                  <div
                    className="swatch-indicator"
                    style={{ background: wall.pattern }}
                  />
                  <div className="swatch-text">
                    <strong>{wall.name}</strong>
                    <small>{wall.type} • {wall.desc}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Metals */}
          <div className="option-category-block">
            <div className="category-title-row">
              <span className="category-num">03</span>
              <h4>Select Metallic Inlays & Hardware</h4>
            </div>
            <div className="accents-horizontal-row">
              {ACCENT_OPTIONS.map((acc) => (
                <button
                  key={acc.id}
                  className={`accent-btn-pill ${selectedAccent.id === acc.id ? "selected" : ""}`}
                  onClick={() => setSelectedAccent(acc)}
                >
                  <span className="color-swatch-circle" style={{ backgroundColor: acc.hex }} />
                  <span>{acc.name}</span>
                </button>
              ))}
            </div>
          </div>

          <a
            href={getWhatsAppCustomizerUrl()}
            target="_blank"
            rel="noreferrer"
            className="btn-gold-primary btn-submit-palette"
          >
            Enquire This Custom Palette on WhatsApp ↗
          </a>
        </div>
      </div>
    </section>
  );
}
