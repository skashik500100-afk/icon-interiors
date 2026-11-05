import { useEffect, useState, useCallback } from "react";
import blueprintMansionImg from "../assets/blueprint-mansion.jpg";
import "./IntroAnimation.css";

const SESSION_KEY = "icon_intro_blueprint_v2";
const TOTAL_DURATION = 4800; // 4.8 seconds total cinematic experience

function checkShouldPlay() {
  if (typeof window === "undefined") return false;

  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      return false;
    }
  } catch {
    // sessionStorage fallback
  }

  // Accessibility: respect reduced motion
  try {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;
  } catch {
    // matchMedia fallback
  }

  return true;
}

export default function IntroAnimation() {
  const [isPlaying, setIsPlaying] = useState(checkShouldPlay);
  const [isDismissing, setIsDismissing] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsDismissing(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // storage unavailable fallback
    }
    const t = window.setTimeout(() => {
      setIsPlaying(false);
    }, 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isPlaying) return undefined;

    // Lock page scrolling during intro animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore
    }

    // Natural completion timer
    const completeTimer = window.setTimeout(() => {
      setIsPlaying(false);
      document.body.style.overflow = originalOverflow;
    }, TOTAL_DURATION);

    // Global developer preview helper: window.__replayIntro()
    window.__replayIntro = () => {
      try {
        window.sessionStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
      setIsDismissing(false);
      setIsPlaying(true);
    };

    return () => {
      window.clearTimeout(completeTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <aside
      className={`intro-cinematic ${isDismissing ? "intro-cinematic--dismissing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="ICON INTERIORS — From Blueprint to Luxury Reality"
    >
      {/* ====================================================================
          CINEMATIC STAGE & CAMERA RIG (Continuous Dolly / Push-In Movement)
          ==================================================================== */}
      <div className="intro-camera-rig" aria-hidden="true">
        {/* Subtle Dark Studio Horizon & Ambient Background */}
        <div className="intro-environment">
          <div className="intro-night-sky" />
          <div className="intro-ambient-horizon" />
          <div className="intro-ground-plane" />
        </div>

        {/* Technical Millimeter Blueprint Grid & Spatial Drafting Markers */}
        <div className="intro-blueprint-grid">
          <div className="grid-lines" />
          <div className="grid-meta-tag grid-meta-tag--tl">
            <span className="meta-code">PROJECT: ICON-VILLA-01</span>
            <span className="meta-sub">CAD DRAFTING // 8K RAY-TRACED RESIDENCE</span>
          </div>
          <div className="grid-meta-tag grid-meta-tag--tr">
            <span className="meta-code">SCALE 1:100</span>
            <span className="meta-sub">PHASE: BLUEPRINT TO REALITY</span>
          </div>
          <div className="grid-crosshair grid-crosshair--1" />
          <div className="grid-crosshair grid-crosshair--2" />
          <div className="grid-crosshair grid-crosshair--3" />
          <div className="grid-crosshair grid-crosshair--4" />
        </div>

        {/* ==================================================================
            MAIN ARCHITECTURAL HERO: GLOWING HOLOGRAPHIC MANSION
            Transforming from CAD wireframe laser-scan to illuminated reality
            ================================================================== */}
        <div className="intro-mansion-stage">
          {/* Holographic Laser Scan Sweep Line */}
          <div className="hologram-laser-scan" />

          {/* Golden Ambient Particle Dust */}
          <div className="hologram-particles">
            <span className="particle particle--1" />
            <span className="particle particle--2" />
            <span className="particle particle--3" />
            <span className="particle particle--4" />
            <span className="particle particle--5" />
            <span className="particle particle--6" />
          </div>

          {/* High-Resolution Ray-Traced Holographic Mansion */}
          <div className="mansion-image-container">
            <img
              src={blueprintMansionImg}
              alt="Holographic architectural wireframe of luxury mansion"
              className="mansion-hologram-img"
              fetchPriority="high"
              loading="eager"
            />
            {/* Holographic Wireframe Edge Enhancer & Specular Pulse */}
            <div className="mansion-glow-overlay" />
            <div className="mansion-wireframe-scan-overlay" />
            <div className="mansion-reflection-highlight" />
          </div>

          {/* ================================================================
              STAGE 4 & 5: GRAND LUXURY WOODEN ENTRANCE DOORS & 3D PARTING
              Aligned with the illuminated entrance pavilion of the mansion
              ================================================================ */}
          <div className="mansion-portal-doors-wrapper">
            {/* Volumetric Showroom Light Stream behind opening doors */}
            <div className="portal-showroom-light-stream">
              <div className="showroom-volumetric-bloom" />
              <div className="showroom-center-ray" />
            </div>

            {/* Transom Header Plaque */}
            <div className="portal-transom-bar">
              <span className="portal-transom-text">ICON INTERIORS</span>
            </div>

            {/* Massive Double Wooden Doors in 3D Perspective */}
            <div className="portal-doors-3d-stage">
              {/* Left Solid Walnut Door */}
              <div className="luxury-entrance-door luxury-entrance-door--left">
                <div className="entrance-door-face">
                  <div className="door-grain" />
                  <div className="door-boiserie door-boiserie--top" />
                  <div className="door-boiserie door-boiserie--bottom" />
                  {/* Champagne Gold Full-Height Pull Handle */}
                  <div className="door-gold-handle door-gold-handle--left">
                    <span className="handle-shaft" />
                    <span className="handle-glint" />
                  </div>
                </div>
              </div>

              {/* Right Solid Walnut Door */}
              <div className="luxury-entrance-door luxury-entrance-door--right">
                <div className="entrance-door-face">
                  <div className="door-grain" />
                  <div className="door-boiserie door-boiserie--top" />
                  <div className="door-boiserie door-boiserie--bottom" />
                  {/* Champagne Gold Full-Height Pull Handle */}
                  <div className="door-gold-handle door-gold-handle--right">
                    <span className="handle-shaft" />
                    <span className="handle-glint" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          CINEMATIC OVERLAY: BRAND TITLES & TAGLINE (0.4s – 3.2s)
          ==================================================================== */}
      <div className="intro-title-overlay" aria-hidden="true">
        <div className="intro-badge">
          <span className="badge-line" />
          <span className="badge-text">FROM BLUEPRINT TO LUXURY REALITY</span>
          <span className="badge-line" />
        </div>
        <h1 className="intro-brand-title">
          ICON INTERIORS
        </h1>
        <p className="intro-brand-tagline">
          Designing Spaces. Defining Lifestyles.
        </p>
      </div>

      {/* ====================================================================
          FLY-THROUGH LIGHT BLOOM (Transitions seamlessly into homepage)
          ==================================================================== */}
      <div className="intro-flythrough-bloom" aria-hidden="true" />

      {/* ====================================================================
          MINIMALIST SKIP INTRO BUTTON
          ==================================================================== */}
      <button
        type="button"
        className="intro-skip-button"
        onClick={handleDismiss}
        aria-label="Skip cinematic introduction and enter website"
      >
        <span className="skip-text">SKIP INTRO</span>
        <span className="skip-chevron">›</span>
      </button>
    </aside>
  );
}
