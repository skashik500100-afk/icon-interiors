import { useState } from "react";

export default function ModularJourneySection({ selectedCity }) {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      step: "01",
      title: "Precision 3D Laser Scanning",
      tagline: "Zero Error Site Measurement",
      desc: "Our architects use digital 3D laser scanners to map every millimeter of your room's plumbing, electrical lines, and uneven walls, ensuring factory-built units fit like a glove without on-site cutting."
    },
    {
      step: "02",
      title: "German Automated Factory Joinery",
      tagline: "Zero Dust & Flawless Edges",
      desc: "All modules are cut on computerized CNC saws and edge-banded with German PUR glue at 200°C for lifetime moisture resistance and seamless zero-joint aesthetics."
    },
    {
      step: "03",
      title: "AquaGuard BWP 710 Core Testing",
      tagline: "100% Boiling Water Proof",
      desc: "Built with certified IS 710 Marine Grade Plywood and high-density HDHMR boards that are rigorously lab-tested to withstand boiling water for 72 hours without delamination."
    },
    {
      step: "04",
      title: "Blum & Hafele Motion Engineering",
      tagline: "Tested for 200,000 Open-Close Cycles",
      desc: "Equipped with authentic German soft-close hinges, tandem drawer runners, bi-fold lift systems, and pull-out pantries that operate whisper-quiet for over 20 years."
    },
    {
      step: "05",
      title: "45-Day Assembly & 146 Quality Checks",
      tagline: "Guaranteed On-Time Handover",
      desc: "Modular flat-packs arrive at your home and are assembled cleanly in days. Our principal architects perform a rigorous 146-point quality audit before final handover."
    }
  ];

  const getConsultUrl = () => {
    const text = `Hello ICON INTERIORS! I saw 'The Modular Journey' on your website and would like to start modular interiors for my home in ${selectedCity || "Andhra Pradesh"}.`;
    return `https://wa.me/919885001008?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="modular-journey-section" id="modular-journey">
      {/* Blueprint Hero Banner matching Image 3 */}
      <div className="blueprint-hero-banner">
        <div className="blueprint-grid-overlay" />
        
        {/* Architectural Blueprint Vector Illustrations */}
        <div className="blueprint-schematic-bg">
          <svg
            className="blueprint-svg"
            viewBox="0 0 1200 500"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Modular Kitchen Blueprint Outline */}
            <rect x="50" y="80" width="1100" height="380" stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="none" />
            
            {/* Overhead Cabinets */}
            <rect x="100" y="100" width="160" height="150" />
            <rect x="260" y="100" width="160" height="150" />
            <rect x="420" y="100" width="160" height="150" />
            <rect x="580" y="100" width="200" height="90" stroke="rgba(255, 255, 255, 0.45)" />
            {/* Chimney Hood */}
            <path d="M630 190 L680 140 L730 190 Z" />
            <rect x="660" y="100" width="40" height="40" />
            <rect x="780" y="100" width="160" height="150" />
            <rect x="940" y="100" width="160" height="150" />

            {/* Backsplash geometric lines */}
            <line x1="100" y1="250" x2="1100" y2="250" stroke="rgba(255, 255, 255, 0.4)" strokeDasharray="none" />
            <line x1="100" y1="320" x2="1100" y2="320" stroke="rgba(255, 255, 255, 0.4)" strokeDasharray="none" />

            {/* Base Cabinets & Pullout Drawers */}
            <rect x="100" y="320" width="200" height="120" />
            <line x1="100" y1="360" x2="300" y2="360" />
            <line x1="100" y1="400" x2="300" y2="400" />

            <rect x="300" y="320" width="200" height="120" />
            <rect x="500" y="320" width="200" height="120" />
            <rect x="700" y="320" width="200" height="120" />
            <rect x="900" y="320" width="200" height="120" />

            {/* Dimension Lines */}
            <line x1="60" y1="80" x2="60" y2="460" stroke="#EB595A" strokeDasharray="none" />
            <text x="35" y="270" fill="#EB595A" fontSize="12" fontFamily="monospace" transform="rotate(-90 35,270)">H: 2700mm</text>
            
            <line x1="100" y1="475" x2="1100" y2="475" stroke="#EB595A" strokeDasharray="none" />
            <text x="560" y="492" fill="#EB595A" fontSize="12" fontFamily="monospace">W: 3600mm</text>
          </svg>
        </div>

        <div className="blueprint-hero-content">
          <span className="blueprint-badge">THE MODULAR REVOLUTION</span>
          <h2 className="blueprint-title">Crafting modular excellence</h2>
          <p className="blueprint-subtitle">
            A journey through our revolutionary design-to-installation process.
          </p>
          <a
            href={getConsultUrl()}
            target="_blank"
            rel="noreferrer"
            className="blueprint-cta-btn"
          >
            GET STARTED WITH THE BEST
          </a>
        </div>
      </div>

      {/* Finished Modular Kitchen Showcase (Matching Image 4) */}
      <div className="modular-showcase-container">
        <div className="showcase-header">
          <span className="section-eyebrow">MODULAR REALIZATION</span>
          <h3 className="showcase-title">
            From Blueprint to <span className="gold-text-gradient">Flawless Reality.</span>
          </h3>
          <p className="showcase-desc">
            Witness how our computerized precision engineering translates into the stunning kitchen
            you envisioned — featuring geometric faceted tiles, smoked glass profile cabinetry, and concealed LEDs.
          </p>
        </div>

        <div className="showcase-image-card">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85"
            alt="Crafting modular excellence in contemporary modular kitchen"
            className="showcase-main-img"
          />

          {/* Interactive Feature Callouts */}
          <div className="showcase-hotspot hotspot-1" title="Matte Charcoal Finish">
            <span className="pulse-dot" />
            <div className="hotspot-tooltip">
              <strong>Matte Anthracite Cabinets</strong>
              <small>Anti-fingerprint, scratch-resistant PU finish</small>
            </div>
          </div>

          <div className="showcase-hotspot hotspot-2" title="Faceted Tile Backsplash">
            <span className="pulse-dot" />
            <div className="hotspot-tooltip">
              <strong>Geometric Starburst Backsplash</strong>
              <small>Stain-resistant porcelain ceramic with epoxy grouting</small>
            </div>
          </div>

          <div className="showcase-hotspot hotspot-3" title="Smoked Glass Upper Units">
            <span className="pulse-dot" />
            <div className="hotspot-tooltip">
              <strong>Illuminated Glass Cabinets</strong>
              <small>Concealed 3000K warm LED shelf profiles</small>
            </div>
          </div>

          <div className="showcase-hotspot hotspot-4" title="Smart Island Counter">
            <span className="pulse-dot" />
            <div className="hotspot-tooltip">
              <strong>Calacatta Quartz Countertop</strong>
              <small>Non-porous, antibacterial heat-resistant surface</small>
            </div>
          </div>
        </div>

        {/* 5-Step Execution Walkthrough */}
        <div className="modular-steps-row">
          {journeySteps.map((item, idx) => (
            <div
              key={item.step}
              className={`modular-step-pill ${activeStep === idx ? "active" : ""}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className="step-badge-num">{item.step}</div>
              <div className="step-text-wrap">
                <h4>{item.title}</h4>
                <small>{item.tagline}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Active Step Detailed View */}
        <div className="step-detail-card">
          <div className="detail-tag">
            <span>PHASE {journeySteps[activeStep].step} OF 05</span>
          </div>
          <h3>{journeySteps[activeStep].title}</h3>
          <p className="detail-tagline">✦ {journeySteps[activeStep].tagline}</p>
          <p className="detail-description">{journeySteps[activeStep].desc}</p>
          
          <div className="detail-footer-row">
            <span className="location-flag">
              📍 Available with local site teams across {selectedCity || "Guntur, Amaravati, Hyderabad & Bengaluru"}
            </span>
            <a
              href={getConsultUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-primary"
            >
              Book Modular Site Visit ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
