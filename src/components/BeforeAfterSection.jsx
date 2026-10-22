import { useState, useRef, useCallback } from "react";
import { BEFORE_AFTER_PROJECTS } from "../data/designsData";

export default function BeforeAfterSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeProject = BEFORE_AFTER_PROJECTS[activeProjectIndex];

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    [containerRef]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="before-after-section" id="before-after">
      <div className="section-header">
        <span className="section-eyebrow">TURNKEY TRANSFORMATIONS</span>
        <h2 className="section-title">
          Raw Space to <span className="gold-text-gradient">Living Poetry.</span>
        </h2>
        <p className="section-description">
          Slide the handle horizontally to witness how our turnkey architecture team transforms bare
          concrete shells into editorial-grade luxury sanctuaries.
        </p>
      </div>

      {/* Project Switcher Tabs */}
      <div className="ba-tabs">
        {BEFORE_AFTER_PROJECTS.map((proj, idx) => (
          <button
            key={proj.id}
            className={`ba-tab-btn ${activeProjectIndex === idx ? "active" : ""}`}
            onClick={() => {
              setActiveProjectIndex(idx);
              setSliderPos(50);
            }}
          >
            <span>0{idx + 1}</span> {proj.category}
          </button>
        ))}
      </div>

      {/* Interactive Slider Container */}
      <div className="ba-comparison-wrapper">
        <div
          className="ba-stage"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* AFTER Image (Background) */}
          <div className="ba-image-layer after-layer">
            <img src={activeProject.afterImage} alt={activeProject.afterLabel} />
            <span className="ba-badge after-badge">✦ AFTER: ICON INTERIORS</span>
          </div>

          {/* BEFORE Image (Clipped Overlay) */}
          <div
            className="ba-image-layer before-layer"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img src={activeProject.beforeImage} alt={activeProject.beforeLabel} />
            <span className="ba-badge before-badge">BEFORE: RAW SHELL</span>
          </div>

          {/* Draggable Divider Handle */}
          <div className="ba-divider-line" style={{ left: `${sliderPos}%` }}>
            <div className="ba-handle">
              <span className="handle-arrows">◀ ❚❚ ▶</span>
            </div>
          </div>
        </div>

        {/* Range slider for accessibility / touch convenience */}
        <div className="ba-range-control">
          <span>Before</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Comparison slider"
            className="ba-range-input"
          />
          <span>After</span>
        </div>

        {/* Project Details Footer */}
        <div className="ba-info-card">
          <div className="ba-info-main">
            <h3>{activeProject.title}</h3>
            <p>{activeProject.description}</p>
          </div>
          <div className="ba-meta-block">
            <div className="meta-pair">
              <span>LOCATION</span>
              <strong>{activeProject.location}</strong>
            </div>
            <div className="meta-pair">
              <span>TIMELINE</span>
              <strong>{activeProject.duration}</strong>
            </div>
            <a
              href={`https://wa.me/919885001008?text=Hello%20ICON%20INTERIORS!%20I%20saw%20your%20transformation%20of%20${encodeURIComponent(
                activeProject.title
              )}%20and%20want%20to%20renovate%20my%20home.`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-primary"
            >
              Renovate My Space ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
