import { useState, useMemo } from "react";
import { ESTIMATION_PACKAGES } from "../data/designsData";

const CONFIGURATIONS = [
  { id: "1bhk", label: "1 BHK", defaultSqft: 750, range: "650 – 850 sq.ft" },
  { id: "2bhk", label: "2 BHK", defaultSqft: 1200, range: "1,050 – 1,350 sq.ft" },
  { id: "3bhk", label: "3 BHK", defaultSqft: 1850, range: "1,600 – 2,200 sq.ft" },
  { id: "4bhk", label: "4 BHK / Villa", defaultSqft: 3200, range: "2,600 – 4,500 sq.ft" }
];

const ROOM_OPTIONS = [
  { id: "living", name: "Living Room & Foyer Panel", weight: 0.28 },
  { id: "kitchen", name: "Modular Island Kitchen & Utility", weight: 0.25 },
  { id: "master", name: "Master Suite & Walk-in Wardrobe", weight: 0.22 },
  { id: "guest", name: "Kids / Guest Bedroom", weight: 0.15 },
  { id: "dining", name: "Dining & Bar Display", weight: 0.12 },
  { id: "pooja", name: "Pooja Room Mandir", weight: 0.08 }
];

export default function CostEstimator() {
  const [selectedConfig, setSelectedConfig] = useState(CONFIGURATIONS[2]); // 3 BHK default
  const [customSqft, setCustomSqft] = useState(CONFIGURATIONS[2].defaultSqft);
  const [selectedPackage, setSelectedPackage] = useState(ESTIMATION_PACKAGES[1]); // Signature default
  const [selectedRooms, setSelectedRooms] = useState([
    "living",
    "kitchen",
    "master",
    "guest",
    "dining"
  ]);

  const toggleRoom = (roomId) => {
    if (selectedRooms.includes(roomId)) {
      if (selectedRooms.length > 1) {
        setSelectedRooms(selectedRooms.filter((id) => id !== roomId));
      }
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const calculatedEstimate = useMemo(() => {
    const baseCost = customSqft * selectedPackage.ratePerSqFt;
    // Room weight adjustment
    const totalPossibleWeight = ROOM_OPTIONS.reduce((acc, r) => acc + r.weight, 0);
    const activeWeight = ROOM_OPTIONS.filter((r) => selectedRooms.includes(r.id)).reduce(
      (acc, r) => acc + r.weight,
      0
    );
    const weightRatio = activeWeight / totalPossibleWeight;

    const adjustedCost = baseCost * Math.max(0.65, weightRatio);
    const lowRange = adjustedCost * 0.95;
    const highRange = adjustedCost * 1.08;

    const formatInLakhs = (amount) => {
      const inLakhs = amount / 100000;
      return `₹${inLakhs.toFixed(2)} Lakhs`;
    };

    return {
      low: formatInLakhs(lowRange),
      high: formatInLakhs(highRange),
      perSqFt: `₹${selectedPackage.ratePerSqFt}/sq.ft`
    };
  }, [customSqft, selectedPackage, selectedRooms]);

  const getWhatsAppEstimateUrl = () => {
    const text = [
      `Hello ICON INTERIORS!`,
      `I used your Online Interior Cost Calculator for my home:`,
      `• Home Configuration: ${selectedConfig.label} (${customSqft} sq.ft)`,
      `• Chosen Grade: ${selectedPackage.name} (${selectedPackage.ratePerSqFt}/sq.ft)`,
      `• Rooms Selected: ${selectedRooms
        .map((id) => ROOM_OPTIONS.find((r) => r.id === id)?.name)
        .join(", ")}`,
      `• Estimated Investment Range: ${calculatedEstimate.low} – ${calculatedEstimate.high}`,
      `• Expected Handover: ${selectedPackage.timeline}`,
      ``,
      `Can we schedule an on-site architectural measurement and formal quote?`
    ].join("\n");

    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="estimator-section" id="estimator">
      <div className="section-header">
        <span className="section-eyebrow">TRANSPARENT ARCHITECTURAL PRICING</span>
        <h2 className="section-title">
          Interactive Home <span className="gold-text-gradient">Cost Estimator.</span>
        </h2>
        <p className="section-description">
          Calculate instant, transparent cost projections based on your exact floor plan,
          selected rooms, and choice of German hardware and marine-grade materials.
        </p>
      </div>

      <div className="estimator-container">
        {/* Step 1: Configuration */}
        <div className="estimator-step-block">
          <div className="step-title-row">
            <span className="step-num">STEP 01</span>
            <h3>Select Home Typology</h3>
          </div>
          <div className="config-grid">
            {CONFIGURATIONS.map((cfg) => (
              <button
                key={cfg.id}
                className={`config-pill-card ${selectedConfig.id === cfg.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedConfig(cfg);
                  setCustomSqft(cfg.defaultSqft);
                }}
              >
                <strong>{cfg.label}</strong>
                <small>{cfg.range}</small>
              </button>
            ))}
          </div>

          <div className="sqft-slider-row">
            <div className="sqft-meta">
              <label>Built-up Area: <strong>{customSqft} sq.ft</strong></label>
              <small>Drag to adjust your exact carpet/super built-up area</small>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="50"
              value={customSqft}
              onChange={(e) => setCustomSqft(Number(e.target.value))}
              className="sqft-range-slider"
            />
          </div>
        </div>

        {/* Step 2: Package Tiers */}
        <div className="estimator-step-block">
          <div className="step-title-row">
            <span className="step-num">STEP 02</span>
            <h3>Choose Execution Grade</h3>
          </div>

          <div className="packages-grid">
            {ESTIMATION_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card ${selectedPackage.id === pkg.id ? "active" : ""}`}
                onClick={() => setSelectedPackage(pkg)}
              >
                {pkg.popular && <span className="popular-badge">★ MOST POPULAR</span>}
                <div className="package-head">
                  <h4>{pkg.name}</h4>
                  <p className="pkg-tagline">{pkg.tagline}</p>
                  <div className="pkg-rate">
                    <strong>₹{pkg.ratePerSqFt}</strong>
                    <span>/ sq.ft</span>
                  </div>
                </div>

                <div className="pkg-specs">
                  <span>⏱ {pkg.timeline}</span>
                  <span>🛡 {pkg.warranty}</span>
                </div>

                <ul className="pkg-features-list">
                  {pkg.features.map((feat, i) => (
                    <li key={i}>
                      <span className="feat-check">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Room Selection */}
        <div className="estimator-step-block">
          <div className="step-title-row">
            <span className="step-num">STEP 03</span>
            <h3>Select Scope of Rooms</h3>
          </div>

          <div className="rooms-checklist-grid">
            {ROOM_OPTIONS.map((room) => {
              const isChecked = selectedRooms.includes(room.id);
              return (
                <div
                  key={room.id}
                  className={`room-check-card ${isChecked ? "checked" : ""}`}
                  onClick={() => toggleRoom(room.id)}
                >
                  <span className="check-box-indicator">{isChecked ? "✓" : ""}</span>
                  <span className="room-name">{room.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Estimate Presentation */}
        <div className="estimate-summary-panel">
          <div className="estimate-data-col">
            <span className="summary-eyebrow">ESTIMATED INVESTMENT RANGE</span>
            <div className="price-range-display">
              <h2>
                {calculatedEstimate.low} – {calculatedEstimate.high}
              </h2>
              <span className="rate-sub">
                Based on {customSqft} sq.ft @ {calculatedEstimate.perSqFt} ({selectedPackage.name})
              </span>
            </div>

            <div className="summary-perks-row">
              <div className="perk">
                <span className="perk-icon">⏱</span>
                <div>
                  <strong>{selectedPackage.timeline}</strong>
                  <small>Guaranteed Handover</small>
                </div>
              </div>
              <div className="perk">
                <span className="perk-icon">🛡</span>
                <div>
                  <strong>{selectedPackage.warranty}</strong>
                  <small>Comprehensive Cover</small>
                </div>
              </div>
              <div className="perk">
                <span className="perk-icon">0%</span>
                <div>
                  <strong>Zero Hidden Costs</strong>
                  <small>Fixed Quotation Commitment</small>
                </div>
              </div>
            </div>
          </div>

          <div className="estimate-action-col">
            <a
              href={getWhatsAppEstimateUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-primary btn-get-quote"
            >
              Get Itemized Estimate on WhatsApp ↗
            </a>
            <small className="quote-disclaimer">
              Includes 3D VR design, raw material testing, factory joinery, and on-site senior architect supervision.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
