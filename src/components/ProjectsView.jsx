import { useState, useMemo } from "react";
import { BUSINESS_INFO } from "../data/designsData";

const PROJECTS_LIST = [
  {
    id: "PRJ-GNT-401",
    title: "The Grand Statuario Penthouse",
    category: "Duplex & Villas",
    location: "Syamala Nagar, Guntur",
    area: "4,200 sq.ft Duplex",
    timeline: "42 Days Execution",
    status: "COMPLETED",
    description: "Monumental double-height living salon with bookmatched Italian Roman travertine wall cladding, brass reveals, German island kitchen, and private terrace lounge.",
    materials: ["Italian Roman Travertine", "BWP 710 Marine Ply", "Blum Motorized Drawers", "DALI Smart Scenes"]
  },
  {
    id: "PRJ-VJW-204",
    title: "Japandi Serenity 3 BHK",
    category: "Apartments (3 & 4 BHK)",
    location: "Benz Circle, Vijayawada",
    area: "2,400 sq.ft Apartment",
    timeline: "35 Days Execution",
    status: "COMPLETED",
    description: "Minimalist Japandi home featuring natural acoustic slatted white oak paneling, sunken seating architecture, and concealed floor uplighting.",
    materials: ["White Oak Acoustic Slats", "Limewash Stucco", "Quartz Countertops", "Fluted Glass"]
  },
  {
    id: "PRJ-AMR-502",
    title: "Amaravati Capital Luxury Villa",
    category: "Duplex & Villas",
    location: "Capital City Region, Amaravati",
    area: "5,800 sq.ft Independent Villa",
    timeline: "58 Days Execution",
    status: "COMPLETED",
    description: "Contemporary luxury estate with private elevator cladding, home cinema acoustic suite, bespoke Italian marble flooring, and walk-in dressing salon.",
    materials: ["Imported Statuario Marble", "Smoked Walnut Veneer", "Acoustic Cinema Fabric", "Hafele Sliders"]
  },
  {
    id: "PRJ-GNT-108",
    title: "Modern Minimalist Parallel Kitchen",
    category: "Modular Kitchens",
    location: "Brodipet, Guntur",
    area: "180 sq.ft Kitchen Suite",
    timeline: "21 Days Execution",
    status: "COMPLETED",
    description: "Anti-fingerprint charcoal acrylic modular kitchen with Calacatta quartz waterfall breakfast counter, Hafele magic corner, and sensor LED lighting.",
    materials: ["Anti-Fingerprint Acrylic", "BWP 710 Plywood", "Silestone Quartz", "Hafele Magic Corner"]
  },
  {
    id: "PRJ-GNT-312",
    title: "Chandramouli Nagar 4 BHK Luxury Flat",
    category: "Apartments (3 & 4 BHK)",
    location: "Chandramouli Nagar, Guntur",
    area: "3,100 sq.ft Flat",
    timeline: "40 Days Execution",
    status: "COMPLETED",
    description: "Turnkey residence with French boiserie wall moldings in drawing room, master suite bouclé bedframe, and bronze aluminum profile glass wardrobes.",
    materials: ["French Boiserie Trim", "Italian Profile Glass", "High-CRI Sconces", "Chevron Hardwood"]
  },
  {
    id: "PRJ-HYD-601",
    title: "Banjara Hills Contemporary Residence",
    category: "Duplex & Villas",
    location: "Banjara Hills, Hyderabad",
    area: "4,600 sq.ft Residence",
    timeline: "48 Days Execution",
    status: "COMPLETED",
    description: "Luxury metropolitan sanctuary featuring honey onyx backlit dining wall, suspended linear tracks, and Italian designer furnishings.",
    materials: ["Translucent Honey Onyx", "Magnetic DC48V Track", "Fenix NTM Laminates", "Custom Velvet"]
  }
];

export default function ProjectsView({ onNavigate, onOpenConsultation }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Duplex & Villas", "Apartments (3 & 4 BHK)", "Modular Kitchens"];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS_LIST;
    return PROJECTS_LIST.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const getWhatsAppProjectUrl = (p) => {
    const text = `Hello ICON INTERIORS! I am inspired by your completed project "${p.title}" (${p.id}) in ${p.location}. I would like to consult for a similar design.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="projects-page-container">
      <header className="projects-page-header">
        <div className="projects-header-content">
          <div className="projects-badge">
            <span className="badge-sparkle">✦</span>
            <span>PORTFOLIO OF DELIVERED SPACES</span>
          </div>
          <h1>
            Completed <span className="gold-text-gradient">Projects</span>
          </h1>
          <p>
            Explore our curated portfolio of delivered residences across Guntur, Vijayawada, and Amaravati.
            Each home reflects meticulous craftsmanship, factory-grade joinery, and transparent budget management.
          </p>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="projects-filter-bar">
        <div className="filter-tabs-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`project-tab-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="projects-cards-grid">
          {filteredProjects.map((p) => (
            <div key={p.id} className="project-portfolio-card">
              <div className="project-card-media">
                <div className="neutral-luxury-placeholder">
                  <div className="placeholder-blueprint-grid" />
                  <div className="placeholder-content">
                    <span className="placeholder-room-glyph">🏛️</span>
                    <span className="stamp-id">{p.id}</span>
                    <span className="placeholder-status-tag">VERIFIED COMPLETION</span>
                  </div>
                </div>
                <span className="project-status-badge">✓ {p.status}</span>
                <span className="project-location-badge">📍 {p.location}</span>
              </div>

              <div className="project-card-body">
                <div className="project-type-row">
                  <span className="project-cat-tag">{p.category}</span>
                  <span className="project-area-tag">{p.area}</span>
                </div>

                <h3>{p.title}</h3>
                <span className="project-timeline-highlight">⏱️ Handover: {p.timeline}</span>
                <p className="project-desc">{p.description}</p>

                <div className="project-materials-row">
                  {p.materials.map((m, i) => (
                    <span key={i} className="mat-badge">✦ {m}</span>
                  ))}
                </div>

                <div className="project-card-actions">
                  <button className="btn-outline-gold" onClick={onOpenConsultation}>
                    Plan Similar Project
                  </button>
                  <a
                    href={getWhatsAppProjectUrl(p)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-project-wa"
                  >
                    💬 Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore More Banner */}
      <section className="projects-explore-banner" style={{ textAlign: "center", padding: "60px 24px", background: "rgba(18, 14, 10, 0.7)", borderTop: "1px solid rgba(212, 178, 111, 0.2)" }}>
        <h3 style={{ fontSize: "26px", color: "#fff", marginBottom: "12px", fontFamily: "var(--font-serif, serif)" }}>
          Want to Explore Our Concept Catalogs?
        </h3>
        <p style={{ color: "var(--text-secondary, #b8b0a5)", maxWidth: "580px", margin: "0 auto 24px" }}>
          Browse over 11 curated room categories or test our AI Room Makeover tool with your current home photos.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {onNavigate && (
            <>
              <button className="btn-gold-primary" onClick={() => onNavigate("designs")}>
                Browse Design Ideas Gallery ›
              </button>
              <button className="btn-outline-gold" onClick={() => onNavigate("ai-makeover")}>
                Try AI Room Makeover ›
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
