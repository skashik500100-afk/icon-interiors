export default function AboutServicesSection() {
  const steps = [
    {
      num: "01",
      title: "Vision & 3D Spatial Modeling",
      desc: "Detailed site measurements, architectural lifestyle study, and photo-realistic 3D VR renders before hammering a single nail."
    },
    {
      num: "02",
      title: "Tactile Material Curation",
      desc: "Direct selection of imported Italian marble, BWP marine plywood, Hafele hardware, and textured fabrics at our design studio."
    },
    {
      num: "03",
      title: "Precision Factory Joinery",
      desc: "German computerized edge-banding and laser-cut finishing executed off-site for zero dust and millimeter accuracy."
    },
    {
      num: "04",
      title: "Guaranteed 45-Day Handover",
      desc: "On-site installation overseen by principal architects with strict milestone inspections and deep cleaning."
    }
  ];

  return (
    <>
      {/* About Section */}
      <section className="about-editorial-section" id="about">
        <div className="about-editorial-container">
          <div className="about-text-col">
            <span className="section-eyebrow">ABOUT ICON INTERIORS</span>
            <h2 className="editorial-heading">
              Architecture that elevates the <span className="gold-text-gradient">human spirit.</span>
            </h2>
            <p className="editorial-lead">
              Founded in Guntur, Andhra Pradesh, ICON INTERIORS was born from a singular passion:
              to bring world-class architectural craftsmanship and timeless luxury into contemporary homes.
            </p>
            <p className="editorial-body">
              We do not believe in cookie-cutter catalog designs. Every residence we undertake is a bespoke
              portrait of its owners — balancing warm textures, intelligent spatial planning, acoustic serenity,
              and meticulous execution.
            </p>

            <div className="about-badges-row">
              <div className="badge-item">
                <strong>100%</strong>
                <span>Turnkey Accountability</span>
              </div>
              <div className="badge-item">
                <strong>IS 710</strong>
                <span>Certified Marine Plywood</span>
              </div>
              <div className="badge-item">
                <strong>Blum & Hafele</strong>
                <span>Certified Hardware</span>
              </div>
            </div>
          </div>

          <div className="about-image-col">
            <div className="about-image-card">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"
                alt="Icon Interiors Architectural Studio"
              />
              <div className="about-floating-stamp">
                <span className="stamp-title">ICON</span>
                <span className="stamp-sub">EST. 2012</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Architectural Process */}
      <section className="process-section" id="process">
        <div className="section-header">
          <span className="section-eyebrow">OUR EXECUTION DISCIPLINE</span>
          <h2 className="section-title">
            The 4-Step <span className="gold-text-gradient">Turnkey Journey.</span>
          </h2>
          <p className="section-description">
            Experience absolute peace of mind with our transparent, milestone-driven execution process.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.num} className="process-card">
              <span className="process-step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
