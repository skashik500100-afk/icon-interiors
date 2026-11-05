import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import completedMansionImg from "../assets/blueprint-mansion.jpg";
import "./HouseConstructionIntro.css";

const SESSION_KEY = "icon_construction_intro_seen_v1";
const ANIMATION_DURATION_MS = 5000; // Exactly 5 seconds total

function checkShouldShow() {
  if (typeof window === "undefined") return false;

  try {
    if (window.sessionStorage.getItem(SESSION_KEY) === "true") {
      return false;
    }
  } catch {
    // sessionStorage restriction fallback
  }

  // Accessibility: respect prefers-reduced-motion
  try {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return false;
  } catch {
    // fallback
  }

  return true;
}

export default function HouseConstructionIntro() {
  const [isVisible, setIsVisible] = useState(checkShouldShow);
  const [isDismissing, setIsDismissing] = useState(false);
  const [constructionStage, setConstructionStage] = useState("foundation"); // 'foundation' | 'pillars' | 'floors' | 'hologram' | 'completed'

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const rendererRef = useRef(null);

  const handleDismiss = useCallback(() => {
    setIsDismissing(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore
    }
    const t = window.setTimeout(() => {
      setIsVisible(false);
    }, 450);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;

    // Lock page scroll during construction animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore
    }

    // Safety unmount timer after completion
    const completeTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = originalOverflow;
    }, ANIMATION_DURATION_MS + 400);

    // Global developer helper: window.__replayConstructionIntro()
    window.__replayConstructionIntro = () => {
      try {
        window.sessionStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
      setIsDismissing(false);
      setIsVisible(true);
    };

    // ========================================================================
    // THREE.JS 3D ARCHITECTURAL CONSTRUCTION ENGINE
    // ========================================================================
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050403);
    scene.fog = new THREE.FogExp2(0x050403, 0.022);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Camera angle matching reference image's wide 3/4 perspective
    const isMobile = width < 768;
    const cameraBaseDist = isMobile ? 32 : 24;
    camera.position.set(cameraBaseDist * 0.72, cameraBaseDist * 0.38, cameraBaseDist * 0.95);
    const targetLookAt = new THREE.Vector3(0.5, 3.2, 0);
    camera.lookAt(targetLookAt);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0d4, 0.4);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.SpotLight(0xffdf94, 2.8);
    goldSpotLight.position.set(12, 18, 16);
    goldSpotLight.angle = Math.PI / 4;
    goldSpotLight.penumbra = 0.8;
    scene.add(goldSpotLight);

    const warmGroundLight = new THREE.PointLight(0xffa834, 1.6, 35);
    warmGroundLight.position.set(0, 1.2, 2);
    scene.add(warmGroundLight);

    // 3. Reusable Gold Materials
    const goldLineMat = new THREE.LineBasicMaterial({
      color: 0xf5d37f,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    const brightGoldLineMat = new THREE.LineBasicMaterial({
      color: 0xfff4d0,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    const darkGoldLineMat = new THREE.LineBasicMaterial({
      color: 0x9e7a36,
      transparent: true,
      opacity: 0
    });

    const glassPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x22180c,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });

    // ------------------------------------------------------------------------
    // A. GROUND PLAZA & FOUNDATION GRID (0–1s)
    // ------------------------------------------------------------------------
    const gridHelper = new THREE.GridHelper(44, 44, 0xd4b26f, 0x2e2314);
    gridHelper.position.y = 0;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0;
    scene.add(gridHelper);

    // Foundation perimeter laser lines (ground layout matching the mansion)
    const foundationGroup = new THREE.Group();
    const foundationPts = [
      new THREE.Vector3(-10, 0.05, -6),
      new THREE.Vector3(9.5, 0.05, -6),
      new THREE.Vector3(9.5, 0.05, 5.5),
      new THREE.Vector3(4.5, 0.05, 5.5),
      new THREE.Vector3(4.5, 0.05, 7.5),
      new THREE.Vector3(-6, 0.05, 7.5),
      new THREE.Vector3(-6, 0.05, 5.5),
      new THREE.Vector3(-10, 0.05, 5.5),
      new THREE.Vector3(-10, 0.05, -6)
    ];
    const foundationGeom = new THREE.BufferGeometry().setFromPoints(foundationPts);
    const foundationLine = new THREE.Line(foundationGeom, brightGoldLineMat);
    foundationGroup.add(foundationLine);

    // Foundation sub-grid crossbeams
    for (let x = -8; x <= 8; x += 3.5) {
      const beamPts = [new THREE.Vector3(x, 0.04, -5.5), new THREE.Vector3(x, 0.04, 5.5)];
      const beamGeom = new THREE.BufferGeometry().setFromPoints(beamPts);
      foundationGroup.add(new THREE.Line(beamGeom, goldLineMat));
    }
    scene.add(foundationGroup);

    // Glossy reflective black marble ground
    const groundGeom = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x060504,
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.01;
    scene.add(groundMesh);

    // ------------------------------------------------------------------------
    // B. VERTICAL PILLARS & COLUMNS (1–2s: Extrude / Rise from ground)
    // ------------------------------------------------------------------------
    const pillarsGroup = new THREE.Group();
    const pillarPositions = [
      [-9.5, -5.5], [-9.5, 0], [-9.5, 5],
      [-5.5, -5.5], [-5.5, 0], [-5.5, 5], [-5.5, 7],
      [-1.5, -5.5], [-1.5, 0], [-1.5, 5], [-1.5, 7],
      [2.5, -5.5], [2.5, 0], [2.5, 5], [2.5, 7],
      [6.5, -5.5], [6.5, 0], [6.5, 5],
      [9, -5.5], [9, 0], [9, 5]
    ];

    const pillarMeshes = [];
    pillarPositions.forEach(([px, pz]) => {
      // 3D pillar wireframe box
      const pGeom = new THREE.BoxGeometry(0.35, 7.2, 0.35);
      const pEdges = new THREE.EdgesGeometry(pGeom);
      const pLine = new THREE.LineSegments(pEdges, goldLineMat.clone());
      // Center origin at base so scaling Y grows upward from ground
      pGeom.translate(0, 3.6, 0);
      pLine.position.set(px, 0, pz);
      pLine.scale.set(1, 0.001, 1);
      pillarsGroup.add(pLine);
      pillarMeshes.push(pLine);
    });
    scene.add(pillarsGroup);

    // ------------------------------------------------------------------------
    // C. FIRST & SECOND FLOOR SLABS & BALCONIES (2–3s)
    // ------------------------------------------------------------------------
    const floorsGroup = new THREE.Group();

    // 1st Floor Cantilever Slab with curved edges
    const f1Geom = new THREE.BoxGeometry(20, 0.35, 14);
    const f1Edges = new THREE.EdgesGeometry(f1Geom);
    const f1Line = new THREE.LineSegments(f1Edges, brightGoldLineMat.clone());
    f1Line.position.set(-0.2, 3.6, 0.6);
    f1Line.scale.set(0.001, 1, 0.001);
    floorsGroup.add(f1Line);

    // 1st Floor Glass Wall Panels
    const glassWallsGroup = new THREE.Group();
    const gWall1Geom = new THREE.PlaneGeometry(11, 3.3);
    const gWall1 = new THREE.Mesh(gWall1Geom, glassPlaneMat);
    gWall1.position.set(-3.5, 1.8, 5.4);
    glassWallsGroup.add(gWall1);

    const gWall2Geom = new THREE.PlaneGeometry(8, 3.3);
    const gWall2 = new THREE.Mesh(gWall2Geom, glassPlaneMat);
    gWall2.position.set(5.2, 1.8, 5.2);
    glassWallsGroup.add(gWall2);
    floorsGroup.add(glassWallsGroup);

    // Interior Floating Staircase Wireframe Steps (visible through glass)
    const stairsGroup = new THREE.Group();
    for (let s = 0; s < 12; s++) {
      const stepGeom = new THREE.BoxGeometry(1.4, 0.1, 0.4);
      const stepEdges = new THREE.EdgesGeometry(stepGeom);
      const stepLine = new THREE.LineSegments(stepEdges, goldLineMat);
      stepLine.position.set(-6.5 + s * 0.22, s * 0.28, 1.2 + s * 0.2);
      stairsGroup.add(stepLine);
    }
    floorsGroup.add(stairsGroup);

    // 2nd Floor Master Terrace & Cantilevered Balconies
    const f2Geom = new THREE.BoxGeometry(18.5, 0.35, 13);
    const f2Edges = new THREE.EdgesGeometry(f2Geom);
    const f2Line = new THREE.LineSegments(f2Edges, brightGoldLineMat.clone());
    f2Line.position.set(-0.5, 7.2, 0.4);
    f2Line.scale.set(0.001, 1, 0.001);
    floorsGroup.add(f2Line);

    // Upper Balcony Glass Railing Wireframe
    const railingPts = [
      new THREE.Vector3(-9.2, 7.35, -5.8),
      new THREE.Vector3(8.8, 7.35, -5.8),
      new THREE.Vector3(8.8, 7.35, 6.2),
      new THREE.Vector3(-9.2, 7.35, 6.2),
      new THREE.Vector3(-9.2, 7.35, -5.8),
      new THREE.Vector3(-9.2, 8.2, -5.8),
      new THREE.Vector3(8.8, 8.2, -5.8),
      new THREE.Vector3(8.8, 8.2, 6.2),
      new THREE.Vector3(-9.2, 8.2, 6.2),
      new THREE.Vector3(-9.2, 8.2, -5.8)
    ];
    const railingGeom = new THREE.BufferGeometry().setFromPoints(railingPts);
    const railingLine = new THREE.Line(railingGeom, goldLineMat);
    floorsGroup.add(railingLine);

    // Flat Cantilever Roof Canopy with Rounded Fascia
    const roofGeom = new THREE.BoxGeometry(19.5, 0.4, 13.8);
    const roofEdges = new THREE.EdgesGeometry(roofGeom);
    const roofLine = new THREE.LineSegments(roofEdges, brightGoldLineMat.clone());
    roofLine.position.set(-0.5, 7.4, 0.4);
    roofLine.scale.set(0.001, 1, 0.001);
    floorsGroup.add(roofLine);

    scene.add(floorsGroup);

    // ------------------------------------------------------------------------
    // D. DENSE HOLOGRAPHIC ARCHITECTURAL WIREFRAME (3–4s)
    // ------------------------------------------------------------------------
    const hologramDetailsGroup = new THREE.Group();
    // Fine facade mullions & window dividers
    for (let fx = -8.5; fx <= 8; fx += 1.2) {
      // Ground floor glass mullions
      const m1Pts = [new THREE.Vector3(fx, 0.1, 5.2), new THREE.Vector3(fx, 3.5, 5.2)];
      const m1Geom = new THREE.BufferGeometry().setFromPoints(m1Pts);
      hologramDetailsGroup.add(new THREE.Line(m1Geom, darkGoldLineMat));

      // Upper floor glass mullions
      const m2Pts = [new THREE.Vector3(fx, 3.8, 4.6), new THREE.Vector3(fx, 7.1, 4.6)];
      const m2Geom = new THREE.BufferGeometry().setFromPoints(m2Pts);
      hologramDetailsGroup.add(new THREE.Line(m2Geom, darkGoldLineMat));
    }

    // Horizontal architectural banding lines (characteristic of luxury modern architecture)
    [-3.8, -1.8, 1.8, 5.4].forEach((bandZ) => {
      [1.2, 2.4, 4.8, 6.0].forEach((bandY) => {
        const bPts = [new THREE.Vector3(-9, bandY, bandZ), new THREE.Vector3(8.5, bandY, bandZ)];
        const bGeom = new THREE.BufferGeometry().setFromPoints(bPts);
        hologramDetailsGroup.add(new THREE.Line(bGeom, darkGoldLineMat));
      });
    });
    scene.add(hologramDetailsGroup);

    // ------------------------------------------------------------------------
    // E. FLOATING GOLDEN PARTICLES (Drifting in 3D Space)
    // ------------------------------------------------------------------------
    const particleCount = 280;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 36;
      particlePositions[p + 1] = Math.random() * 12 + 0.2;
      particlePositions[p + 2] = (Math.random() - 0.5) * 28;
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5d37f,
      size: 0.18,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // ------------------------------------------------------------------------
    // F. ANIMATION RENDER LOOP (TIMELINE: 0s to 5.0s)
    // ------------------------------------------------------------------------
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedMs = currentTime - startTime;
      const progress = Math.min(elapsedMs / ANIMATION_DURATION_MS, 1.0); // 0.0 to 1.0

      // Dynamic Camera Motion: slow, majestic cinematic orbit & push
      const orbitAngle = 0.55 + progress * 0.18;
      const camRadius = cameraBaseDist * (1.0 - progress * 0.12);
      camera.position.x = Math.sin(orbitAngle) * camRadius;
      camera.position.z = Math.cos(orbitAngle) * camRadius;
      camera.position.y = (cameraBaseDist * 0.38) + Math.sin(progress * Math.PI) * 1.2;
      camera.lookAt(targetLookAt);

      // Particle float motion
      const positions = particleGeom.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.012;
        if (positions[i] > 14) positions[i] = 0.2;
      }
      particleGeom.attributes.position.needsUpdate = true;

      // ----------------------------------------------------------------------
      // TIMELINE STAGES MAPPING
      // ----------------------------------------------------------------------

      // STAGE 1: 0–1s (progress: 0.00 – 0.20) — Foundation & Base Grid
      if (progress < 0.20) {
        const p1 = progress / 0.20;
        setConstructionStage("foundation");
        gridHelper.material.opacity = Math.min(p1 * 0.85, 0.85);
        goldLineMat.opacity = p1 * 0.7;
        brightGoldLineMat.opacity = p1 * 0.95;
        foundationGroup.scale.set(Math.min(p1 * 1.05, 1), 1, Math.min(p1 * 1.05, 1));
      }
      // STAGE 2: 1–2s (progress: 0.20 – 0.40) — Structural Pillars Rise Up
      else if (progress < 0.40) {
        const p2 = (progress - 0.20) / 0.20;
        setConstructionStage("pillars");
        gridHelper.material.opacity = 0.85;
        goldLineMat.opacity = 0.85;
        brightGoldLineMat.opacity = 1.0;

        // Pillars progressively extrude upward
        pillarMeshes.forEach((mesh, idx) => {
          const delay = (idx / pillarMeshes.length) * 0.4;
          const localProgress = Math.max(0, Math.min(1, (p2 - delay) / 0.6));
          // Cubic ease-out extrusion
          const easedHeight = 1 - Math.pow(1 - localProgress, 3);
          mesh.scale.y = Math.max(0.001, easedHeight);
        });
      }
      // STAGE 3: 2–3s (progress: 0.40 – 0.60) — Floors, Slabs & Balconies Form
      else if (progress < 0.60) {
        const p3 = (progress - 0.40) / 0.20;
        setConstructionStage("floors");
        pillarMeshes.forEach((mesh) => (mesh.scale.y = 1));

        // 1st Floor slab expands
        const f1Scale = Math.min(1, p3 * 1.5);
        f1Line.scale.set(f1Scale, 1, f1Scale);

        // Glass planes fade in
        glassPlaneMat.opacity = Math.min(p3 * 0.35, 0.35);

        // 2nd Floor & Roof assemble
        if (p3 > 0.3) {
          const f2Scale = Math.min(1, (p3 - 0.3) * 1.6);
          f2Line.scale.set(f2Scale, 1, f2Scale);
          roofLine.scale.set(f2Scale, 1, f2Scale);
        }
      }
      // STAGE 4: 3–4s (progress: 0.60 – 0.80) — Complete Holographic Wireframe
      else if (progress < 0.80) {
        const p4 = (progress - 0.60) / 0.20;
        setConstructionStage("hologram");
        f1Line.scale.set(1, 1, 1);
        f2Line.scale.set(1, 1, 1);
        roofLine.scale.set(1, 1, 1);

        // Illuminate detailed facade mullions and horizontal bands
        darkGoldLineMat.opacity = p4 * 0.65;
        brightGoldLineMat.opacity = 0.85 + Math.sin(p4 * Math.PI * 4) * 0.15; // Luminous pulse
        particleMat.opacity = p4 * 0.85;

        // Warm lighting intensifies
        goldSpotLight.intensity = 2.8 + p4 * 1.5;
        warmGroundLight.intensity = 1.6 + p4 * 1.2;
      }
      // STAGE 5: 4–5s (progress: 0.80 – 1.00) — Full Photorealistic Mansion Reveal
      else {
        setConstructionStage("completed");
        darkGoldLineMat.opacity = 0.45;
        particleMat.opacity = 0.95;
      }

      renderer.render(scene, camera);

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      const mob = w < 768;
      const dist = mob ? 32 : 24;
      camera.position.set(dist * 0.72, dist * 0.38, dist * 0.95);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = originalOverflow;
      renderer.dispose();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <aside
      className={`house-construction-intro ${isDismissing ? "house-construction-intro--dismissing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="3D Architectural House Construction — ICON INTERIORS"
    >
      {/* 3D WebGL Canvas Rendering Procedural Construction Wireframe */}
      <canvas ref={canvasRef} className="construction-webgl-canvas" />

      {/* ====================================================================
          STAGE 5 REVEAL: PHOTOREALISTIC COMPLETED LUXURY MANSION
          Matches the user's uploaded reference image perfectly
          Cross-fades in during 4.0s – 5.0s with ray-traced reflections
          ==================================================================== */}
      <div
        className={`completed-mansion-reveal ${
          constructionStage === "completed" ? "completed-mansion-reveal--active" : ""
        }`}
        aria-hidden="true"
      >
        <img
          src={completedMansionImg}
          alt="Completed luxury modern two-storey mansion with glowing golden holographic wireframe"
          className="completed-mansion-photo"
          fetchPriority="high"
          loading="eager"
        />
        {/* Ray-traced gold reflection enhancement on glossy ground */}
        <div className="completed-reflection-glow" />
        <div className="completed-ambient-particles" />
      </div>

      {/* ====================================================================
          ARCHITECTURAL HUD & PHASE INDICATOR (Technical Hologram Feedback)
          ==================================================================== */}
      <div className="construction-hud-overlay" aria-hidden="true">
        {/* Top-Left Project Blueprint Tag */}
        <div className="hud-project-stamp">
          <div className="hud-tag-badge">
            <span className="hud-pulse-dot" />
            <span>3D ARCHITECTURAL TELEMETRY</span>
          </div>
          <span className="hud-spec-code">DWG // ICON-RESIDENCE-01</span>
        </div>

        {/* Dynamic Construction Phase Status Bar */}
        <div className="hud-phase-tracker">
          <span className="phase-label">
            {constructionStage === "foundation" && "01 // FOUNDATION & BASE GRID FORMATION"}
            {constructionStage === "pillars" && "02 // ERECTING VERTICAL STRUCTURAL FRAMEWORK"}
            {constructionStage === "floors" && "03 // ASSEMBLING CANTILEVER SLABS & BALCONIES"}
            {constructionStage === "hologram" && "04 // ILLUMINATING GOLDEN HOLOGRAPHIC FACADE"}
            {constructionStage === "completed" && "05 // LUXURY ARCHITECTURAL REALITY COMPLETE"}
          </span>
          <div className="phase-progress-track">
            <div className={`phase-progress-bar phase-progress-bar--${constructionStage}`} />
          </div>
        </div>
      </div>

      {/* ====================================================================
          MINIMALIST SKIP INTRO BUTTON (Accessible & Fast)
          ==================================================================== */}
      <button
        type="button"
        className="construction-skip-btn"
        onClick={handleDismiss}
        aria-label="Skip architectural construction intro and enter website"
      >
        <span className="skip-btn-text">SKIP INTRO</span>
        <span className="skip-btn-icon">›</span>
      </button>
    </aside>
  );
}

